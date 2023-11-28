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