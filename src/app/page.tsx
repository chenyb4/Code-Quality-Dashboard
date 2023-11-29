import React from "react";
import {Dashboard} from "@/app/components/DashBoard";
import {getProjectsFromSonarQube} from "@/app/utils/dataFetchers";
import {MySelect} from "@/app/components/MySelect";
import {Bold, Subtitle} from "@tremor/react";
import {addDays} from "@/app/utils/dataRangePicker";
import {formatDate, formatDateAmericanToDutch, formatToNetherlandsTimeFormat} from "@/app/utils/helperFucntions";



interface Props{
    searchParams:{project:string}
}


export default async function Home({searchParams}:Props) {

    let projectsData = await getProjectsFromSonarQube();

    const currentDate=new Date();
    let fromDateString=addDays(currentDate,0-30).toISOString().split('T')[0];
    fromDateString=formatDate(fromDateString);
    let currentDateString=currentDate.toDateString();
    currentDateString=formatDateAmericanToDutch(currentDateString);




    let projects = projectsData.components;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-10">
            <div>
                <div className="flex justify-between">
                    <MySelect teams={projects} defaultValue='launchpad'/>
                    <Subtitle><Bold>From</Bold> {fromDateString} <Bold>to</Bold> {currentDateString}</Subtitle>
                </div>

                <Dashboard component={searchParams.project||'launchpad'}/>
            </div>

        </main>
    );
}
