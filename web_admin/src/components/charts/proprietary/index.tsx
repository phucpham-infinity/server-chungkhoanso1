import React, { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import * as CK from "@chakra-ui/react";
import numeral from "numeral";

import DataTable from "@/components/data_table";

interface ICapitalization {
  data: any[];
  rowColors?: [string, string];
  headerColor?: string;
  type: "buy" | "sell";
}

const Capitalization = (props: ICapitalization) => {
  const {
    data,
    rowColors = ["#E6F7E6", "white"],
    headerColor = "#00AA00",
    type,
  } = props;
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor("code", {
      cell: (info) => info.getValue(),
      header: "Danh sách mã",
      id: "code",
    }),
    columnHelper.accessor("vol", {
      cell: (info) => numeral(info.getValue()).format("0,00"),
      header: "Khối lượng (CP)",
      id: "vol",
    }),
    columnHelper.accessor("value", {
      cell: (info) => numeral(info.getValue() / 10000000).format("0,0.00"),
      header: "Giá trị (tỷ)",
      id: "value",
    }),
  ];
  const [time, setTime] = useState("1D");

  return (
    <CK.VStack w={"full"}>
      <CK.HStack w={"100%"} justifyContent={"flex-end"}>
        <CK.Select
          w={"160px"}
          variant={"filled"}
          onChange={(data) => {
            setTime(data.target.value);
          }}
        >
          <option value="1D">1 Ngày</option>
          <option value="1W">1 Tuần</option>
          <option value="1M">1 Tháng</option>
          <option value="3M">3 Tháng</option>
          <option value="6M">6 Tháng</option>
          <option value="12M">1 Năm</option>
        </CK.Select>
      </CK.HStack>
      <DataTable
        headerSx={{
          bgColor: headerColor,
        }}
        headerThSx={(row) => {
          return {
            color: "white",
            fontWeight: 700,
            fontSize: "15px",
            textAlign: row?.id === "code" ? "left" : "center",
          };
        }}
        columns={columns}
        data={data
          ?.filter((y: any) => y.time === time)
          ?.filter((z: any) => z.type === type)}
        bodyTrSx={(row) => {
          return {
            bgColor: row.index % 2 ? rowColors[0] : rowColors[1],
            textAlign: "center",
          };
        }}
        bodyTdSx={(cell) => {
          return {
            textAlign: cell?.column?.id === "code" ? "left" : "center",
            fontWeight: 700,
          };
        }}
      />
    </CK.VStack>
  );
};

export default Capitalization;
