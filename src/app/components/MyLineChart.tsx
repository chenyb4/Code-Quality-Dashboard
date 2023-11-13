import {LineChart} from "@tremor/react";
import {formatDate, formatToNetherlandsTimeFormat} from "@/app/utils/helperFucntions";

interface Props {
    historyArray: { date: string, value: string }[];
}

export function MyLineChart({historyArray}: Props) {

    let historyArrayFormatted=formatToNetherlandsTimeFormat(historyArray);

    return (
        <LineChart
            className="mt-6 h-52"
            data={historyArrayFormatted}
            index="date"
            categories={["value"]}
            colors={["emerald"]}
            yAxisWidth={40}
            showAnimation={true}
        />
    );
}

