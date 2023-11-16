import {Card, Text} from "@tremor/react";
import {MyLineChart} from "@/app/components/MyLineChart";
import React from "react";
import {MyMetric} from "@/app/components/MyMetric";
import {MyBadgeDelta} from "@/app/components/MyBadgeDelta";

interface Props {
    title: string;
    history?: { date: string, value: string }[];
    isIncreasePositive?: boolean;
    formatToPercentage?: boolean;
    formatToHoursAndMinutes?: boolean;
    currentValueIfKnown?: number;

}

export function MyCard({
                           title,
                           history,
                           isIncreasePositive=true,
                           formatToHoursAndMinutes = false,
                           formatToPercentage = false,
                           currentValueIfKnown = 0,
                       }: Props) {


    let badgeDelta = null;
    let metric;
    let lineChart = null;

    if (history) {
        metric = MyMetric({
            history,
            formatToHoursAndMinutes,
            formatToPercentage,
        });
        badgeDelta = MyBadgeDelta({history, isIncreasePositive});
        lineChart = <MyLineChart historyArray={history}/>
    } else {
        metric = MyMetric({currentValueIfKnown,});
    }


    return (
        <Card className='w-96 shadow-md border-gray-300 border'>
            <Text
                className="text-3xl font-bold dark:text-white text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-emerald-400 float-left">
                {title}
            </Text>
            {badgeDelta}
            {metric}
            {lineChart}
        </Card>
    )
}