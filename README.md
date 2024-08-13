# Code Quality Dashboard

## Configure Authentication

There is an ```.env.dist``` template file in the root directory with links to which we can get all the necessary tokens for authentication. Fill the tokens in the applicable places in that file and then rename that file to ```.env```.

## Development

From your terminal:

```sh
npm run dev
```

Open http://localhost:3000 with your browser to see the result.


## Current Problems
0) there are lots of refactoring jobs needs to be done:
```
1. base url for calls.
2. removing printdeal eslint.
3. token type can be in the config file.
4.pass the metric config in one object.
5. generate the metrics array based on metric config.
6. generate the cards based on metric config.
(maybe also add a enable or not property in the metric config file
 to allow temperarily disable some of the cards and not show them).
7. ordering the cards based on some sorting preference.
8. drag and drop to order the cards.
```
1) the api call needs to be http or https need to be checked with postman.
2) the authorization token's surfix is Bearer or Basic needs to be checked.
3) in the select component, the name of the project is not always the same with the key of the component. querying the data needs the key, while displaying the projects in the select component needs the name.
4) 


could further develop:
1)data range picker
2)cronjob for deprecated components. 

