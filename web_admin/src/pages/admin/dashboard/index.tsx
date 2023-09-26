import { debounce } from "lodash";
import { useBloc } from "./bloc";
import { useState } from "react";
import * as CK from "@chakra-ui/react";
import { MdRefresh, MdStar, MdOutlineDelete } from "react-icons/md";
import { createColumnHelper } from "@tanstack/react-table";
import AsyncSelect from "react-select/async";

import DataTable from "@/components/data_table";

const Dashboard = () => {
  const {
    handleSearchStock,
    handleReloadStocks,
    handlePinStock,
    dataStocks,
    isLoadingStocks,
  } = useBloc();

  const loadOptions = debounce((inputValue: string, callback: any) => {
    handleSearchStock({ textSearch: inputValue }).then((res: any) => {
      callback(res?.data?.records);
    });
  }, 300);

  const [selectedCode, setSelectedCode] = useState({});

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor("code", {
      cell: (info) => info.getValue(),
      header: "Danh sách mã",
      id: "code",
    }),
    columnHelper.accessor("company_name", {
      cell: (info) => info.getValue(),
      header: "Tên công ty",
      id: "company_name",
    }),
    columnHelper.accessor("action", {
      cell: (info) => {
        return (
          <CK.HStack>
            <CK.Button
              onClick={() => {
                handlePinStock({
                  ...info?.cell?.row?.original,
                  pinned: 0,
                });
              }}
              leftIcon={<MdOutlineDelete />}
            >
              Xoá
            </CK.Button>
          </CK.HStack>
        );
      },
      header: "",
      id: "action",
    }),
  ];

  return (
    <CK.Box px={6} pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <CK.HStack justifyContent={"space-between"} w={"full"}>
        <CK.Text fontWeight={700} fontSize={"24px"}>
          Danh sách mã cổ phiếu nổi bật
        </CK.Text>
        <CK.HStack>
          <CK.Button
            isDisabled
            onClick={() => handleReloadStocks()}
            leftIcon={<MdRefresh />}
          >
            Cập nhật
          </CK.Button>
        </CK.HStack>
      </CK.HStack>
      <CK.HStack alignItems={"flex-start"} w={"full"}>
        <AsyncSelect
          placeholder="Thêm mã cổ phiếu nổi bật"
          onChange={(e: any) => setSelectedCode(e)}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              width: "400px",
            }),
          }}
          getOptionLabel={(ops) => ops?.code}
          getOptionValue={(ops) => ops?.code}
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions
        />
        <CK.IconButton
          colorScheme="blue"
          aria-label="Pin database"
          borderRadius={4}
          onClick={() => {
            if (selectedCode) {
              handlePinStock({
                ...selectedCode,
                pinned: 1,
              });
            }
          }}
          icon={<MdStar />}
        />
      </CK.HStack>
      <CK.HStack py={5}>
        {isLoadingStocks ? (
          <CK.Center w={"full"}>
            <CK.Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </CK.Center>
        ) : (
          <DataTable
            headerSx={{
              bgColor: "#00AA00",
            }}
            headerThSx={(row) => {
              return {
                color: "white",
                fontWeight: 700,
                fontSize: "15px",
              };
            }}
            columns={columns}
            data={dataStocks}
            bodyTdSx={(cell) => {
              return {
                fontWeight: 700,
              };
            }}
          />
        )}
      </CK.HStack>
    </CK.Box>
  );
};

export default Dashboard;
