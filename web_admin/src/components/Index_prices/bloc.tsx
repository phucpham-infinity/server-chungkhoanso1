import { useQuery } from "@tanstack/react-query";
import { axios } from "@/server";

export const useBloc = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["vndirect_change_prices"],

    queryFn: () => {
      return axios<any, any>({
        baseURL:
          "https://finfo-api.vndirect.com.vn/v4/change_prices?q=code:VNINDEX,HNX,UPCOM,VN30,HNX30~period:1D",
        method: "GET",
        transformResponse: (res) => JSON.parse(res)?.data,
      });
    },
  });

  return { data, isLoading };
};
