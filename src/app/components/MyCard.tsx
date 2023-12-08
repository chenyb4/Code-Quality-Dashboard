'use client';
import {Button, Card, Text} from "@tremor/react";
import {MyLineChart} from "@/app/components/MyLineChart";
import React from "react";
import {MyMetric} from "@/app/components/MyMetric";
import {MyBadgeDelta} from "@/app/components/MyBadgeDelta";



interface Props {
    title: string;
    history?: { date: Date, value: number }[];
    isIncreasePositive?: boolean;
    formatToPercentage?: boolean;
    formatToHoursAndMinutes?: boolean;
    currentValueIfKnown?: number;
    component?: string;
    metricKey?: string;

}


export function MyCard({
                           title,
                           history,
                           isIncreasePositive = true,
                           formatToHoursAndMinutes = false,
                           formatToPercentage = false,
                           currentValueIfKnown = 0,
                           component,
                           metricKey,
                       }: Props) {


    let badgeDelta = null;
    let metric;
    let lineChart = null;
    let button = null;
    let form = null;

    const storeToDb = async () => {
        console.log("onclick function is called")
        let form = document.getElementById("myForm");

        let formData = new FormData(form);
        let jsonData = {};

        formData.forEach(function (value, key) {
            jsonData[key] = value;
        });

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/api", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Handle the response
                console.log(xhr.responseText);
            }
        };
        xhr.send(JSON.stringify(jsonData));
    }


    if (history) {
        metric = MyMetric({
            history,
            formatToHoursAndMinutes,
            formatToPercentage,
        });
        badgeDelta = MyBadgeDelta({history, isIncreasePositive});
        lineChart = <MyLineChart historyArray={history}/>;
    } else {
        metric = MyMetric({currentValueIfKnown,});

        form = <form id="myForm">
            <input type="hidden" id="projectKey" name="projectKey" value={component} readOnly={true} required/>
            <input type="hidden" id="metricKey" name="metricKey" value={metricKey} readOnly={true} required/>
            <input type="hidden" id="date" name="date" value={Math.floor((new Date()).getTime() / 1000)} readOnly={true} required/>
            <input type="hidden" id="value" name="value" value={currentValueIfKnown} readOnly={true} required/>

            <Button size="xs" color="emerald" className="m-10" onClick={storeToDb}>store
                current value to DB</Button>
        </form>
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
            {form}
        </Card>
    )
}