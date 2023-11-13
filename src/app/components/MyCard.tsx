import {BadgeDelta, Card, Text, Flex, Metric} from "@tremor/react";
import {MyLineChart} from "@/app/components/MyLineChart";
import React from "react";

interface Props {
    title:string;
    history: { date: string, value: string }[];
    isIncreasePositive:boolean;

}

function getCurrentValue(historyArray: { date: string, value: string }[]){
    const lastItem = historyArray[historyArray.length - 1];
    return lastItem.value;
}

function getImprovement(historyArray: { date: string, value: string }[]): number {
    const firstItem = historyArray[0];
    const lastItem = historyArray[historyArray.length - 1];
    const improvement = parseInt(lastItem.value) - parseInt(firstItem.value);
    return improvement;

}

export function MyCard({title,history,isIncreasePositive}:Props){

    let badgeDelta = null;
    //last value - first value
    let improvement=getImprovement(history);
    let improvementAbsolute=Math.abs(improvement);
    if(improvement>=0){
        badgeDelta=<BadgeDelta deltaType="moderateIncrease" isIncreasePositive={isIncreasePositive}>{improvementAbsolute}</BadgeDelta>;
    }else{
        badgeDelta=<BadgeDelta deltaType="moderateDecrease" isIncreasePositive={isIncreasePositive}>{improvementAbsolute}</BadgeDelta>;
    }

    return(
        <Card className='w-96 shadow-lg border-gray-300 border' >

            <Text className="text-3xl font-bold dark:text-white text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-emerald-400 ">
                {title}
            </Text>

            {badgeDelta}

            <Metric className="text-emerald-600 mt-3 border-2 w-fit rounded-2xl border-emerald-600 p-2">
                {getCurrentValue(history)}
            </Metric>

            <MyLineChart data={history}/>

        </Card>
    )
}