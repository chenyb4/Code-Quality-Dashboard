
import {getSonarQubeMeasuresHistory} from "@/app/utils/dataFetchers";


/**
 * add days to a date provided
 * @param date date provided
 * @param days number of days to add to it. can be negative whole number
 * @return the date after the days are added
 */
function addDays(date:Date, days:number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}



/**
 * get data by data from how many days ago we want to see
 * @param days the number of days to trace back
 * @return array of sonarqube data
 */
export async function getDataByDaysAgo(days:number, component:string){
    const currentDate=new Date();
    const fromDateString=addDays(currentDate,0-days).toISOString().split('T')[0];
    const data = await getSonarQubeMeasuresHistory(component,'coverage,cognitive_complexity,sqale_index','1000',fromDateString);
    return data;
}