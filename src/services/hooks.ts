import { useQuery } from "@apollo/client/react";
import { HOMEPAGE_QUERY } from "./utils";
import type { GraphQLResponse } from "./types";

export const useHomePage = () => {
  const { loading, error, data } = useQuery<GraphQLResponse>(HOMEPAGE_QUERY, {
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });

  return {
    loading,
    error: error?.message || null,
    data,
  };
};
