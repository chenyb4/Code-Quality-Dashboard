import { FormattingType } from '@/app/utils/FormattingType';

/**
 * get the current value which is the last value in the history array
 * @param historyArray the history array from SonarQube data
 * @return current value
 */
export function getCurrentValue(historyArray: { date: Date, value: number }[]):number {
  let currentValue:number;
  if (historyArray.length > 0) {
    currentValue = historyArray[historyArray.length - 1].value;
  } else {
    currentValue = 0;
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
  if (historyArray.length > 0) {
    const firstItem = historyArray[0];
    const lastItem = historyArray[historyArray.length - 1];
    improvement = lastItem.value - firstItem.value;
  } else {
    improvement = 0;
  }
  return improvement;
}

/**
 * format the date to Netherlands format which is dd/mm/yyyy
 * @param input a string of the date input in a format of yyyy-mm-dd
 * @return a string of formatted date in the format of dd/mm/yyyy
 */
export function formatDate(input: string) {
  const datePart = input.match(/\d+/g);
  const year = datePart?.[0].substring(0); // get four digits
  const month = datePart?.[1]; const
    day = datePart?.[2];

  return `${day}/${month}/${year}`;
}

/**
 * converts the date and time format in SonarQube data from yyyy-mm-dd to dd/mm/yyyy
 * @param data the history array from the SonarQube data
 * @return the history array from the SonarQube data with Netherlands date and time format
 */
export function formatToNetherlandsTimeFormat(data: { date: string, value: string }[]) {
  const dataFormatted: { date: string, value: string }[] = [];
  data.forEach((obj) => {
    let formattedDate = obj.date.slice(0, 10);
    formattedDate = formatDate(formattedDate);
    const formattedDp: { date: string, value: string } = { date: '', value: '' };
    formattedDp.date = formattedDate;
    formattedDp.value = obj.value;
    dataFormatted.push(formattedDp);
  });
  return dataFormatted;
}

/**
 * Converts a date string from American format (MMM DD YYYY) to Dutch format (DD/MM/YYYY).
 *
 * @param {string} dateString - The date string to be converted.
 *
 * @return {string} - The date string converted to Dutch format.
 */
export function formatDateAmericanToDutch(dateString:string) {
  // Create a mapping for month names
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
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

/**
 * Formats the history array from the database for a card.
 *
 * @param {Array} history - The history array from the database with dates in epoch seconds.
 * @return {Array} - The formatted history array for the card with dates in good format.
 */
export function formatDbHistoryArrayForCard(history:{ date: number, value: number }[]) {
  const formattedHistory: { date: Date, value: number }[] = history.map((item: { date: number, value: number }) => {
    const d = new Date(0);
    d.setUTCSeconds(item.date);
    return {
      date: d,
      value: item.value,
    };
  });
  return formattedHistory;
}

/**
 * Formats the given value based on the provided formatting type.
 * @param {number} value - The value to format.
 * @param {FormattingType} [formattingType] - The formatting type.
 * @return {string} - The formatted value as a string.
 */
export function formatCurrentValue(value:number, formattingType?:FormattingType):string {
  let formattedString = '';
  if (formattingType == FormattingType.PERCENTAGE) {
    formattedString = value.toString();
    formattedString += '%';
  } else if (formattingType == FormattingType.ABSOLUTE) {
    formattedString = new Intl.NumberFormat('en-IN').format(value);
  } else if (formattingType == FormattingType.HOURSANDMINUTES) {
    let minutes = null;
    let hours = null;
    minutes = value % 60;
    hours = Math.floor(value / 60);
    formattedString = hours.toString();
    formattedString += 'h ';
    formattedString += minutes.toString();
    formattedString += 'm';
  }
  return formattedString;
}
