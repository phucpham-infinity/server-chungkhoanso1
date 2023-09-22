import * as CK from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { axios } from "@/server";
import { useEffect } from "react";
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
        conflict: "name",
      },
      data: data,
    });
  });

  const handlePublishChartData = (data: IPublishForeignTransactions) => {
    handleAddChartData.mutateAsync(data).then(() => {
      handleUpdateChartVersion.mutateAsync({
        name: "total_vol_value_foreign",
        version: data.version,
      });
    });
  };

  useEffect(() => {
    if (handleAddChartData.isError || handleUpdateChartVersion.isError) {
      toast({
        title: "Có lỗi xẩy ra.",
        description:
          String(handleAddChartData.error) ||
          String(handleUpdateChartVersion.error),
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [handleAddChartData.isError, handleUpdateChartVersion.isError]);

  useEffect(() => {
    if (handleUpdateChartVersion.isSuccess) {
      toast({
        title: "Thành công.",
        description: "Cập nhật dữ liệu thành công",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [handleUpdateChartVersion.isSuccess]);

  return {
    handlePublishChartData,
    handleAddChartData,
    isLoading:
      handleAddChartData.isLoading || handleUpdateChartVersion.isLoading,
  };
};
