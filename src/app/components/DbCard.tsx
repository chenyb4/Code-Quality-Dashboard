'use client';

import { Button, Card, Text } from '@tremor/react';
import { MyLineChart } from '@/app/components/MyLineChart';
import React from 'react';
import { MyMetric } from '@/app/components/MyMetric';
import { MyBadgeDelta } from '@/app/components/MyBadgeDelta';
import { FormattingType } from '@/app/utils/FormattingType';

const storeToDb = async () => {
  const form = document.getElementById('myForm');

  const formData = new FormData(form);
  const jsonData = {};

  formData.forEach((value, key) => {
    jsonData[key] = value;
  });

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000/api', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Handle the response
      console.log(xhr.responseText);
    }
  };
  xhr.send(JSON.stringify(jsonData));
};

interface Props {
  title: string;
  history?: { date: Date, value: number }[];
  isIncreasePositive: boolean;
  formattingType: FormattingType;
  currentValue: number;
  component: string;
  metricKey: string;

}

export const DbCard = ({
  title,
  history,
  formattingType,
  isIncreasePositive,
  currentValue,
  component,
  metricKey,
}: Props) => {
  // these two might not be shown
  // depending on whether there are data points in DB
  let badgeDelta = null;
  let lineChart = null;

  // these are definitely shown
  // form and metric are always there
  // because this is DB card, metric always use currentValue that is known
  // from calculating the array length of the issues from sonarqube
  const metric = <MyMetric currentValueIfKnown={currentValue} formattingType={formattingType} />;
  let form = null;

  form = (
    <form id="myForm">
      <input type="hidden" id="projectKey" name="projectKey" value={component} readOnly required />
      <input type="hidden" id="metricKey" name="metricKey" value={metricKey} readOnly required />
      <input
        type="hidden"
        id="date"
        name="date"
        value={Math.floor((new Date()).getTime() / 1000)}
        readOnly
        required
      />
      <input type="hidden" id="value" name="value" value={currentValue} readOnly required />
      <input type="hidden" id="project" name="project" value={component} readOnly required />

      <Button size="xs" color="emerald" className="m-10" onClick={storeToDb}>
        store
        current value to DB
      </Button>
    </form>
  );

  // if there is a history from db, there should be a badge and line chart
  if (history) {
    badgeDelta = <MyBadgeDelta history={history} isIncreasePositive={isIncreasePositive} />;
    lineChart = <MyLineChart historyArray={history} />;
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
      {form}
    </Card>
  );
};
