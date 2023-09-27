import * as CK from "@chakra-ui/react";
import { format } from "date-fns";
import Banner01 from "@/assets/images/banner-01.png";
import { useMemo, useRef } from "react";
import { isEmpty } from "lodash";
import { useLoaderData } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";

import { useBloc } from "./bloc";

import IndexPrices from "@/components/index_prices";
import PinnedStocks from "@/components/pinned-stocks";
import { MdOutlineDelete, MdAdd, MdInfo } from "react-icons/md";
import DataTable from "@/components/data_table";
import AutocompleteStock from "@/components/autocomplete-stock";
import DatePicker from "@/components/date-picker";
import numeral from "numeral";

const InvestmentList = () => {
  const { user } = useLoaderData() as any;
  const {
    dataStocks,
    handleAddNewStock,
    isLoadingAddNewStock,
    refetchStocks,
    handleRemoveStock,
    dataPinnedStocks,
  } = useBloc({
    id: user.id,
  });

  const newStock = useRef<any>({});
  const toast = CK.useToast();

  const handleAddNew = () => {
    if (
      !newStock.current.code ||
      !newStock.current.purchase_date ||
      !newStock.current.purchase_price ||
      !newStock.current.vol
    ) {
      toast({
        title: `Vui lòng nhập đủ thông tin`,
        position: "top-right",
        status: "error",
        isClosable: true,
      });
    } else {
      handleAddNewStock({
        ...newStock.current,
        user_id: user.id,
      }).then((res) => {
        refetchStocks();
        newStock.current = {};
        toast({
          title: `Thêm dữ liệu thành công.`,
          position: "top-right",
          status: "success",
          isClosable: true,
        });
      });
    }
  };

  const handleRemoveStockData = (id: number) => {
    handleRemoveStock(id).then(() => {
      refetchStocks();
      toast({
        title: `Xoá dữ liệu thành công.`,
        position: "top-right",
        status: "success",
        isClosable: true,
      });
    });
  };

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor("code", {
      cell: (info) => {
        if (!info.getValue())
          return (
            <AutocompleteStock
              placeholder="Mã cổ phiếu"
              style={{ width: "250px" }}
              onChange={(data) => {
                newStock.current = { ...newStock.current, code: data.code };
              }}
            />
          );
        else
          return (
            <CK.HStack>
              <CK.Badge>{info.getValue()}</CK.Badge>
              <CK.Text>
                {dataPinnedStocks?.[info.getValue().toUpperCase()]?.name}
              </CK.Text>
            </CK.HStack>
          );
      },
      header: "Danh sách mã",
      id: "code",
    }),
    columnHelper.accessor("purchase_date", {
      cell: (info) => {
        if (!info.getValue())
          return (
            <DatePicker
              onSelected={(date) => {
                newStock.current = {
                  ...newStock.current,
                  purchase_date: String(date.getTime()),
                };
              }}
            />
          );
        return format(new Date(+info.getValue()), "dd/MM/yyyy");
      },
      header: "Ngày mua",
      id: "purchase_date",
    }),
    columnHelper.accessor("purchase_price", {
      cell: (info) => {
        if (!info.getValue())
          return (
            <CK.NumberInput>
              <CK.NumberInputField
                onChange={(e) => {
                  newStock.current = {
                    ...newStock.current,
                    purchase_price: e.target.value,
                  };
                }}
              />
            </CK.NumberInput>
          );
        return info.getValue();
      },
      header: "Giá mua",
      id: "purchase_price",
    }),
    columnHelper.accessor("purchase_price", {
      cell: (info) => (
        <CK.Text>
          {dataPinnedStocks?.[info?.row?.original?.code]?.price}
        </CK.Text>
      ),
      header: "Giá hiện tại",
      id: "purchase_price_2",
    }),
    columnHelper.accessor("vol", {
      cell: (info) => {
        if (!info.getValue())
          return (
            <CK.NumberInput>
              <CK.NumberInputField
                onChange={(e) => {
                  newStock.current = {
                    ...newStock.current,
                    vol: e.target.value,
                  };
                }}
              />
            </CK.NumberInput>
          );
        return info.getValue();
      },
      header: "TỔNG KL",
      id: "vol",
    }),
    columnHelper.accessor("profit", {
      cell: (info) => {
        const { purchase_price, code, vol } = info?.row?.original;
        const current_price = dataPinnedStocks?.[code]?.price;
        const total = (current_price - purchase_price) * vol;

        return (
          <CK.Text color={String(total).includes("-") ? "red" : "green"}>
            {numeral(total).format("0,0.0")}
          </CK.Text>
        );
      },
      header: "Lợi nhuận",
      id: "profit",
    }),
    columnHelper.accessor("percent", {
      cell: (info) => {
        const { purchase_price, code } = info?.row?.original;
        const current_price = dataPinnedStocks?.[code]?.price;
        const percent = (current_price - purchase_price) / purchase_price;
        return (
          <CK.Text
            w={"70px"}
            color={String(percent).includes("-") ? "red" : "green"}
          >
            {numeral(percent).format("0.00")}%
          </CK.Text>
        );
      },
      header: "%",
      id: "percent",
    }),
    columnHelper.accessor("action", {
      cell: (info) => {
        if (info?.row?.original?.id == "0") {
          return (
            <CK.IconButton
              isLoading={isLoadingAddNewStock}
              onClick={handleAddNew}
              borderRadius={6}
              aria-label="mdAdd"
              icon={<MdAdd />}
            />
          );
        }
        return (
          <CK.IconButton
            onClick={() => handleRemoveStockData(info?.row?.original?.id)}
            borderRadius={6}
            aria-label="MdOutlineDelete"
            icon={<MdOutlineDelete />}
          />
        );
      },
      header: "",
      id: "action",
    }),
  ];
  const DataTableMemo = useMemo(
    () => (
      <DataTable
        headerSx={{
          bgColor: "transparent",
        }}
        headerThSx={(row) => {
          return {
            color: "black",
            bgColor: "transparent",
            fontWeight: 700,
            fontSize: "15px",
            textTransform: "uppercase",
            textAlign: row?.id === "code" ? "left" : "center",
          };
        }}
        columns={columns}
        data={dataStocks}
        bodyTdSx={(cell) => {
          return {
            fontWeight: 700,
            textAlign: cell?.column?.id === "code" ? "left" : "center",
          };
        }}
      />
    ),
    [dataStocks, dataPinnedStocks]
  );

  return (
    <CK.VStack p={4} spacing={0} alignItems={"flex-start"}>
      <CK.VStack
        w={"full"}
        px={6}
        py={9}
        bgColor={"black"}
        alignItems={"flex-start"}
        spacing={1}
        position={"relative"}
        overflow={"hidden"}
      >
        <CK.HStack
          color={"white"}
          w={"full"}
          justifyContent={"space-between"}
          spacing={10}
        >
          <CK.Text
            textTransform={"capitalize"}
            fontSize={"24px"}
            fontWeight={700}
          >
            Thị trường ngày {format(new Date(), "dd/MM/yyyy")}
          </CK.Text>
          <CK.Text fontSize={"16px"} fontWeight={400}>
            Dữ liệu cập nhật lúc: {format(new Date(), "HH:mm dd/MM/yyyy")}{" "}
            (Nguồn: vndirect)
          </CK.Text>
        </CK.HStack>
        <CK.Box mt={5} w={"full"}>
          <IndexPrices />
        </CK.Box>
        <CK.HStack py={9}>
          <CK.Text
            textTransform={"capitalize"}
            color={"white"}
            fontSize={"24px"}
            fontWeight={700}
          >
            Cổ phiếu nổi bật hôm nay
          </CK.Text>
        </CK.HStack>
        <CK.HStack w={"full"}>
          <PinnedStocks />
        </CK.HStack>
      </CK.VStack>
      <CK.HStack w={"full"}>
        <CK.Image w={"full"} src={Banner01} />
      </CK.HStack>

      <CK.VStack px={20} py={10} alignItems={"flex-start"} w={"full"}>
        <CK.HStack mb={3} justifyContent={"space-between"} w={"full"}>
          <CK.Text fontSize={"24px"} fontWeight={700}>
            Quản lý danh mục của bạn
          </CK.Text>
          <CK.Button leftIcon={<MdInfo />} color={"#15B0F8"}>
            Hướng dẫn
          </CK.Button>
        </CK.HStack>

        <CK.Box bgColor={"white"}>
          {!isEmpty(dataStocks) && DataTableMemo}
        </CK.Box>
        <CK.HStack justifyContent={"flex-end"} w={"full"}>
          <CK.Text>Nguồn: vndirect</CK.Text>
        </CK.HStack>
      </CK.VStack>
    </CK.VStack>
  );
};

export default InvestmentList;
