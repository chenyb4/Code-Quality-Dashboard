import {getCurrentValue} from "@/app/utils/helperFucntions";
import {Metric} from "@tremor/react";
import React from "react";


interface Props {
    history?: { date: string, value: string }[];
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

    let currentValue = null;
    if (currentValueIfKnown) {
        currentValue = currentValueIfKnown;
    } else {
        currentValue = getCurrentValue(history);
    }


    let minutes = null;
    let hours = null;
    if (formatToHoursAndMinutes) {
        hours = Math.floor(currentValue / 60);
        minutes = currentValue % 60;
    }
    let persentageMark = null;
    if (formatToPercentage) {
        persentageMark = "%";
    }

    let metric = null;

    if (formatToHoursAndMinutes) {
        let currentMinutesInTotal = currentValue;
        hours = Math.floor(currentMinutesInTotal / 60);
        minutes = currentMinutesInTotal % 60;
        metric = <Metric className={styleForMetric}>{hours}h {minutes}m</Metric>
    } else {
        metric = <Metric className={styleForMetric}>{currentValue}{persentageMark}</Metric>
    }

    return (
        <>
            {metric}
        </>
    );
}