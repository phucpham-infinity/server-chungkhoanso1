import { axios } from "@/server";
import { useMutation, useQuery } from "@tanstack/react-query";
import { keyBy } from "lodash";

export const useBloc = ({ id }) => {
  const {
    data: dataStocks,
    isLoading: isLoadingStocks,
    refetch: refetchStocks,
  } = useQuery({
    queryKey: ["users_investment", id],
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () => {
      return axios<any, any>({
        url: "/table",
        method: "GET",
        transformResponse: (res) => {
          return JSON.parse(res)?.data?.records;
        },
        params: {
          table: "users_investment",
          limit: 100,
          filter: {
            user_id: [id],
          },
        },
      });
    },
  });

  const { mutateAsync: handleAddNewStock, isLoading: isLoadingAddNewStock } =
    useMutation((data: any) => {
      return axios({
        method: "POST",
        url: "/table",
        params: {
          table: "users_investment",
        },
        data,
      });
    });

  const { mutateAsync: handleRemoveStock, isLoading: isLoadingRemoveStock } =
    useMutation((id: any) => {
      return axios({
        method: "DELETE",
        url: "/table/" + id,
        params: {
          table: "users_investment",
        },
      });
    });

  const { data: dataPinnedStocks, isLoading: isLoadingPinnedStocks } = useQuery(
    {
      queryKey: ["stocks_pined_detail", dataStocks],
      enabled: !!dataStocks?.length,
      queryFn: () => {
        return axios<any, any>({
          baseURL: `https://finfo-api.vndirect.com.vn/v4/change_prices?q=code:${dataStocks
            .map((x) => x.code)
            .join(",")}~period:1D`,
          method: "GET",
        });
      },
    }
  );

  return {
    dataStocks: dataStocks ? [...dataStocks, { id: 0 }] : [{ id: 0 }],
    isLoadingStocks: isLoadingStocks || isLoadingPinnedStocks,
    refetchStocks,
    isLoadingAddNewStock,
    isLoadingRemoveStock,
    handleAddNewStock,
    handleRemoveStock,
    dataPinnedStocks: keyBy(dataPinnedStocks?.data, "code"),
  };
};
