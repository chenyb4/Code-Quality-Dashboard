import { Card, Text } from '@tremor/react';
import { MyLineChart } from '@/app/components/MyLineChart';
import React from 'react';
import { MyMetric } from '@/app/components/MyMetric';
import { MyBadgeDelta } from '@/app/components/MyBadgeDelta';
import { FormattingType } from '@/app/utils/FormattingType';

interface Props {
  title: string;
  history?: { date: Date, value: number }[];
  isIncreasePositive: boolean;
  formattingType: FormattingType;
}

export const SonarQubeCard = ({
  title,
  history,
  isIncreasePositive = true,
  formattingType,
}: Props) => {
  let badgeDelta = null;
  let metric = null;
  let lineChart = null;

  if (history) {
    metric = MyMetric({ history, formattingType });
    badgeDelta = MyBadgeDelta({ history, isIncreasePositive });
    lineChart = <MyLineChart historyArray={history} />;
  } else {
    metric = <MyMetric />;
  }

  return (
    <Card className="w-96 border border-gray-300 shadow-md">
      <Text
        className="float-left bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-3xl font-bold text-transparent dark:text-white"
      >
        {title}
      </Text>
      {badgeDelta}
      {metric}
      {lineChart}

    </Card>
  );
};
