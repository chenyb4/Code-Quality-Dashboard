import {getCurrentValue, getImprovement} from "@/app/utils/helperFucntions";
import {BadgeDelta, Metric} from "@tremor/react";
import React from "react";


interface Props {
    title:string;
    history: { date: string, value: string }[];
    isIncreasePositive:boolean;

}

export function MyBadgeDeltaAndMetric({title,history,isIncreasePositive}:Props){

    //current value for tech debt
    let minutes=null;
    let hours=null;
    if(title=="Technical Debt"){
        hours=Math.floor(parseInt(getCurrentValue(history)) / 60);
        minutes=parseInt(getCurrentValue(history))% 60;
    }
    let persentageMark=null;
    if(title=="Code Coverage"){
        persentageMark="%";
    }

    let badgeDelta = null;
    //last value - first value
    let improvement=getImprovement(history);
    let improvementAbsolute=Math.abs(improvement);


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

    let metric=null;

    if(title=="Technical Debt"){
        let currentMinutesInTotal=parseInt(getCurrentValue(history));
        hours=Math.floor(currentMinutesInTotal / 60);
        minutes=currentMinutesInTotal% 60;
        metric= <Metric className="text-emerald-600 mt-12 border-2 w-fit rounded-2xl border-emerald-600 p-2">{hours}h {minutes}m</Metric>
    }else{
        metric=<Metric className="text-emerald-600 mt-12 border-2 w-fit rounded-2xl border-emerald-600 p-2">{getCurrentValue(history)}{persentageMark}</Metric>
    }


    return(
        <>
        {badgeDelta}
        {metric}
        </>
    );
}