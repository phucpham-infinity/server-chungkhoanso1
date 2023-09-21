import { pb } from "@/server";
import { useState } from "react";
import { isEmpty } from "lodash";
import * as CK from "@chakra-ui/react";

export interface IPublishForeignTransactions {
  purchasing_volume: number;
  sale_volume: number;
  sale_value: number;
  purchase_value: number;
  version: number;
}

export const useChartBloc = () => {
  const [isLoadingPublish, setIsLoadingPublish] = useState(false);
  const [errorPublish, setErrorPublish] = useState(null);
  const [dataPublish, setDataPublish] = useState(null);

  const toast = CK.useToast();

  const handlePublishForeignTransactions = async (
    data: IPublishForeignTransactions
  ) => {
    setIsLoadingPublish(true);
    setDataPublish(null);
    setErrorPublish(null);
    try {
      const record = await pb
        .collection("total_vol_value_foreign")
        .create(data);
      setDataPublish(record);
      const data2 = await pb
        .collection("chart_data_version")
        .getList(1, 100, { query: { name: "total_vol_value_foreign" } , });
      console.log("data2", data2);
    } catch (error) {
      setErrorPublish(error);
      toast({
        title: "Xuất bản thất bại",
        description: error?.message || "Có lỗi xẩy ra!",
        status: "error",
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoadingPublish(false);
    }
  };
  return {
    handlePublishForeignTransactions,
    isLoadingPublish,
    errorPublish,
    isErrorPublish: isEmpty(errorPublish),
    dataPublish,
  };
};
