import {Grid} from "@tremor/react";
import React from "react";
import {getDataByDaysAgo} from "@/app/utils/dataRangePicker";
import {MyCard} from "@/app/components/MyCard";

import {getMeasureHistoryFromDb, getSonarQubeIssuesByRules} from "@/app/utils/dataFetchers";
import {metrics} from "@/app/config/metricsConfig";
import {DbCard} from "@/app/components/DbCard";
import {formatDbHistoryArrayForCard} from "@/app/utils/helperFucntions";

interface Props {
    component: string;
}


export async function Dashboard({component}: Props) {

    const metricsForSonarQube = [metrics.codeCoverage, metrics.cognitiveComplexity, metrics.technicalDebt];

    let metricsStringForSonarQube = "";
    metricsForSonarQube.forEach((metric) => {
        metricsStringForSonarQube += metric.key;
        metricsStringForSonarQube += ",";
    })


    const data = await getDataByDaysAgo(30, component, metricsStringForSonarQube);

    let measures: { metric: string, history: { date: Date, value: number }[] }[] = [];

    // this is for converting the data into Date type and value into number type in all the data points in the data object's measures array
    // every measure in the measures array is an object with metric member of type string and history member of type array


    if (data.measures) {
        data.measures.forEach((measure: { metric: string, history: { date: string, value: string }[] }) => {
            //push every converted measure to the data variable
            let tempMeasure: { metric: string, history: { date: Date, value: number }[] };
            tempMeasure = {metric: measure.metric, history: []};
            // every dp in the history array is an object with data and value members
            measure.history.forEach((dp: { date: string, value: string }) => {
                let tempDp: { date: Date, value: number };
                tempDp = {date: new Date(dp.date), value: parseFloat(dp.value)};
                tempMeasure.history.push(tempDp);
            });
            measures.push(tempMeasure)
        });
    }


    // measures.forEach((measure)=>{
    //     measure.history.forEach((dp)=>{
    //         console.log(typeof dp.value);
    //         console.log(typeof dp.date);
    //     })
    // })


    //rules is a string, multiple rules can be divided by comma
    let deprecationData = await getSonarQubeIssuesByRules(component, '500', 'typescript:S1874', 'OPEN,CONFIRMED,REOPENED,CLOSED');

    let numberOfDeprecationTS = deprecationData.issues.length;

    let deprecationHistory=await getMeasureHistoryFromDb(component,metrics.numberOfDeprecations.key);
    let deprecationHistoryFormatted=formatDbHistoryArrayForCard(deprecationHistory);

    let deprecationCard=<DbCard title={metrics.numberOfDeprecations.title} history={deprecationHistoryFormatted} isIncreasePositive={metrics.numberOfDeprecations.isIncreasePositive} formattingType={metrics.numberOfDeprecations.formatting} currentValue={numberOfDeprecationTS} component={component} metricKey={metrics.numberOfDeprecations.key}/>

    let grid = null;

    if (data.measures) {
        grid = <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
            <MyCard title={metrics.codeCoverage.title} history={measures[0].history}
                    isIncreasePositive={metrics.codeCoverage.isIncreasePositive}
                    formattingType={metrics.codeCoverage.formatting}
            />
            <MyCard title={metrics.cognitiveComplexity.title} history={measures[1].history}
                    isIncreasePositive={metrics.cognitiveComplexity.isIncreasePositive}
                    formattingType={metrics.cognitiveComplexity.formatting}/>
            <MyCard title={metrics.technicalDebt.title} history={measures[2].history}
                    isIncreasePositive={metrics.technicalDebt.isIncreasePositive}
                    formattingType={metrics.technicalDebt.formatting}/>
            {deprecationCard}
        </Grid>
    } else {

        //show the cards but pass no history array
        //has to be done this way, otherwise when reading history property there will be run time error
        grid = <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
            <MyCard title={metrics.codeCoverage.title}
                    isIncreasePositive={metrics.codeCoverage.isIncreasePositive}
                    formattingType={metrics.codeCoverage.formatting}
            />
            <MyCard title={metrics.cognitiveComplexity.title}
                    isIncreasePositive={metrics.cognitiveComplexity.isIncreasePositive}
                    formattingType={metrics.cognitiveComplexity.formatting}/>
            <MyCard title={metrics.technicalDebt.title}
                    isIncreasePositive={metrics.technicalDebt.isIncreasePositive}
                    formattingType={metrics.technicalDebt.formatting}/>
            {deprecationCard}
        </Grid>
    }


    return (
        <>
            {grid}
        </>
    );
}


