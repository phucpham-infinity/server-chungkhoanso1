import { useMutation, useQuery } from "@tanstack/react-query";
import { axios } from "@/server";
import { omit } from "lodash";
import { useEffect } from "react";

export const useBloc = () => {
  const {
    data: dataStocks,
    isLoading: isLoadingStocks,
    refetch: refetchStocks,
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
          filter: {
            pinned: [1],
          },
        },
      });
    },
  });
  const {
    data,
    isLoading,
    mutateAsync: handleSearchStock,
  } = useMutation(({ textSearch }: { textSearch: string }) => {
    return axios({
      method: "GET",
      url: "/table",
      params: {
        table: "stocks",
        search: {
          code: textSearch,
        },
      },
    });
  });

  const { mutate: handlePinStock, isSuccess } = useMutation((data: any) => {
    return axios({
      method: "POST",
      url: "/table",
      params: {
        table: "stocks",
        conflict: "code",
      },
      data: omit(data, ["id", "created_at", "updated_at"]),
    });
  });

  useEffect(() => {
    if (isSuccess) {
      refetchStocks();
    }
  }, [isSuccess]);

  const { isLoading: isLoadingReloadStocks, mutateAsync: handleReloadStocks } =
    useMutation(() => {
      return axios({
        method: "GET",
        baseURL:
          "https://finfo-api.vndirect.com.vn/v4/stocks?q=type:stock,ifc~floor:HOSE,HNX,UPCOM&size=100&page=21",
      }).then((res) => {
        return axios({
          method: "POST",
          url: "/table",
          params: {
            table: "stocks",
          },
          data: res?.data?.map((x: any) => ({
            code: x.code,
            type: x.type,
            floor: x.floor,
            status: x.status,
            company_name: x.companyName,
            company_name_eng: x.companyNameEng,
            short_name: x.shortName,
            listed_date: x.listedDate,
            delisted_date: x.delistedDate,
            company_id: x.companyId,
          })),
        });
      });
    });

  return {
    data,
    isLoading,
    handleSearchStock,
    handleReloadStocks,
    isLoadingReloadStocks,
    handlePinStock,
    dataStocks,
    isLoadingStocks,
  };
};
