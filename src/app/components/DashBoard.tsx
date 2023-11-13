import {BarList, Card, Grid, Text} from "@tremor/react";
import React from "react";
import {getDataByDaysAgo} from "@/app/utils/dataRangePicker";
import {MyCard} from "@/app/components/MyCard";
import {MyLineChart} from "@/app/components/MyLineChart";
import {getSonarQubeIssuesByRules} from "@/app/utils/dataFetchers";

export async function Dashboard() {

    const data = await getDataByDaysAgo(30);

    console.log(data);

    let deprecationData = await getSonarQubeIssuesByRules('launchpad', '500', 'typescript:S1874');

    console.log(deprecationData);

    let numberOfDeprecationTS=deprecationData.issues.length;

    let dataBarList = [
        {
            name: 'TypeScript',
            value:numberOfDeprecationTS,
        },
        {
            name: 'JavaScript(place holder value)',
            value:50,
        }
    ]


    return (
        <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
            <MyCard title="Code Coverage" history={data.measures[0].history} isIncreasePositive={true}/>
            <MyCard title="Cognitive Complexity" history={data.measures[1].history} isIncreasePositive={false}/>
            <MyCard title="Technical Debt" history={data.measures[2].history} isIncreasePositive={false}/>

            <Card className='w-auto shadow-md border-gray-300 border'>
                <Text
                    className="text-3xl font-bold dark:text-white text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-emerald-400 float-left">
                    Number of Deprecations
                </Text>
                <BarList data={dataBarList} className="mt-10" color='emerald' showAnimation={true}/>

            </Card>
        </Grid>
    );
}


