import {LineChart} from "@tremor/react";
import {formatDate} from "@/app/helpers/dateFormatter";

interface Props {
    data: { date: string, value: string }[];
}


export function MyLineChart({data}: Props) {

    let dataFormatted: { date: string, value: string }[]=[];

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
            className="mt-6"
            data={dataFormatted}
            index="date"
            categories={["value"]}
            colors={["emerald"]}
            yAxisWidth={40}
        />
    );
}

