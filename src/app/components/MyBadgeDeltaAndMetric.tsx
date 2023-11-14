import {getCurrentValue, getImprovement} from "@/app/utils/helperFucntions";
import {BadgeDelta, Metric} from "@tremor/react";
import React from "react";


interface Props {
    title:string;
    history: { date: string, value: string }[];
    isIncreasePositive:boolean;
    formatToPercentage:boolean;
    formatToHoursAndMinutes:boolean;

}

export function MyBadgeDeltaAndMetric({title,history,isIncreasePositive,formatToHoursAndMinutes,formatToPercentage}:Props){
    const styleForMetric="text-emerald-600 mt-12 border-2 w-fit rounded-2xl border-emerald-600 p-2";
    const styleForBadgeDelta="float-left ml-4";

    //current value for tech debt
    let minutes=null;
    let hours=null;
    if(formatToHoursAndMinutes){
        hours=Math.floor(parseInt(getCurrentValue(history)) / 60);
        minutes=parseInt(getCurrentValue(history))% 60;
    }
    let persentageMark=null;
    if(formatToPercentage){
        persentageMark="%";
    }

    let badgeDelta = null;
    //last value - first value
    let improvement=getImprovement(history);
    let improvementAbsolute=Math.abs(improvement);


    if(improvement>=0){
        if(formatToHoursAndMinutes){
            hours=Math.floor(improvement / 60);
            minutes=improvement% 60;
            badgeDelta=<BadgeDelta className={styleForBadgeDelta} deltaType="moderateIncrease" isIncreasePositive={isIncreasePositive}>{hours}h {minutes}m</BadgeDelta>;
        }else{
            badgeDelta=<BadgeDelta className={styleForBadgeDelta} deltaType="moderateIncrease" isIncreasePositive={isIncreasePositive}>{improvementAbsolute}{persentageMark}</BadgeDelta>;
        }
    }else{
        if(formatToHoursAndMinutes){
            hours=Math.floor(improvementAbsolute / 60);
            minutes=improvementAbsolute% 60;
            badgeDelta=<BadgeDelta className={styleForBadgeDelta} deltaType="moderateDecrease" isIncreasePositive={isIncreasePositive}>{hours}h {minutes}m</BadgeDelta>;
        }else{
            badgeDelta=<BadgeDelta className={styleForBadgeDelta} deltaType="moderateDecrease" isIncreasePositive={isIncreasePositive}>{improvementAbsolute}{persentageMark}</BadgeDelta>;
        }
    }

    let metric=null;

    if(formatToHoursAndMinutes){
        let currentMinutesInTotal=parseInt(getCurrentValue(history));
        hours=Math.floor(currentMinutesInTotal / 60);
        minutes=currentMinutesInTotal% 60;
        metric= <Metric className={styleForMetric}>{hours}h {minutes}m</Metric>
    }else{
        metric=<Metric className={styleForMetric}>{getCurrentValue(history)}{persentageMark}</Metric>
    }


    return(
        <>
        {badgeDelta}
        {metric}
        </>
    );
}