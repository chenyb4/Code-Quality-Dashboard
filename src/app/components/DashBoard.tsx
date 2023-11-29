import {Grid} from "@tremor/react";
import React from "react";
import {getDataByDaysAgo} from "@/app/utils/dataRangePicker";
import {MyCard} from "@/app/components/MyCard";

import {getSonarQubeIssuesByRules} from "@/app/utils/dataFetchers";

interface Props {
    component: string;
}


export async function Dashboard({component}: Props) {

    const data = await getDataByDaysAgo(30, component);

    let measures: { metric: string, history: { date: Date, value: number }[] }[] = [];

    // this is for converting the data into Date type and value into number type in all the data points in the data object's measures array
    // every measure in the measures array is an object with metric member of type string and history member of type array
    // @ts-ignore
    data.measures.forEach((measure) => {
        //push every converted measure to the data variable
        let tempMeasure: { metric: string, history: { date: Date, value: number }[] };
        tempMeasure = {metric: measure.metric, history: []};
        // every dp in the history array is an object with data and value members
        measure.history.forEach((dp: { date: string, value: string }) => {
            let tempDp: { date: Date, value: number };
            tempDp = {date: new Date(dp.date), value: parseInt(dp.value)};
            tempMeasure.history.push(tempDp);
        });
        measures.push(tempMeasure)
    });


    // measures.forEach((measure)=>{
    //     measure.history.forEach((dp)=>{
    //         console.log(typeof dp.value);
    //         console.log(typeof dp.date);
    //     })
    // })


    //rules is a string, multiple rules can be divided by comma
    let deprecationData = await getSonarQubeIssuesByRules(component, '500', 'typescript:S1874', 'OPEN,CONFIRMED,REOPENED,CLOSED');

    let numberOfDeprecationTS = deprecationData.issues.length;

    let grid = null;

    if (data.measures) {
        grid = <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
            <MyCard title="Code Coverage" history={data.measures[0].history} isIncreasePositive={true}
                    formatToPercentage={true}/>
            <MyCard title="Cognitive Complexity" history={data.measures[1].history} isIncreasePositive={false}/>
            <MyCard title="Technical Debt" history={data.measures[2].history} isIncreasePositive={false}
                    formatToHoursAndMinutes={true}/>
            <MyCard title="Number of Deprecations" currentValueIfKnown={numberOfDeprecationTS}/>
        </Grid>
    } else {

        //show the cards but pass no history array
        grid = <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
            <MyCard title="Code Coverage" isIncreasePositive={true}
                    formatToPercentage={true}/>
            <MyCard title="Cognitive Complexity" isIncreasePositive={false}/>
            <MyCard title="Technical Debt" isIncreasePositive={false}
                    formatToHoursAndMinutes={true}/>
            <MyCard title="Number of Deprecations" currentValueIfKnown={numberOfDeprecationTS}/>
        </Grid>
    }


    return (
        <>
            {grid}
        </>
    );
}


