const {SONARQUBE_TOKEN} = process.env;

export async function getSonarQubeData(component:string,metrics:string, ps:string, from:string) {
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