const {SONARQUBE_TOKEN} = process.env;


/**
 * fetch SonarQube measures history from SonarQube web api
 * @param component the name of the project we want to fetch data for, e.g. "launchpad".
 * @param metrics SonarQube metrics for which we want the data history.
 * more metrics https://docs.sonarsource.com/sonarqube/latest/user-guide/metric-definitions/
 * @param ps Page size. Must be greater than 0 and less or equal than 1000.
 * @param from Filter measures created after the given date (inclusive). Either a date (server timezone) or datetime can be provided.
 * @return SonarQube data in JSON.
 */
export async function getSonarQubeMeasuresHistory(component: string, metrics: string, ps: string, from: string) {
    const resp = await fetch('https://sonarqube.app1.printdeal.cloud/api/measures/search_history?' + new URLSearchParams({
        component: component,
        metrics: metrics,
        ps: ps,
        from: from,
    }),
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'authorization': 'Basic ' + SONARQUBE_TOKEN,
            }
        });
    let data = resp.json();
    if (!data) {
        throw new Error('Failed to fetch');
    }
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
    const resp = await fetch('https://sonarqube.app1.printdeal.cloud/api/issues/search?' + new URLSearchParams({
        componentKeys: component,
        ps: ps,
        rules: rules,
        statuses:statuses,
    }),
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'authorization': 'Basic ' + SONARQUBE_TOKEN,
            }
        });
    let data = resp.json();
    if (!data) {
        throw new Error('Failed to fetch');
    }
    return data;
}




/**
 * Fetches projects from SonarQube.
 *
 * @returns {Promise} A promise that resolves with the fetched projects from SonarQube.
 * @throws {Error} If there is an error fetching the projects.
 */
export async function getProjectsFromSonarQube() {
    const resp = await fetch('https://sonarqube.app1.printdeal.cloud/api/components/search?' + new URLSearchParams({
        qualifiers:'TRK',
    }),
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'authorization': 'Basic ' + SONARQUBE_TOKEN,
            }
        });
    let data = resp.json();
    if (!data) {
        throw new Error('Failed to fetch');
    }
    return data;
}


/**
 * Retrieves measure history from the database based on the project key and metric key.
 *
 * @param {string} projectKey - The project key.
 * @param {string} metricKey - The metric key.
 *
 * @return {Promise} - A promise that resolves to the measure history data from the database.
 * @throws {Error} - If failed to fetch the measure history data.
 */
export async function getMeasureHistoryFromDb(projectKey:string, metricKey:string){
    const resp = await fetch('http://localhost:3000/api?' + new URLSearchParams({
        projectKey: projectKey,
        metricKey: metricKey,
    }),
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        });
    let data = resp.json();
    if (!data) {
        throw new Error('Failed to fetch');
    }
    return data;
}