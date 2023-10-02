import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axios } from "@/server";
import { isEmpty } from "lodash";

export const useBloc = () => {
  const [stocksCode, setStocksCode] = useState("");

  const {
    data: dataStocks,
    isLoading: isLoadingStocks,
    refetch: refetchStocks,
    isSuccess,
  } = useQuery({
    queryKey: ["stocks_pined"],
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    queryFn: () => {
      return axios<any, any>({
        url: "/table",
        method: "GET",
        transformResponse: (res) => {
          return JSON.parse(res)?.data?.records;
        },
        params: {
          table: "stocks",
          limit: 6,
          filter: {
            pinned: [1],
          },
        },
      });
    },
  });

  const { data: dataPinnedStocks, isLoading: isLoadingPinnedStocks } = useQuery(
    {
      queryKey: ["stocks_pined_detail", stocksCode],
      enabled: !!stocksCode,
      queryFn: () => {
        return axios<any, any>({
          baseURL: `https://finfo-api.vndirect.com.vn/v4/change_prices?q=code:${stocksCode}~period:1D`,
          method: "GET",
        });
      },
    }
  );

  useEffect(() => {
    if (!isEmpty(dataStocks)) {
      setStocksCode(dataStocks?.map((x: any) => x.code).join(","));
    }
  }, [isSuccess]);

  return {
    dataPinnedStocks,
    dataStocks,
    isLoading: isLoadingStocks || isLoadingPinnedStocks,
    refetchStocks,
  };
};
