import { useEffect, useRef, useState } from "react";
import * as CK from "@chakra-ui/react";
import { BiCloudUpload } from "react-icons/bi";
import * as XLSX from "xlsx";

import Chart01 from "@/components/charts/foreign-transactions-01";
import { MdRemoveRedEye, MdSave } from "react-icons/md";
import { useChartBloc } from "@/pages/admin/chart/chart.bloc";

import ForeignTop12 from "@/components/charts/foreign-top-12";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

const Chart1 = () => {
  // const summary =
  const [summary, setSummary] = useState(null);
  const [detail, setDetail] = useState(null);
  const [file, setFile] = useState<any>(null);

  const [isUploading, setIsUploading] = useState(false);

  const handleReadFile = async (e: any) => {
    setIsUploading(true);
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
    const worksheet1 = workbook.Sheets[workbook.SheetNames[1]];
    const jsonData1 = XLSX.utils.sheet_to_json(worksheet1, {
      header: 1,
      defval: "",
    });
    setDetail(jsonData1);
  };

  const [dataVol, setDataVol] = useState(null);
  const [dataValue, setDataValue] = useState(null);
  const [top12Data, setTop12Data] = useState(null);

  useEffect(() => {
    if (detail) {
      const data = [];
      detail
        .filter((y) => y[0])
        .forEach((x: any) => {
          if (x[0]) {
            data.push({
              symbol: x[0],
              vol: x[1],
              value: x[2],
              exchange: x[3],
              order: x[4],
              type: x[5],
            });
          }
        });
      setTop12Data(data);
    }
  }, [detail]);

  const { isOpen, onOpen, onClose } = CK.useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    if (summary) {
      setDataVol([
        {
          name: "Tổng KL NN Mua",
          value: summary[0][1],
          percent: summary[0][1] / (summary[0][1] + summary[1][1]),
          fill: "#00AA00",
        },
        {
          name: "Tổng KL NN Bán",
          value: summary[1][1],
          percent: summary[1][1] / (summary[0][1] + summary[1][1]),
          fill: "#FF593B",
        },
      ]);
      setDataValue([
        {
          name: "Tổng KL NN Mua",
          value: summary[2][1],
          percent: summary[2][1] / (summary[2][1] + summary[3][1]),
          fill: "#00AA00",
        },
        {
          name: "Tổng KL NN Bán",
          value: summary[3][1],
          percent: summary[3][1] / (summary[2][1] + summary[3][1]),
          fill: "#FF593B",
        },
      ]);
    }
  }, [summary]);

  const { handlePublishChartData, isLoading } = useChartBloc();

  const handlePublish = () => {
    onClose();
    const version = new Date().getTime();
    handlePublishChartData({
      total: {
        purchasing_volume: summary[0][1],
        sale_volume: summary[1][1],
        purchase_value: summary[2][1],
        sale_value: summary[3][1],
      },
      version: String(version),
      top: top12Data.slice(1),
    });
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
            isDisabled={!dataValue}
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
            onClick={() => navigate("/statistic/foreign")}
          >
            Xem
          </CK.Button>
        </CK.HStack>
      </CK.HStack>
      {dataValue && dataVol && (
        <Chart01 dataValue={dataValue} dataVol={dataVol} />
      )}

      {!isEmpty(top12Data) && (
        <ForeignTop12
          name="TOP 12 CP NĐT NN MUA NHIỀU NHẤT SÀN"
          type="buy"
          data={top12Data.slice(1)}
          color="#18712C"
        />
      )}
      {!isEmpty(top12Data) && (
        <ForeignTop12
          name="TOP 12 CP NĐT NN BÁN NHIỀU NHẤT SÀN"
          type="sell"
          data={top12Data.slice(1)}
          color="#D44B20"
        />
      )}

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
