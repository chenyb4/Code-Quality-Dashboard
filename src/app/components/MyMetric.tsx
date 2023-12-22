import {formatCurrentValue, getCurrentValue} from "@/app/utils/helperFucntions";
import {Metric} from "@tremor/react";
import React from "react";
import {FormattingType} from "@/app/utils/FormattingType";

interface Props {
    history?: { date: Date, value: number }[];
    formattingType?:FormattingType
    currentValueIfKnown?: number;

}

export function MyMetric({
                             history=[],
                             formattingType,
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
        let metricString='';
        metricString=formatCurrentValue(currentValue,formattingType);
        metric = <Metric className={styleForMetric}>{metricString}</Metric>
    }else{
        metric = <Metric className={styleForMetric}>no data</Metric>
    }

    return (
        <>
            {metric}
        </>
    );
}