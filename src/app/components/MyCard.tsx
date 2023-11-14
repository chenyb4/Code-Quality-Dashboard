import {Card, Text} from "@tremor/react";
import {MyLineChart} from "@/app/components/MyLineChart";
import React from "react";
import {MyMetric} from "@/app/components/MyMetric";
import {MyBadgeDelta} from "@/app/components/MyBadgeDelta";

interface Props {
    title: string;
    history: { date: string, value: string }[];
    isIncreasePositive: boolean;
    formatToPercentage?: boolean;
    formatToHoursAndMinutes?: boolean;

}

export function MyCard({
                           title,
                           history,
                           isIncreasePositive,
                           formatToHoursAndMinutes = false,
                           formatToPercentage = false
                       }: Props) {

    let badgeDeltaAndMetric = MyMetric({
        history,
        formatToHoursAndMinutes,
        formatToPercentage
    });

    let badgeDelta = MyBadgeDelta({history, isIncreasePositive});

    return (
        <Card className='w-96 shadow-md border-gray-300 border'>
            <Text
                className="text-3xl font-bold dark:text-white text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-emerald-400 float-left">
                {title}
            </Text>
            {badgeDelta}
            {badgeDeltaAndMetric}
            <MyLineChart historyArray={history}/>
        </Card>
    )
}