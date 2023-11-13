import {LineChart} from "@tremor/react";
import {formatDate} from "@/app/utils/dateFormatter";

interface Props {
    data: { date: string, value: string }[];
}


export function MyLineChart({data}: Props) {

    let dataFormatted: { date: string, value: string }[]=[];


    //this block is just for formatting the date format to netherlands format
    // for each data point
    data.forEach((obj) => {
        let formattedDate = obj.date.slice(0, 10);
        formattedDate=formatDate(formattedDate);
        let formattedDp: { date: string, value: string } = {date:"", value:""};
        formattedDp.date = formattedDate;
        formattedDp.value = obj.value;
        dataFormatted.push(formattedDp);
    })

    return (
        <LineChart
            className="mt-6 h-52"
            data={dataFormatted}
            index="date"
            categories={["value"]}
            colors={["emerald"]}
            yAxisWidth={40}
            showAnimation={true}
        />
    );
}

