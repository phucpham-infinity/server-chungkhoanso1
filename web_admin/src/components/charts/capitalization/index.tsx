import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import * as CK from "@chakra-ui/react";

import DataTable from "@/components/data_table";

interface ICapitalization {
  data: any[];
  rowColors?: [string, string];
  headerColor?: string;
}

const Capitalization = (props: ICapitalization) => {
  const {
    data,
    rowColors = ["#E6F7E6", "white"],
    headerColor = "#00AA00",
  } = props;
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor("code", {
      cell: (info) => info.getValue(),
      header: "Danh sách mã",
      id: "code",
    }),
    columnHelper.accessor("percent", {
      cell: (info) => info.getValue() + "%",
      header: "Đóng góp theo %",
      id: "percent",
    }),
    columnHelper.accessor("point", {
      cell: (info) => info.getValue(),
      header: "Đóng góp điểm",
      id: "point",
    }),
  ];
  return (
    <CK.HStack w={"full"} bgColor={"white"}>
      <DataTable
        headerSx={{
          bgColor: headerColor,
        }}
        headerThSx={(row) => {
          console.log("row", row);
          return {
            color: "white",
            fontWeight: 700,
            fontSize: "15px",
            textAlign: row?.id === "code" ? "left" : "center",
          };
        }}
        columns={columns}
        data={data}
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
    </CK.HStack>
  );
};

export default Capitalization;
