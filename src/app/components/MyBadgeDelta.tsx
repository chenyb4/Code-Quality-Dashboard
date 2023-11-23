import {getImprovement} from "@/app/utils/helperFucntions";
import {Badge, BadgeDelta} from "@tremor/react";

interface Props {
    history: { date: string, value: string }[];
    isIncreasePositive: boolean;
}

export function MyBadgeDelta({history, isIncreasePositive}: Props) {

    const styleForBadgeDelta = "float-left ml-4";

    let badgeDelta = null;



    if(history.length>1){
        //last value - first value
        let improvement = getImprovement(history);
        let improvementAbsolute = Math.abs(improvement);

        const firstValue = parseInt(history[0].value);
        let improvementInPercentage = Math.ceil((improvementAbsolute / firstValue) * 100);

        if (improvement >= 0) {
            badgeDelta = <BadgeDelta className={styleForBadgeDelta} deltaType="moderateIncrease"
                                     isIncreasePositive={isIncreasePositive}>{improvementInPercentage}%</BadgeDelta>;
        } else {
            badgeDelta = <BadgeDelta className={styleForBadgeDelta} deltaType="moderateDecrease"
                                     isIncreasePositive={isIncreasePositive}>{improvementInPercentage}%</BadgeDelta>;
        }
    }else{
        badgeDelta = <Badge className={styleForBadgeDelta} color='emerald'>no data</Badge>
    }



    return (
        <>
            {badgeDelta}
        </>
    );
}