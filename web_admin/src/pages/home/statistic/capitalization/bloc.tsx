import { useQuery } from "@tanstack/react-query";
import { axios } from "@/server";

export const useBloc = () => {
  const { isLoading: isLoadingTop10Version, data: versionTop10Data } = useQuery(
    {
      queryKey: ["total_top_vol_value_foreign_version"],
      queryFn: () => {
        return axios<any, any>({
          url: "/table",
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicHVibGljIiwiZW1haWwiOiJlbWFpbCIsInBob25lIjoicGhvbmUiLCJpZCI6InB1YmxpYyIsImlhdCI6MTY5ODUxMzY4OSwiZXhwIjoyMzAzMzEzNjg5fQ.N8c5f44zd_pxWSMXEsfzJioe8Ya2ej_QU1ktzHEZtmk",
          },
          transformResponse: (res) => {
            return JSON.parse(res)?.data?.records?.[0];
          },
          params: {
            table: "chart_data_version",
            filter: {
              name: ["top_10_capitalization"],
            },
          },
        });
      },
    }
  );
  const { isLoading: isLoadingTop10, data: dataTop10 } = useQuery({
    queryKey: ["top_12", { version: versionTop10Data?.version }],
    enabled: !!versionTop10Data?.version,
    queryFn: () => {
      return axios<any, any>({
        url: "/table",
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicHVibGljIiwiZW1haWwiOiJlbWFpbCIsInBob25lIjoicGhvbmUiLCJpZCI6InB1YmxpYyIsImlhdCI6MTY5ODUxMzY4OSwiZXhwIjoyMzAzMzEzNjg5fQ.N8c5f44zd_pxWSMXEsfzJioe8Ya2ej_QU1ktzHEZtmk",
        },
        transformResponse: (res) => {
          return JSON.parse(res)?.data?.records;
        },
        params: {
          table: "top_10_capitalization",
          limit: 20,
          filter: {
            version: [versionTop10Data?.version],
          },
        },
      });
    },
  });

  return {
    dataTop10,
    isLoading: isLoadingTop10 || isLoadingTop10Version,
    versionTop10Data,
  };
};
