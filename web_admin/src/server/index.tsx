import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
export * from "./axios_config";

interface IServerProvider {
  children: React.ReactElement;
}

const queryClient = new QueryClient();

export default function ServerProvider(props: IServerProvider) {
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
