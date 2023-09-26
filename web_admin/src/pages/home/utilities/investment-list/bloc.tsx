import { axios } from "@/server";
import { useQuery } from "@tanstack/react-query";

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
          filter: {
            user_id: [id],
          },
        },
      });
    },
  });
  return {
    dataStocks,
    isLoadingStocks,
    refetchStocks,
  };
};
