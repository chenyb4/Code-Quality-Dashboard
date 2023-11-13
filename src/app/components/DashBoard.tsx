import {BadgeDelta, Card, Grid} from "@tremor/react";
import {MyLineChart} from "@/app/components/MyLineChart";
import React from "react";
import {getDataByDaysAgo} from "@/app/utils/dataRangePicker";
import {MyCard} from "@/app/components/MyCard";


// @ts-ignore
export async function Dashboard() {

    const data = await getDataByDaysAgo(30);

    console.log(data);

    return (
            <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
                <MyCard title="Code Coverage" history={data.measures[0].history} isIncreasePositive={true}/>
                <MyCard title="Cognitive Complexity" history={data.measures[1].history} isIncreasePositive={false}/>
                <MyCard title="Technical Debt" history={data.measures[2].history} isIncreasePositive={false}/>
            </Grid>
    );
}


