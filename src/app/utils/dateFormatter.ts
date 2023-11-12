/**
 * format the date to Netherlands format which is dd/mm/yyyy
 * @param input a string of the date input in a format of yyyy-mm-dd
 * @return a string of formatted date in the format of dd/mm/yyyy
 */
export function formatDate (input:string) {
    var datePart = input.match(/\d+/g),
        year = datePart?.[0].substring(0), // get four digits
        month = datePart?.[1], day = datePart?.[2];

    return day+'/'+month+'/'+year;
}