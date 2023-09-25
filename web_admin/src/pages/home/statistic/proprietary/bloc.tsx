import { useQuery } from "@tanstack/react-query";
import { axios } from "@/server";

export const useBloc = () => {
  const { isLoading: isLoadingVersion, data: versionData } = useQuery({
    queryKey: ["total_top_vol_value_foreign_version"],
    queryFn: () => {
      return axios<any, any>({
        url: "/table",
        method: "GET",
        transformResponse: (res) => {
          return JSON.parse(res)?.data?.records?.[0];
        },
        params: {
          table: "chart_data_version",
          filter: {
            name: ["statistic_proprietary"],
          },
        },
      });
    },
  });
  const { isLoading: isLoadingData, data: data } = useQuery({
    queryKey: ["top_12", { version: versionData?.version }],
    enabled: !!versionData?.version,
    queryFn: () => {
      return axios<any, any>({
        url: "/table",
        method: "GET",
        transformResponse: (res) => {
          return JSON.parse(res)?.data?.records;
        },
        params: {
          table: "statistic_proprietary",
          limit: 150,
          filter: {
            version: [versionData?.version],
          },
        },
      });
    },
  });

  return {
    data,
    isLoading: isLoadingData || isLoadingVersion,
    versionData,
  };
};
