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

    //rules is a string, multiple rules can be divided by comma
    let deprecationData = await getSonarQubeIssuesByRules(component, '500', 'typescript:S1874','OPEN,CONFIRMED,REOPENED,CLOSED');

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


