import {FormattingType} from "@/app/utils/FormattingType";
import {number} from "prop-types";

/**
 * get the current value which is the last value in the history array
 * @param historyArray the history array from SonarQube data
 * @return current value
 */
export function getCurrentValue(historyArray: { date: Date, value: number }[]):number {
    let currentValue:number;
    if(historyArray.length>0){
        currentValue=historyArray[historyArray.length - 1].value;
    }else{
        currentValue=0;
    }

    return currentValue;
}


/**
 * last value in the history array subtract the first value
 * @param historyArray the history array from SonarQube data
 * @return the value of last value in the history array subtract the first value
 */
export function getImprovement(historyArray: { date: Date, value: number }[]): number {
    let improvement;
    if(historyArray.length>0){
        const firstItem = historyArray[0];
        const lastItem = historyArray[historyArray.length - 1];
        improvement = lastItem.value - firstItem.value;
    }else{
        improvement=0;
    }
    return improvement;
}

/**
 * format the date to Netherlands format which is dd/mm/yyyy
 * @param input a string of the date input in a format of yyyy-mm-dd
 * @return a string of formatted date in the format of dd/mm/yyyy
 */
export function formatDate(input: string) {
    let datePart = input.match(/\d+/g),
        year = datePart?.[0].substring(0), // get four digits
        month = datePart?.[1], day = datePart?.[2];

    return day + '/' + month + '/' + year;
}


/**
 * converts the date and time format in SonarQube data from yyyy-mm-dd to dd/mm/yyyy
 * @param data the history array from the SonarQube data
 * @return the history array from the SonarQube data with Netherlands date and time format
 */
export function formatToNetherlandsTimeFormat(data: { date: string, value: string }[]) {
    let dataFormatted: { date: string, value: string }[] = [];
    data.forEach((obj) => {
        let formattedDate = obj.date.slice(0, 10);
        formattedDate = formatDate(formattedDate);
        let formattedDp: { date: string, value: string } = {date: "", value: ""};
        formattedDp.date = formattedDate;
        formattedDp.value = obj.value;
        dataFormatted.push(formattedDp);
    });
    return dataFormatted;
}


export function formatDateAmericanToDutch(dateString:string) {
    // Create a mapping for month names
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    // Split the input string into an array of parts
    const parts = dateString.split(' ');

    // Get day, month, and year
    const day = parts[2].padStart(2, '0');
    const month = (monthNames.indexOf(parts[1]) + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const year = parts[3];

    // Format the date as 'DD/MM/YYYY'
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}

export function formatDbHistoryArrayForCard(history:{date: number, value: number}[]){
    const formattedHistory: { date: Date, value: number }[] = history.map((item: { date: number, value: number }) => {
        let d=new Date(0);
        d.setUTCSeconds(item.date);
        return {
            date: d,
            value: item.value
        };
    });
    return formattedHistory;
}


function numberWithCommas(x:number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatCurrentValue(value:number,formattingType?:FormattingType):string{
    let formattedString='';
    if(formattingType==FormattingType.PERCENTAGE){
        formattedString=value.toString();
        formattedString+="%";
    }else if(formattingType==FormattingType.ABSOLUTE){
        formattedString=numberWithCommas(value);
    }else if(formattingType==FormattingType.HOURSANDMINUTES){
        let minutes = null;
        let hours = null;
        minutes = value % 60;
        hours = Math.floor(value / 60);
        formattedString=hours.toString();
        formattedString+="h ";
        formattedString+=minutes.toString();
        formattedString+="m";

    }
    return formattedString
}
