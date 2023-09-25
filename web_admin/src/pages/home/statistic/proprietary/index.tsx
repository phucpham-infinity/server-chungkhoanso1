import * as CK from "@chakra-ui/react";
import { useBloc } from "./bloc";
import format from "date-fns/format";

import Logo from "@/assets/images/logo.svg";
import ProprietaryTable from "@/components/charts/proprietary";
import { isEmpty } from "lodash";

const Component = () => {
  const { isLoading, data, versionData } = useBloc();

  return (
    <CK.HStack spacing={6} alignItems={"flex-start"} w={"full"} pt={3}>
      <CK.VStack
        border={"1px solid var(--troke, #DADCE0)"}
        boxShadow={"0px 0px 30px 0px rgba(0, 0, 0, 0.04)"}
        bgColor={"white"}
        borderRadius={10}
        flexGrow={1}
        alignItems={"flex-start"}
        p={5}
      >
        <CK.HStack w={"full"} justifyContent={"space-between"}>
          <CK.Image src={Logo} />
          <CK.VStack mb={3} w={"full"} alignItems={"flex-start"}>
            <CK.Text
              textTransform={"uppercase"}
              fontWeight={700}
              fontSize={"24px"}
            >
              Top 10 cp tự doanh mua nhiều nhất
            </CK.Text>
            {versionData?.version && (
              <CK.Text fontWeight={500} fontSize={"16px"}>
                Dữ liệu InvestOne cập nhật lúc 15:30 ngày{" "}
                {format(new Date(+versionData?.version), "HH:mm dd/MM/yyyy")}
              </CK.Text>
            )}
          </CK.VStack>
        </CK.HStack>
        {!isEmpty(data) && (
          <ProprietaryTable
            rowColors={["#E8F6F3", "white"]}
            headerColor={"#16A085"}
            type="buy"
            data={data}
          />
        )}
        <CK.Text fontSize={"16px"} fontWeight={500} mt={3}>
          Nguồn: FiinPro
        </CK.Text>
      </CK.VStack>
      <CK.VStack
        border={"1px solid var(--troke, #DADCE0)"}
        boxShadow={"0px 0px 30px 0px rgba(0, 0, 0, 0.04)"}
        bgColor={"white"}
        borderRadius={10}
        flexGrow={1}
        alignItems={"flex-start"}
        p={5}
      >
        <CK.HStack w={"full"} justifyContent={"space-between"}>
          <CK.Image src={Logo} />
          <CK.VStack mb={3} w={"full"} alignItems={"flex-start"}>
            <CK.Text
              fontWeight={700}
              textTransform={"uppercase"}
              fontSize={"24px"}
            >
              Top 10 cp tự doanh bán nhiều nhất
            </CK.Text>
            {versionData?.version && (
              <CK.Text fontWeight={500} fontSize={"16px"}>
                Dữ liệu InvestOne cập nhật lúc 15:30 ngày{" "}
                {format(new Date(+versionData?.version), "HH:mm dd/MM/yyyy")}
              </CK.Text>
            )}
          </CK.VStack>
        </CK.HStack>
        {!isEmpty(data) && (
          <ProprietaryTable
            rowColors={["#ECECF9", "white"]}
            headerColor={"#3C40C6"}
            type="sell"
            data={data}
          />
        )}
        <CK.Text fontSize={"16px"} fontWeight={500} mt={3}>
          Nguồn: FiinPro
        </CK.Text>
      </CK.VStack>
    </CK.HStack>
  );
};

export default Component;
