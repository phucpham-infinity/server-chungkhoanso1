import * as CK from "@chakra-ui/react";
import format from "date-fns/format";
import { isEmpty } from "lodash";

import QRCode from "@/assets/images/qr-code.png";
import AppStore from "@/assets/images/app-store.png";
import Line from "@/assets/images/line.png";
import Logo from "@/assets/images/logo.svg";

import { useStatisticBloc } from "@/pages/home/statistic/statistic.bloc";

import ForeignTransactions from "@/components/charts/foreign-transactions-01";
import ForeignTop12 from "@/components/charts/foreign-top-12";

const Foreign = () => {
  const {
    isLoadingVersion,
    versionData,
    dataTotalVolValueForeign,
    isLoading,
    dataTop12Foreign,
  } = useStatisticBloc();

  return (
    <CK.VStack alignItems={"flex-start"} w={"full"}>
      <CK.VStack
        border={"1px solid var(--troke, #DADCE0)"}
        p={5}
        w={"full"}
        bgColor={"white"}
        borderRadius={10}
        alignItems={"flex-start"}
        mt={2}
      >
        <CK.HStack spacing={10} alignItems={"flex-start"}>
          <CK.VStack spacing={0} alignItems={"flex-start"}>
            <CK.Text fontSize={"24px"} fontWeight={700}>
              Thống kê giao dịch nước ngoài
            </CK.Text>
            <CK.Skeleton isLoaded={!isLoadingVersion}>
              {versionData?.version && (
                <CK.Text fontSize={"16px"} fontWeight={500}>
                  Dữ liệu InvestOne cập nhật lúc{" "}
                  {format(new Date(+versionData?.version), "HH:mm dd/MM/yyyy")}
                </CK.Text>
              )}
            </CK.Skeleton>
          </CK.VStack>
          <CK.Image src={Logo} />
        </CK.HStack>
        {isLoading ? (
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
          <CK.HStack alignItems={"flex-start"} w={"full"}>
            <ForeignTransactions
              dataValue={[
                {
                  value: dataTotalVolValueForeign?.purchase_value,
                  fill: "#00AA00",
                },
                {
                  value: dataTotalVolValueForeign?.sale_value,
                  fill: "#FF593B",
                },
              ]}
              dataVol={[
                {
                  value: dataTotalVolValueForeign?.purchasing_volume,
                  fill: "#74AA00",
                },
                {
                  value: dataTotalVolValueForeign?.sale_volume,
                  fill: "#FF823B",
                },
              ]}
            />
            <CK.VStack px={4} spacing={10} w={"full"}>
              {!isEmpty(dataTop12Foreign) && (
                <ForeignTop12
                  name="TOP 12 CP NĐT NN MUA NHIỀU NHẤT SÀN"
                  type="buy"
                  data={dataTop12Foreign}
                  color="#18712C"
                />
              )}
              {!isEmpty(dataTop12Foreign) && (
                <ForeignTop12
                  name="TOP 12 CP NĐT NN BÁN NHIỀU NHẤT SÀN"
                  type="sell"
                  data={dataTop12Foreign}
                  color="#D44B20"
                />
              )}
            </CK.VStack>
          </CK.HStack>
        )}
      </CK.VStack>
    </CK.VStack>
  );
};

export default Foreign;
