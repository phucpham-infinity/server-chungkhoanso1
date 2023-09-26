import * as CK from "@chakra-ui/react";
import { format } from "date-fns";
import Banner01 from "@/assets/images/banner-01.png";

import IndexPrices from "@/components/index_prices";
import PinnedStocks from "@/components/pinned-stocks";
import { useLoaderData } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";

import { useBloc } from "./bloc";
import DataTable from "@/components/data_table";
import { isEmpty } from "lodash";

const InvestmentList = () => {
  const { user } = useLoaderData() as any;
  const { dataStocks } = useBloc({ id: user.id });

  console.log("dataStocks", dataStocks);

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor("code", {
      cell: (info) => {
        if (!info.getValue()) return "Chọn mã";
        info.getValue();
      },
      header: "Danh sách mã",
      id: "code",
    }),
    columnHelper.accessor("purchase_date", {
      cell: (info) => {
        if (!info.getValue()) return "Chọn ngày";
        return format(new Date(info.getValue()), "dd/MM/yyyy");
      },
      header: "Ngày mua",
      id: "purchase_date",
    }),
    columnHelper.accessor("purchase_price", {
      cell: (info) => {
        if (!info.getValue()) return "Chọn giá";
        info.getValue();
      },
      header: "Giá mua",
      id: "purchase_price",
    }),
    columnHelper.accessor("purchase_price", {
      cell: (info) => info.getValue(),
      header: "Giá hiện tại",
      id: "purchase_price_2",
    }),
    columnHelper.accessor("vol", {
      cell: (info) => {
        if (!info.getValue()) return "Nhập khối lượng";
        info.getValue();
      },
      header: "TỔNG KL",
      id: "vol",
    }),
  ];

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
            (nguồn vndirect)
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
        <CK.Text fontSize={"24px"} fontWeight={700}>
          Quản lý danh mục của bạn
        </CK.Text>
        {!isEmpty(dataStocks) && (
          <DataTable
            headerSx={{
              bgColor: "#00AA00",
            }}
            headerThSx={(row) => {
              return {
                color: "white",
                fontWeight: 700,
                fontSize: "15px",
                textTransform: "uppercase",
                textAlign: row?.id === "code" ? "left" : "center",
              };
            }}
            columns={columns}
            data={[
              ...dataStocks,
              {
                id: 0,
              },
            ]}
            bodyTdSx={(cell) => {
              return {
                fontWeight: 700,
                textAlign: cell?.column?.id === "code" ? "left" : "center",
              };
            }}
          />
        )}
      </CK.VStack>
    </CK.VStack>
  );
};

export default InvestmentList;
