import {Button, Card, Text} from "@tremor/react";
import {MyLineChart} from "@/app/components/MyLineChart";
import React from "react";
import {MyMetric} from "@/app/components/MyMetric";
import {MyBadgeDelta} from "@/app/components/MyBadgeDelta";
import {FormattingType} from "@/app/utils/FormattingType";

interface Props {
    title: string;
    history?: { date: Date, value: number }[];
    isIncreasePositive: boolean;
    formattingType: FormattingType;
}

export function SonarQubeCard({
                           title,
                           history,
                           isIncreasePositive = true,
                           formattingType,
                       }: Props) {
    let badgeDelta = null;
    let metric=null;
    let lineChart = null;

    if(history){
        metric = MyMetric({history, formattingType,});
        badgeDelta = MyBadgeDelta({history, isIncreasePositive});
        lineChart = <MyLineChart historyArray={history}/>;
    }else{
        metric=<MyMetric/>
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