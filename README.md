# automate-workflow-usa

Automate fetch data from GQL, post data using REST API and save all countries information in CSV file just using a simple command.

In this project, handle some required type of error like:

- 403 Forbidden: Log the error and skip the request.
- 500 Internal Server Error: Retry the request with exponential backoff.
- Log all errors to the console for debugging.

## To run this project (Read carefully)

To run this project in local machine please run the following command in project root directory terminal

1st of all Node.js must be installed in your machine. (If also installed "yarn" then you can try with yarn related commands otherwise please use npm related commands.)

Then run the following command for install all dependencies to run this project

```
yarn
```

or

```
npm install
```

Then run the following command to run the project

```
yarn start
```

or

```
npm start
```

The it will do all task automatically.

## Technology

- Node.js
