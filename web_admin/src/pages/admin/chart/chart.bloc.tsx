import * as CK from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { axios } from "@/server";
import { useEffect } from "react";
export interface IPublishForeignTransactions {
  total?: {
    purchasing_volume?: number;
    sale_volume?: number;
    sale_value?: number;
    purchase_value?: number;
  };
  version?: string;
  top?: {
    symbol?: string;
    vol?: number;
    value?: number;
    exchange?: string;
    order?: number;
    type?: string;
  }[];
}

export interface IChartVersionData {
  name: string;
  version: string;
}

export const useChartBloc = () => {
  const toast = CK.useToast();

  const handleAddChartData = useMutation(
    (data: IPublishForeignTransactions) => {
      const process = [
        axios({
          method: "POST",
          url: "/table",
          params: {
            table: "total_vol_value_foreign",
          },
          data: { ...data?.total, version: data?.version },
        }),
        axios({
          method: "POST",
          url: "/table",
          params: {
            table: "top_12_foreign",
          },
          data: data?.top?.map((x) => ({ ...x, version: data?.version })),
        }),
      ];
      return Promise.all(process);
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
        name: "total_top_vol_value_foreign",
        version: data.version,
      });
    });
  };

  const handleAddTop10TableData = useMutation(
    (payload: { version: string; data: any[] }) => {
      const process = [
        axios({
          method: "POST",
          url: "/table",
          params: {
            table: "top_10_capitalization",
          },
          data: payload?.data?.map((x) => ({
            ...x,
            version: payload?.version,
          })),
        }),
      ];
      return Promise.all(process);
    }
  );

  const handlePublishTop10TableData = (payload: {
    version: string;
    data: any[];
  }) => {
    handleAddTop10TableData.mutateAsync(payload).then(() => {
      handleUpdateChartVersion.mutateAsync({
        name: "top_10_capitalization",
        version: payload.version,
      });
    });
  };

  const handleAddIndustryData = useMutation(
    (payload: { version: string; data: any[] }) => {
      const process = [
        axios({
          method: "POST",
          url: "/table",
          params: {
            table: "statistic_industry",
          },
          data: payload?.data?.map((x) => ({
            ...x,
            version: payload?.version,
          })),
        }),
      ];
      return Promise.all(process);
    }
  );

  const handlePublishIndustryData = (payload: {
    version: string;
    data: any[];
  }) => {
    handleAddIndustryData.mutateAsync(payload).then(() => {
      handleUpdateChartVersion.mutateAsync({
        name: "statistic_industry",
        version: payload.version,
      });
    });
  };

  const handleAddProprietaryData = useMutation(
    (payload: { version: string; data: any[] }) => {
      const process = [
        axios({
          method: "POST",
          url: "/table",
          params: {
            table: "statistic_proprietary",
          },
          data: payload?.data?.map((x) => ({
            ...x,
            version: payload?.version,
          })),
        }),
      ];
      return Promise.all(process);
    }
  );

  const handlePublishProprietaryData = (payload: {
    version: string;
    data: any[];
  }) => {
    handleAddProprietaryData.mutateAsync(payload).then(() => {
      handleUpdateChartVersion.mutateAsync({
        name: "statistic_proprietary",
        version: payload.version,
      });
    });
  };

  useEffect(() => {
    if (
      handleAddChartData.isError ||
      handleUpdateChartVersion.isError ||
      handleAddTop10TableData.isError ||
      handleAddIndustryData.isError ||
      handleAddProprietaryData.isError
    ) {
      toast({
        title: "Có lỗi xẩy ra.",
        description:
          JSON.stringify(handleAddChartData.error) ||
          JSON.stringify(handleUpdateChartVersion.error) ||
          JSON.stringify(handleAddTop10TableData.error) ||
          JSON.stringify(handleAddIndustryData.error) ||
          JSON.stringify(handleAddProprietaryData.error),
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [
    handleAddChartData.isError,
    handleUpdateChartVersion.isError,
    handleAddProprietaryData.isError,
    handleAddTop10TableData.isError,
    handleAddIndustryData.isError,
  ]);

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
    handlePublishTop10TableData,
    handlePublishIndustryData,
    handleAddProprietaryData,
    handlePublishProprietaryData,
    isLoading:
      handleAddChartData.isLoading ||
      handleUpdateChartVersion.isLoading ||
      handleAddTop10TableData.isLoading ||
      handleAddIndustryData.isLoading ||
      handleAddProprietaryData.isLoading,
  };
};
