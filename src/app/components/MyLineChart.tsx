import {LineChart} from "@tremor/react";
import {formatToNetherlandsTimeFormat} from "@/app/utils/helperFucntions";

interface Props {
    historyArray: { date: string, value: string }[];
}

export function MyLineChart({historyArray}: Props) {

    let historyArrayFormatted = formatToNetherlandsTimeFormat(historyArray);

    return (
        <LineChart
            className="mt-10 h-40"
            data={historyArrayFormatted}
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

