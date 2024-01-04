import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const { SONARQUBE_TOKEN } = process.env;

/**
 * fetch SonarQube measures history from SonarQube web api
 * @param component the name of the project we want to fetch data for, e.g. "launchpad".
 * @param metrics SonarQube metrics for which we want the data history.
 * more metrics https://docs.sonarsource.com/sonarqube/latest/user-guide/metric-definitions/
 * @param ps Page size. Must be greater than 0 and less or equal than 1000.
 * @param from Filter measures created after the given date (inclusive). Either a date (server timezone) or datetime
 * can be provided.
 * @return SonarQube data in JSON.
 */
export async function getSonarQubeMeasuresHistory(component: string, metrics: string, ps: string, from: string) {
  const resp = await fetch(
    `https://sonarqube.app1.printdeal.cloud/api/measures/search_history?${new URLSearchParams({
      component,
      metrics,
      ps,
      from,
    })}`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        authorization: `Basic ${SONARQUBE_TOKEN}`,
      },
    },
  );
  const data = resp.json();
  return data;
}

/**
 * Retrieves SonarQube issues based on specified rules.
 *
 * @param {string} component - The component of the SonarQube project.
 * @param {string} ps - The project or project branch.
 * @param {string} rules - The rules to filter the issues.
 * @param {string} statuses - The statuses to filter the issues.
 *
 * @returns {Promise<Object>} - A promise that resolves to the data containing the SonarQube issues.
 * @throws {Error} - If the fetch fails or the data is empty.
 */
export async function getSonarQubeIssuesByRules(component: string, ps: string, rules: string, statuses:string) {
  const resp = await fetch(
    `https://sonarqube.app1.printdeal.cloud/api/issues/search?${new URLSearchParams({
      componentKeys: component,
      ps,
      rules,
      statuses,
    })}`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        authorization: `Basic ${SONARQUBE_TOKEN}`,
      },
    },
  );
  const data = resp.json();
  return data;
}

/**
 * Fetches projects from SonarQube.
 *
 * @returns {Promise} A promise that resolves with the fetched projects from SonarQube.
 * @throws {Error} If there is an error fetching the projects.
 */
export async function getProjectsFromSonarQube() {
  const resp = await fetch(
    `https://sonarqube.app1.printdeal.cloud/api/components/search?${new URLSearchParams({
      qualifiers: 'TRK',
    })}`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        authorization: `Basic ${SONARQUBE_TOKEN}`,
      },
    },
  );
  const data = resp.json();
  return data;
}

/**
 * Retrieves the measurement history from the database for a specific project and metric.
 *
 * @param {string} projectKey - The key of the project.
 * @param {string} metricKey - The key of the metric.
 * @param {number} [from] - Optional. The starting date to filter the results. Need to be in epoch seconds.
 * @param {number} [till] - Optional. The ending date to filter the results. Need to be in epoch seconds.
 * @return {Promise<Array<Object>>} - A promise that resolves to an array of objects representing
 * the measurement history.
 */
export async function getMeasureHistoryFromDb(projectKey:string, metricKey:string, from?:number, till?:number) {
  let sql = 'SELECT * FROM history WHERE';
  sql += ` projectKey='${projectKey}' AND`;
  sql += ` metricKey='${metricKey}'`;

  if (from) {
    sql += ` AND date >= ${from}`;
  }
  if (till) {
    sql += ` AND date <= ${till}`;
  }

  sql += ' ORDER BY date';

  let db = null;

  db = await open({
    filename: './src/app/db/db.db',
    driver: sqlite3.Database,
  });

  const items = await db.all(sql);
  return items;
}
