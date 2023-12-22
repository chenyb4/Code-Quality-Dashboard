'use client';
import {Button, Card, Text} from "@tremor/react";
import {MyLineChart} from "@/app/components/MyLineChart";
import React from "react";
import {MyMetric} from "@/app/components/MyMetric";
import {MyBadgeDelta} from "@/app/components/MyBadgeDelta";
import {FormattingType} from "@/app/utils/FormattingType";

const storeToDb = async () => {

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


interface Props {
    title: string;
    history?: { date: Date, value: number }[];
    isIncreasePositive: boolean;
    formattingType: FormattingType;
    currentValue: number;
    component: string;
    metricKey: string;

}


export function DbCard({
                           title,
                           history,
                           formattingType,
                           isIncreasePositive,
                           currentValue,
                           component,
                           metricKey,
                       }: Props) {

//this might not be shown
    let badgeDelta = null;

    let metric;
    let lineChart = null;
    let button = null;
    let form = null;


    //form and metric are always there
    //because this is DB card, metric always use currentValue that is known
    //from calculating the array length of the issues from sonarqube
    metric = <MyMetric currentValueIfKnown={currentValue} formattingType={formattingType}/>
    form = <form id="myForm">
        <input type="hidden" id="projectKey" name="projectKey" value={component} readOnly={true} required/>
        <input type="hidden" id="metricKey" name="metricKey" value={metricKey} readOnly={true} required/>
        <input type="hidden" id="date" name="date" value={Math.floor((new Date()).getTime() / 1000)} readOnly={true}
               required/>
        <input type="hidden" id="value" name="value" value={currentValue} readOnly={true} required/>

        <Button size="xs" color="emerald" className="m-10" onClick={storeToDb}>store
            current value to DB</Button>
    </form>


//if there is a history from db, there should be a badge and line chart
    if (history) {
        badgeDelta = <MyBadgeDelta history={history} isIncreasePositive={isIncreasePositive}/>;
        lineChart = <MyLineChart historyArray={history}/>;
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