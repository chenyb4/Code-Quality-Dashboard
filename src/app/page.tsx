//"use client";
import React from "react";
import {Dashboard} from "@/app/components/DashBoard";
import {getProjectsFromSonarQube} from "@/app/utils/dataFetchers";
import {Select, SelectItem} from "@tremor/react";
import {MySelect} from "@/app/components/MySelect";


export default async function Home({searchParams}) {

    let projectsData = await getProjectsFromSonarQube();
    //console.log(projectsData);
    let projects = projectsData.components;

console.log(searchParams);



    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <MySelect teams={projects}/>

            <Dashboard component={searchParams.project||'authentication'}/>
        </main>
    );
}
