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
    let persentageMark=null;
    if(title=="Code Coverage"){
        persentageMark="%";
    }

    //current value for tech debt
    let minutes=null;
    let hours=null;
    if(title=="Technical Debt"){
        hours=Math.floor(parseInt(getCurrentValue(history)) / 60);
        minutes=parseInt(getCurrentValue(history))% 60;
    }

    let badgeDelta = null;
    //last value - first value
    let improvement=getImprovement(history);
    let improvementAbsolute=Math.abs(improvement);

    let metric=null;

    if(title=="Technical Debt"){
        let currentMinutesInTotal=parseInt(getCurrentValue(history));
        hours=Math.floor(currentMinutesInTotal / 60);
        minutes=currentMinutesInTotal% 60;
        metric= <Metric className="text-emerald-600 mt-12 border-2 w-fit rounded-2xl border-emerald-600 p-2">{hours}h {minutes}m</Metric>
    }else{
        metric=<Metric className="text-emerald-600 mt-12 border-2 w-fit rounded-2xl border-emerald-600 p-2">{getCurrentValue(history)}{persentageMark}</Metric>
    }

    if(improvement>=0){
        if(title=="Technical Debt"){
            hours=Math.floor(improvement / 60);
            minutes=improvement% 60;
            badgeDelta=<BadgeDelta className="float-left ml-4" deltaType="moderateIncrease" isIncreasePositive={isIncreasePositive}>{hours}h {minutes}m</BadgeDelta>;
        }else{
            badgeDelta=<BadgeDelta className="float-left ml-4" deltaType="moderateIncrease" isIncreasePositive={isIncreasePositive}>{improvementAbsolute}{persentageMark}</BadgeDelta>;
        }
    }else{
        if(title=="Technical Debt"){
            hours=Math.floor(improvementAbsolute / 60);
            minutes=improvementAbsolute% 60;
            badgeDelta=<BadgeDelta className="float-left ml-4" deltaType="moderateDecrease" isIncreasePositive={isIncreasePositive}>{hours}h {minutes}m</BadgeDelta>;
        }else{
            badgeDelta=<BadgeDelta className="float-left ml-4" deltaType="moderateDecrease" isIncreasePositive={isIncreasePositive}>{improvementAbsolute}{persentageMark}</BadgeDelta>;
        }
    }


    return(
        <Card className='w-96 shadow-md border-gray-300 border' >
            <Text className="text-3xl font-bold dark:text-white text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-emerald-400 float-left">
                {title}
            </Text>
            {badgeDelta}
            {metric}
            <MyLineChart historyArray={history}/>
        </Card>
    )
}