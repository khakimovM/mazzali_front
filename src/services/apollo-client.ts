import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const STRAPI_BASE_URL =
  import.meta.env.VITE_STRAPI_BASE_URL || "http://localhost:1337";

// Create HTTP link to your Strapi GraphQL endpoint
const httpLink = new HttpLink({
  uri: `${STRAPI_BASE_URL}/graphql`,
});

// Create Apollo Client instance
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  // Optional: Add error handling
  defaultOptions: {
    watchQuery: {
      errorPolicy: "ignore",
    },
    query: {
      errorPolicy: "all",
    },
  },
});
