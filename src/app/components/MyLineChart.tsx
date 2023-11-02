import {LineChart} from "@tremor/react";

interface Props{
    data:{date:string, value:string}[];
}



export function MyLineChart({data}:Props) {
    return(
        <LineChart
            className = "mt-6"
            data = {data}
            index = "date"
            categories = {["value"]}
            colors = {["emerald"]}
            yAxisWidth = {40}
        />
    );
}

