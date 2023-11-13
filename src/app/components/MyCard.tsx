import {BadgeDelta, Card, Text, Flex, Metric} from "@tremor/react";
import {MyLineChart} from "@/app/components/MyLineChart";
import React from "react";
import {getCurrentValue, getImprovement} from "@/app/utils/helperFucntions";

interface Props {
    title:string;
    history: { date: string, value: string }[];
    isIncreasePositive:boolean;

}

export function MyCard({title,history,isIncreasePositive}:Props){
    let badgeDelta = null;
    //last value - first value
    let improvement=getImprovement(history);
    let improvementAbsolute=Math.abs(improvement);
    if(improvement>=0){
        badgeDelta=<BadgeDelta className="float-left ml-4" deltaType="moderateIncrease" isIncreasePositive={isIncreasePositive}>{improvementAbsolute}</BadgeDelta>;
    }else{
        badgeDelta=<BadgeDelta className="float-left ml-4" deltaType="moderateDecrease" isIncreasePositive={isIncreasePositive}>{improvementAbsolute}</BadgeDelta>;
    }

    return(
        <Card className='w-96 shadow-md border-gray-300 border' >
            <Text className="text-3xl font-bold dark:text-white text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-emerald-400 float-left">
                {title}
            </Text>
            {badgeDelta}
            <Metric className="text-emerald-600 mt-12 border-2 w-fit rounded-2xl border-emerald-600 p-2">
                {getCurrentValue(history)}
            </Metric>
            <MyLineChart historyArray={history}/>
        </Card>
    )
}