
import {
    Button,
    Card,
    Callout,
    Flex,
    Tab,
    TabList,
    Text,
    Metric,
    Legend,
    TabGroup,
    TabPanel,
    TabPanels,
    LineChart,
} from "@tremor/react";

import {getSonarQubeData} from "@/app/helpers/dataGetter";
import {MyLineChart} from "@/app/components/MyLineChart";
import {addDays} from "date-fns";
import React, {useState} from "react";
import { Select, SelectItem } from "@tremor/react";





async function getDataByDaysAgo(days:number){
    const currentDate=new Date();
    const fromDateString=addDays(currentDate,0-days).toISOString().split('T')[0];
    const data = await getSonarQubeData('launchpad','coverage,cognitive_complexity','1000',fromDateString);
    return data;
}



export default async function Home() {

   // const [selectedButton,setSelectedButton]=useState('button1');



    const data=await getDataByDaysAgo(30);

    console.log(data);

    function onChangeHandler(daysAgo:number) {
        console.log(daysAgo);
    }




    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Card className="max-w-lg mx-auto">
            <TabGroup>
                <div>
                    <Button size="xs" variant="secondary" className="mx-1">last week</Button>
                    <Button size="xs" variant="primary" className="mx-1">past 30 days</Button>
                    <Button size="xs" variant="secondary" className="mx-1">past 3 months</Button>
                </div>


                <TabList className="mt-6">
                    <Tab>code coverage</Tab>
                    <Tab>cognitive complexity</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <MyLineChart data={data.measures[0].history}/>
                    </TabPanel>
                    <TabPanel>
                        <MyLineChart data={data.measures[1].history} />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
            </Card>
        </main>
    )


}
