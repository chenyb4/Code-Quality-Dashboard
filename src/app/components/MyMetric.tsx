import {getCurrentValue} from "@/app/utils/helperFucntions";
import {Metric} from "@tremor/react";
import React from "react";


interface Props {
    history?: { date: Date, value: number }[];
    formatToPercentage?: boolean;
    formatToHoursAndMinutes?: boolean;
    currentValueIfKnown?: number;

}

export function MyMetric({
                             history=[],
                             formatToHoursAndMinutes,
                             formatToPercentage,
                             currentValueIfKnown,
                         }: Props) {
    const styleForMetric = "text-emerald-600 mt-12 border-2 w-fit rounded-2xl border-emerald-600 p-2";

    let metric = null;
    let minutes = null;
    let hours = null;
    let currentValue = null;


    if(history.length>0||currentValueIfKnown){
        if (currentValueIfKnown) {
            currentValue = currentValueIfKnown;
        } else {
            currentValue = getCurrentValue(history);
        }



        if (formatToHoursAndMinutes) {
            hours = Math.floor(currentValue / 60);
            minutes = currentValue % 60;
        }
        let persentageMark = null;
        if (formatToPercentage) {
            persentageMark = "%";
        }



        if (formatToHoursAndMinutes) {
            let currentMinutesInTotal = currentValue;
            hours = Math.floor(currentMinutesInTotal / 60);
            minutes = currentMinutesInTotal % 60;
            metric = <Metric className={styleForMetric}>{hours}h {minutes}m</Metric>
        } else {
            metric = <Metric className={styleForMetric}>{currentValue}{persentageMark}</Metric>
        }
    }else{
        metric = <Metric className={styleForMetric}>no data</Metric>
    }






    return (
        <>
            {metric}
        </>
    );
}