import { gql } from "graphql-request";
import { graphQLClient } from "./libs/gql.js";
import axios from "axios";
import { createObjectCsvWriter } from "csv-writer";
import path from "path";

// Define the CSV writer
const csvWriter = createObjectCsvWriter({
  path: path.resolve("countries.csv"),
  header: [
    { id: "name", title: "Country Name" },
    { id: "capital", title: "Capital" },
    { id: "currency", title: "Currency" },
  ],
});

// Function to fetch countries data
const fetchCountries = async () => {
  const query = gql`
    query {
      countries {
        name
        capital
        currency
      }
    }
  `;

  try {
    const data = await graphQLClient.request(query);
    return data.countries;
  } catch (error) {
    console.error("Error fetching countries data:", error);
    throw new Error("Failed to fetch countries");
  }
};

// Function to post country data
const postCountry = async (country, retries = 3) => {
  try {
    const postBody = {
      title: `Country: ${country.name}`,
      body: `Capital: ${country.capital}, Currency: ${country.currency}`,
      userId: 1,
    };

    const { data } = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      postBody
    );
    console.log("Expected response from post request:", JSON.stringify(data));
  } catch (error) {
    if (error.response?.status === 403) {
      console.error("403 Forbidden: Skipping this request.");
    } else if (error.response?.status === 500 && retries > 0) {
      console.error("500 Internal Server Error: Retrying request...");
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, 3 - retries) * 1000)
      ); // Exponential backoff
      await postCountry(country, retries - 1);
    } else {
      console.error("Error in post request:", error.message);
    }
  }
};

const automateWorkflow = async () => {
  try {
    console.log("automation started. Please wait...");
    // Fetch countries data
    const countries = await fetchCountries();
    const country = countries[0];

    // Post one country using REST API
    await postCountry(country);

    // Save data to CSV file
    await csvWriter.writeRecords(countries);

    console.log("Workflow executed successfully.");
  } catch (error) {
    console.error("Workflow error:", error);
  }
};

automateWorkflow();
