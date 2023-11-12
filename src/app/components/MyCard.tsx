import {BadgeDelta, Card} from "@tremor/react";
import {MyLineChart} from "@/app/components/MyLineChart";
import React from "react";

interface Props {
    title:string;
    history: { date: string, value: string }[];
}


export function MyCard({title,history}:Props){



    return(
        <Card className='w-96 shadow-2xl' >
            <h1>{title}</h1>

            <BadgeDelta deltaType="moderateIncrease" isIncreasePositive={true} size="xs">

            </BadgeDelta>

            <MyLineChart data={history}/>


        </Card>
    )
}