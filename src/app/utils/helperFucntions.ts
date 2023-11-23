/**
 * get the current value which is the last value in the history array
 * @param historyArray the history array from SonarQube data
 * @return current value
 */
export function getCurrentValue(historyArray: { date: string, value: string }[]) {
    let currentValue;
    if(historyArray.length>0){
        currentValue=historyArray[historyArray.length - 1];
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
export function getImprovement(historyArray: { date: string, value: string }[]): number {
    const firstItem = historyArray[0];
    const lastItem = historyArray[historyArray.length - 1];
    const improvement = parseInt(lastItem.value) - parseInt(firstItem.value);
    return improvement;

}

/**
 * format the date to Netherlands format which is dd/mm/yyyy
 * @param input a string of the date input in a format of yyyy-mm-dd
 * @return a string of formatted date in the format of dd/mm/yyyy
 */
export function formatDate(input: string) {
    var datePart = input.match(/\d+/g),
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