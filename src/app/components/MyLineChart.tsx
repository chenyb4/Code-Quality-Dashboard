import {LineChart} from "@tremor/react";
import {formatToNetherlandsTimeFormat} from "@/app/utils/helperFucntions";

interface Props {
    historyArray: { date: Date, value: number }[];
}

export function MyLineChart({historyArray}: Props) {

    //let historyArrayFormatted = formatToNetherlandsTimeFormat(historyArray);

    let historyArrayConverted:{ date: string, value: string }[]=[];

    historyArray.forEach((dp)=>{
        historyArrayConverted.push({date:dp.date.toDateString(),value:dp.value.toString()});
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
            autoMinValue={true}
            showLegend={false}
            showXAxis={false}
            showYAxis={true}
            showGridLines={true}
        />
    );
}

