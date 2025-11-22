import { createRoot } from "react-dom/client";
import "./index.css";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "./services/apollo-client.ts";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={apolloClient}>
    <RouterProvider router={routes} />
  </ApolloProvider>
);
