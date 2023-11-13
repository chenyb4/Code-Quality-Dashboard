import {BadgeDelta, Card, Grid} from "@tremor/react";
import {MyLineChart} from "@/app/components/MyLineChart";
import React from "react";
import {getDataByDaysAgo} from "@/app/utils/dataRangePicker";
import {MyCard} from "@/app/components/MyCard";


function getImprovement(historyArray: { date: string, value: string }[]): number {
    const firstItem = historyArray[0];
    const lastItem = historyArray[historyArray.length - 1];
    const improvement = parseInt(lastItem.value) - parseInt(firstItem.value);
    return improvement;

}



// @ts-ignore
export async function Dashboard() {

    const data = await getDataByDaysAgo(30);


    console.log(data);

    // let improvementsArray = [];
    //
    // data.measures.forEach((item: { metric: string, history: { date: string, value: string }[] }) => {
    //     const improvement = getImprovement(item.history);
    //     improvementsArray.push(improvement);
    // });


    return (
            <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
                <MyCard title="Code Coverage" history={data.measures[0].history}/>
                <MyCard title="Cognitive Complexity" history={data.measures[1].history}/>
                <MyCard title="Technical Debt" history={data.measures[2].history}/>
            </Grid>
    );
}


