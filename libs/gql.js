import { GraphQLClient } from "graphql-request";

// Define the GraphQL endpoint
const endpoint = "https://countries.trevorblades.com/";

// Create a GraphQL client
export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "Content-Type": "application/json",
  },
});
