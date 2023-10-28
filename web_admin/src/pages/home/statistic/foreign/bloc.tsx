import { useQuery } from "@tanstack/react-query";
import { axios } from "@/server";

export const useStatisticBloc = () => {
  const { isLoading: isLoadingVersion, data: versionData } = useQuery({
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
            name: ["total_top_vol_value_foreign"],
          },
        },
      });
    },
  });

  const {
    isLoading: isLoadingTotalVolValueForeign,
    data: dataTotalVolValueForeign,
  } = useQuery({
    queryKey: ["total_vol_value_foreign", { version: versionData?.version }],
    enabled: !!versionData?.version,
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
          table: "total_vol_value_foreign",
          filter: {
            version: [versionData?.version],
          },
        },
      });
    },
  });
  const { isLoading: isLoadingTop12Foreign, data: dataTop12Foreign } = useQuery(
    {
      queryKey: ["top_12_foreign", { version: versionData?.version }],
      enabled: !!versionData?.version,
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
            table: "top_12_foreign",
            limit: 50,
            filter: {
              version: [versionData?.version],
            },
          },
        });
      },
    }
  );

  return {
    isLoadingVersion,
    versionData,
    isLoadingTotalVolValueForeign,
    dataTotalVolValueForeign,
    dataTop12Foreign,
    isLoading:
      isLoadingVersion ||
      isLoadingTotalVolValueForeign ||
      isLoadingTop12Foreign,
  };
};
