import { useEffect, useRef, useState } from "react";
import * as CK from "@chakra-ui/react";
import { BiCloudUpload } from "react-icons/bi";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { convertToSnakeCase } from "@/helper";

import { MdSave, MdRemoveRedEye } from "react-icons/md";
import { useChartBloc } from "@/pages/admin/chart/chart.bloc";
import IndustryChart from "@/components/charts/industry";
import { isEmpty } from "lodash";

const Chart1 = () => {
  const [summary, setSummary] = useState(null);
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
    setSummary(jsonData0);
  };

  const { isOpen, onOpen, onClose } = CK.useDisclosure();
  const cancelRef = useRef();

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (summary) {
      setChartData(
        summary
          .filter((y) => y[0])
          .map((x: any) => ({
            code: convertToSnakeCase(x[0]),
            label: x[0],
            value: x[1],
            color: x[2],
          }))
      );
    }
  }, [summary]);

  const { handlePublishIndustryData, isLoading } = useChartBloc();

  const handlePublish = () => {
    handlePublishIndustryData({
      version: String(new Date().getTime()),
      data: chartData,
    });
    onClose();
  };

  const navigate = useNavigate();

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
        <CK.HStack>
          <CK.Button
            isDisabled={isEmpty(chartData)}
            leftIcon={<MdSave />}
            colorScheme="green"
            onClick={onOpen}
            isLoading={isLoading}
          >
            Xuất bản
          </CK.Button>
          <CK.Button
            leftIcon={<MdRemoveRedEye />}
            colorScheme="blue"
            onClick={() => navigate("/statistic/industry")}
          >
            Xem
          </CK.Button>
        </CK.HStack>
      </CK.HStack>

      <CK.HStack mt={8} w={"full"}>
        {!isEmpty(chartData) && <IndustryChart data={chartData} />}
      </CK.HStack>

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
