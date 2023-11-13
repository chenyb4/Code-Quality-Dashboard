import { Card, Text} from "@tremor/react";
import {MyLineChart} from "@/app/components/MyLineChart";
import React from "react";
import {MyBadgeDeltaAndMetric} from "@/app/components/MyBadgeDeltaAndMetric";

interface Props {
    title:string;
    history: { date: string, value: string }[];
    isIncreasePositive:boolean;

}

export function MyCard({title,history,isIncreasePositive}:Props){

    let badgeDeltaAndMetric=MyBadgeDeltaAndMetric({title,history,isIncreasePositive});

    return(
        <Card className='w-auto shadow-md border-gray-300 border' >
            <Text className="text-3xl font-bold dark:text-white text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-emerald-400 float-left">
                {title}
            </Text>
            {badgeDeltaAndMetric}
            <MyLineChart historyArray={history}/>
        </Card>
    )
}