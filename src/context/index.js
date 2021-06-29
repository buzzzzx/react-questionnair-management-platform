import { AuthProvider } from "./auth-context";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const AppProviders = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
