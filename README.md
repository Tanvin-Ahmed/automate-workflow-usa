# automate-workflow-usa

Automate fetch data from GQL, post data using REST API and save all countries information in CSV file just using a simple command.

In this project, handle some required type of error like:

- 403 Forbidden: Log the error and skip the request.
- 500 Internal Server Error: Retry the request with exponential backoff.
- Log all errors to the console for debugging.

To run this project in local machine please run the following command in project root directory terminal

```
yarn start
```

or

```
npm start
```

The it will do all task automatically.
