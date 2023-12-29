import React from "react";
import {Dashboard} from "@/app/components/DashBoard";
import {getProjectsFromSonarQube} from "@/app/utils/dataFetchers";
import {MySelect} from "@/app/components/MySelect";
import {Bold, Subtitle} from "@tremor/react";
import {addDays} from "@/app/utils/dataRangePicker";
import {formatDate, formatDateAmericanToDutch} from "@/app/utils/helperFucntions";


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

    let dashboard=null;
    let subtitle=null;

    if(searchParams.project!=undefined && searchParams.project!=''){
        dashboard=<Dashboard component={searchParams.project}/>
        subtitle=<Subtitle><Bold>From</Bold> {fromDateString} <Bold>to</Bold> {currentDateString}</Subtitle>
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-10">
            <div>
                <div className="flex justify-between">
                    <MySelect projects={projects} currentProj={searchParams.project}/>
                    {subtitle}
                </div>
                {dashboard}
            </div>

        </main>
    );
}
