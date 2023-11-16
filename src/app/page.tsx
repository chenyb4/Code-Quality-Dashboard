
import React from "react";
import {Dashboard} from "@/app/components/DashBoard";
import {getProjectsFromSonarQube} from "@/app/utils/dataFetchers";

export default async function Home() {
    // const [value, setValue] = useState("");
    //
    // let projects=await getProjectsFromSonarQube();
    // console.log(projects);



    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Dashboard component='launchpad'/>
        </main>
    );
}
