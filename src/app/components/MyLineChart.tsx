import {LineChart} from "@tremor/react";
import {formatToNetherlandsTimeFormat} from "@/app/utils/helperFucntions";

interface Props {
    historyArray: { date: Date, value: number }[];
}

export function MyLineChart({historyArray}: Props) {

    let historyArrayConverted:{ date: string, value: string }[]=[];

    let minValue=Infinity;
    let maxValue=-Infinity;

    historyArray.forEach((dp)=>{
        historyArrayConverted.push({date:dp.date.toDateString(),value:dp.value.toString()});
        if(dp.value>maxValue){
            maxValue=dp.value;
        }
        if(dp.value<minValue){
            minValue=dp.value;
        }
    });

    return (
        <LineChart
            className="mt-10 h-40"
            data={historyArrayConverted}
            index="date"
            categories={["value"]}
            colors={["emerald"]}
            yAxisWidth={40}
            showAnimation={true}
            maxValue={maxValue}
            minValue={minValue}
            showLegend={false}
            showXAxis={false}
            showYAxis={true}
            showGridLines={true}
        />
    );
}

