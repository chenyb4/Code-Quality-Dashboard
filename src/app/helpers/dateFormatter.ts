export function formatDate (input:string) {
    var datePart = input.match(/\d+/g),
        year = datePart?.[0].substring(0), // get four digits
        month = datePart?.[1], day = datePart?.[2];

    return day+'/'+month+'/'+year;
}