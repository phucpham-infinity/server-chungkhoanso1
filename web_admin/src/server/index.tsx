import React from "react";
import PocketBase from "pocketbase";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export * from "./axios_config";

interface IServerProvider {
  children: React.ReactElement;
}

const queryClient = new QueryClient();

export default function ServerProvider(props: IServerProvider) {
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
}

export const pb = new PocketBase("https://server.chungkhoanso1.vn");
