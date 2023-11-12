import {BadgeDelta, Card, Grid} from "@tremor/react";
import {MyLineChart} from "@/app/components/MyLineChart";
import React from "react";
import {getDataByDaysAgo} from "@/app/utils/dataRangePicker";


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

                <Card key='fdfs' className='w-96'>
                    <h1>Code Coverage</h1>



                    <BadgeDelta deltaType="moderateIncrease" isIncreasePositive={true} size="xs">

                    </BadgeDelta>


                    <MyLineChart data={data.measures[0].history}/>


                </Card>
                <Card>
                    <h1>Cognitive Complexity</h1>
                    <MyLineChart data={data.measures[1].history}/>
                </Card>
                <Card>
                    <h1>Technical Debt</h1>
                    <MyLineChart data={data.measures[2].history}/>
                </Card>



            </Grid>

    );
}


