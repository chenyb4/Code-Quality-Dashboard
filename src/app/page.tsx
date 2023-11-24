import React from "react";
import {Dashboard} from "@/app/components/DashBoard";
import {getProjectsFromSonarQube} from "@/app/utils/dataFetchers";
import {MySelect} from "@/app/components/MySelect";


interface Props{
    searchParams:{project:string}
}


export default async function Home({searchParams}:Props) {

    let projectsData = await getProjectsFromSonarQube();

    let projects = projectsData.components;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <MySelect teams={projects} defaultValue='launchpad'/>

                <Dashboard component={searchParams.project||'launchpad'}/>
            </div>

        </main>
    );
}
