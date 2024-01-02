import { getImprovement } from '@/app/utils/helperFucntions';
import { Badge, BadgeDelta } from '@tremor/react';

interface Props {
  history: { date: Date, value: number }[];
  isIncreasePositive: boolean;
}

export const MyBadgeDelta = ({ history, isIncreasePositive }: Props) => {
  const styleForBadgeDelta = 'float-left ml-4';

  let badgeDelta = null;

  if (history.length > 1) {
    // last value - first value
    const improvement = getImprovement(history);
    const improvementAbsolute = Math.abs(improvement);

    const firstValue = history[0].value;
    const improvementInPercentage = Math.ceil((improvementAbsolute / firstValue) * 100);

    if (improvement > 0) {
      badgeDelta = (
        <BadgeDelta
          className={styleForBadgeDelta}
          deltaType="moderateIncrease"
          isIncreasePositive={isIncreasePositive}
        >
          {improvementInPercentage}
          %
        </BadgeDelta>
      );
    } else if (improvement < 0) {
      badgeDelta = (
        <BadgeDelta
          className={styleForBadgeDelta}
          deltaType="moderateDecrease"
          isIncreasePositive={isIncreasePositive}
        >
          {improvementInPercentage}
          %
        </BadgeDelta>
      );
    } else {
      badgeDelta = <Badge className={styleForBadgeDelta} color="emerald">→0%</Badge>;
    }
  } else {
    badgeDelta = <Badge className={styleForBadgeDelta} color="emerald">no data</Badge>;
  }

  return (
    badgeDelta
  );
};
