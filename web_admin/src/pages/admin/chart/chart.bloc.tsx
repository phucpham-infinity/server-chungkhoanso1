import * as CK from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { axios } from "@/server";
export interface IPublishForeignTransactions {
  purchasing_volume: number;
  sale_volume: number;
  sale_value: number;
  purchase_value: number;
  version: string;
}

export interface IChartVersionData {
  name: string;
  version: string;
}

export const useChartBloc = () => {
  const toast = CK.useToast();

  const handleAddChartData = useMutation(
    (data: IPublishForeignTransactions) => {
      return axios({
        method: "POST",
        url: "/table",
        params: {
          table: "total_vol_value_foreign",
        },
        data: data,
      });
    }
  );

  const handleUpdateChartVersion = useMutation((data: IChartVersionData) => {
    return axios({
      method: "POST",
      url: "/table",
      params: {
        table: "chart_data_version",
      },
      data: data,
    });
  });

  const handlePublishChartData = async (data: IPublishForeignTransactions) => {
    try {
      await handleAddChartData.mutateAsync(data);
      handleUpdateChartVersion.mutateAsync({
        name: "total_vol_value_foreign",
        version: data.version,
      });
    } catch (error) {}
  };

  return {
    handlePublishChartData,
    handleAddChartData,
    isLoading:
      handleAddChartData.isLoading || handleUpdateChartVersion.isLoading,
  };
};
