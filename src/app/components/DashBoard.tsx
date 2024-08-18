import { Grid } from '@tremor/react';
import React from 'react';
import { addDays, getDataByDaysAgo } from '@/app/utils/dataRangePicker';
import { SonarQubeCard } from '@/app/components/SonarQubeCard';
import { getMeasureHistoryFromDb, getSonarQubeIssuesByRules } from '@/app/utils/dataFetchers';
import { metrics } from '@/app/config/metricsConfig';
import { DbCard } from '@/app/components/DbCard';
import { formatDbHistoryArrayForCard } from '@/app/utils/helperFucntions';

interface Props {
  component: string;
}

export async function Dashboard({ component }: Props) {
  // if we add a new card which gets measures history from SonarQube
  // add the key of that metric to this array
  //const metricsForSonarQube = [metrics.codeCoverage.key, metrics.cognitiveComplexity.key, metrics.technicalDebt.key];

  const metricsForSonarQube:string[]=[];
  metrics.forEach(element => {
    if(element.hasMeasuresHistory){
      metricsForSonarQube.push(element.key);
    }
  });



  // fetch data from sonarqube
  const data = await getDataByDaysAgo(30, component, metricsForSonarQube.join(','));

  const measures: { metric: string, history: { date: Date, value: number }[] }[] = [];

  // this is for converting the data into Date type and value into number type
  // in all the data points in the data object's measures array
  // every measure in the measures array is an object
  // with metric member of type string and history member of type array
  // the reason why doing this is that SonarQubeCard component accepts these types
  if (data.measures) {
    data.measures.forEach((measure: { metric: string, history: { date: string, value: string }[] }) => {
      // push every converted measure to the data variable
      const tempMeasure: { metric: string, history: { date: Date, value: number }[] } = { metric: measure.metric, history: [] };
      // every dp in the history array is an object with data and value members
      measure.history.forEach((dp: { date: string, value: string }) => {
        const tempDp: { date: Date, value: number } = { date: new Date(dp.date), value: parseFloat(dp.value) };
        tempMeasure.history.push(tempDp);
      });
      measures.push(tempMeasure);
    });
  }

  // rules is a string, multiple rules can be divided by comma
  // we get an issues array in deprecationData
  const deprecationData = await getSonarQubeIssuesByRules(component, '500', 'typescript:S1874', 'OPEN,CONFIRMED,REOPENED,CLOSED');
  const numberOfDeprecationTS = deprecationData.issues.length;

  const currentDate = new Date();
  const fromDate = addDays(currentDate, 0 - 30);

  const deprecationHistory = await getMeasureHistoryFromDb(component, metrics[3].key, Math.floor((fromDate).getTime() / 1000));
  const deprecationHistoryFormatted = formatDbHistoryArrayForCard(deprecationHistory);
  const deprecationCard = (
    <DbCard
      title={metrics[3].title}
      history={deprecationHistoryFormatted}
      isIncreasePositive={metrics[3].isIncreasePositive}
      formattingType={metrics[3].formattingType}
      currentValue={numberOfDeprecationTS}
      component={component}
      metricKey={metrics[3].key}
    />
  );

  const sonarQubeCards=metrics.map(
    (metric,index)=>{
      if(metric.hasMeasuresHistory){
        return(
          <SonarQubeCard
        metricsConfigObj={metric}
        history={measures[index].history}
      />
        );
      }
      
    }
  );

  return (
    <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
        {sonarQubeCards}
        {deprecationCard}
      </Grid>
  ) 
}
