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



export default async function Home() {

    const data = await getSonarQubeData('launchpad','coverage,cognitive_complexity','1000','2023-10-01');




    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Card className="max-w-lg mx-auto">
            <TabGroup>
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
