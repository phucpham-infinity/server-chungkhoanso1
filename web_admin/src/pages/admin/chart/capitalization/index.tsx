import { useEffect, useRef, useState } from "react";
import * as CK from "@chakra-ui/react";
import { BiCloudUpload } from "react-icons/bi";
import * as XLSX from "xlsx";

import { MdSave } from "react-icons/md";
import { useChartBloc } from "@/pages/admin/chart/chart.bloc";

import CapitalizationTable from "@/components/charts/capitalization";
import { isEmpty } from "lodash";

const Chart1 = () => {
  const [xlsxData, setXlsxData] = useState(null);
  const [file, setFile] = useState<any>(null);

  const handleReadFile = async (e: any) => {
    const file = e.target.files[0];
    setFile(file);
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet0 = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData0 = XLSX.utils.sheet_to_json(worksheet0, {
      header: 1,
      defval: "",
    });
    setXlsxData(jsonData0.slice(1));
  };

  const { isOpen, onOpen, onClose } = CK.useDisclosure();
  const cancelRef = useRef();

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (xlsxData) {
      const jsonData = xlsxData.map((x: any) => ({
        code: x[0],
        percent: x[1],
        point: x[2],
        type: x[3],
      }));
      setTableData(jsonData);
    }
  }, [xlsxData]);

  const { handlePublishTop10TableData, isLoading } = useChartBloc();

  const handlePublish = () => {
    handlePublishTop10TableData({
      version: String(new Date().getTime()),
      data: tableData,
    });
    onClose();
  };

  return (
    <CK.VStack alignItems={"flex-start"}>
      <CK.HStack w={"full"} justifyContent={"space-between"}>
        <CK.HStack>
          <CK.HStack>
            <CK.Button leftIcon={<BiCloudUpload />}>
              <label htmlFor="upload-file-01"> Tải dữ liệu lên</label>
            </CK.Button>
            <CK.Box w={1} overflow={"hidden"} opacity={0}>
              <input
                id="upload-file-01"
                type="file"
                onInput={(e) => handleReadFile(e)}
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              />
            </CK.Box>
          </CK.HStack>
          <CK.HStack>
            <CK.Text>{file?.name}</CK.Text>
          </CK.HStack>
        </CK.HStack>
        <CK.Button
          isDisabled={isEmpty(tableData)}
          leftIcon={<MdSave />}
          colorScheme="green"
          onClick={onOpen}
          isLoading={isLoading}
        >
          Xuất bản
        </CK.Button>
      </CK.HStack>

      <CK.VStack spacing={10} w={"full"} mt={4}>
        {!isEmpty(tableData) && (
          <CapitalizationTable
            data={tableData.filter((x) => x.type !== "capitalization")}
          />
        )}
        {!isEmpty(tableData) && (
          <CapitalizationTable
            headerColor="#029DE0"
            rowColors={["#E6F5FC", "white"]}
            data={tableData.filter((x) => x.type !== "value")}
          />
        )}
      </CK.VStack>

      <CK.AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <CK.AlertDialogOverlay>
          <CK.AlertDialogContent>
            <CK.AlertDialogHeader fontSize="lg" fontWeight="bold">
              Đăng tải dữ liệu
            </CK.AlertDialogHeader>

            <CK.AlertDialogBody>
              Bạn có chắc chắn muốn đăng tải dữ liệu này?
            </CK.AlertDialogBody>

            <CK.AlertDialogFooter>
              <CK.Button ref={cancelRef} onClick={onClose}>
                Huỷ
              </CK.Button>
              <CK.Button colorScheme="green" onClick={handlePublish} ml={3}>
                Đồng ý
              </CK.Button>
            </CK.AlertDialogFooter>
          </CK.AlertDialogContent>
        </CK.AlertDialogOverlay>
      </CK.AlertDialog>
    </CK.VStack>
  );
};

export default Chart1;
