import {getCurrentValue, getImprovement} from "@/app/utils/helperFucntions";
import {BadgeDelta, Metric} from "@tremor/react";
import React from "react";


interface Props {
    history: { date: string, value: string }[];
    formatToPercentage: boolean;
    formatToHoursAndMinutes: boolean;

}

export function MyMetric({
                             history,
                             formatToHoursAndMinutes,
                             formatToPercentage
                         }: Props) {
    const styleForMetric = "text-emerald-600 mt-12 border-2 w-fit rounded-2xl border-emerald-600 p-2";

    let minutes = null;
    let hours = null;
    if (formatToHoursAndMinutes) {
        hours = Math.floor(parseInt(getCurrentValue(history)) / 60);
        minutes = parseInt(getCurrentValue(history)) % 60;
    }
    let persentageMark = null;
    if (formatToPercentage) {
        persentageMark = "%";
    }

    let metric = null;

    if (formatToHoursAndMinutes) {
        let currentMinutesInTotal = parseInt(getCurrentValue(history));
        hours = Math.floor(currentMinutesInTotal / 60);
        minutes = currentMinutesInTotal % 60;
        metric = <Metric className={styleForMetric}>{hours}h {minutes}m</Metric>
    } else {
        metric = <Metric className={styleForMetric}>{getCurrentValue(history)}{persentageMark}</Metric>
    }

    return (
        <>
            {metric}
        </>
    );
}