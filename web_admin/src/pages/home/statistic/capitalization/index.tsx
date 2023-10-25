import * as CK from "@chakra-ui/react";
import { useBloc } from "./bloc";
import format from "date-fns/format";

import Logo from "@/assets/images/logo.svg";
import CapitalizationTable from "@/components/charts/capitalization";
import { isEmpty } from "lodash";

const Component = () => {
  const { isLoading, dataTop10, versionTop10Data } = useBloc();

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
          <CK.VStack mb={3} w={"full"} alignItems={"flex-start"}>
            <CK.Text fontWeight={700} fontSize={"24px"}>
              Top 10 cp vốn hóa lớn nhất
            </CK.Text>
            {versionTop10Data?.version && (
              <CK.Text fontWeight={500} fontSize={"16px"}>
                Dữ liệu InvestOne cập nhật lúc ngày{" "}
                {format(
                  new Date(+versionTop10Data?.version),
                  "HH:mm dd/MM/yyyy"
                )}
              </CK.Text>
            )}
          </CK.VStack>
          <CK.Image src={Logo} />
        </CK.HStack>
        {!isEmpty(dataTop10) && (
          <CapitalizationTable
            data={dataTop10.filter((x) => x.type !== "capitalization")}
          />
        )}
        <CK.Text fontSize={"16px"} fontWeight={500} mt={3}>
          Nguồn: InvestOne
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
          <CK.VStack mb={3} w={"full"} alignItems={"flex-start"}>
            <CK.Text fontWeight={700} fontSize={"24px"}>
              Top 10 cp GTGD lớn nhất
            </CK.Text>
            {versionTop10Data?.version && (
              <CK.Text fontWeight={500} fontSize={"16px"}>
                Dữ liệu InvestOne cập nhật lúc ngày{" "}
                {format(
                  new Date(+versionTop10Data?.version),
                  "HH:mm dd/MM/yyyy"
                )}
              </CK.Text>
            )}
          </CK.VStack>
          <CK.Image src={Logo} />
        </CK.HStack>
        {!isEmpty(dataTop10) && (
          <CapitalizationTable
            headerColor="#029DE0"
            rowColors={["#E6F5FC", "white"]}
            data={dataTop10.filter((x) => x.type !== "value")}
          />
        )}
        <CK.Text fontSize={"16px"} fontWeight={500} mt={3}>
          Nguồn: InvestOne
        </CK.Text>
      </CK.VStack>
    </CK.HStack>
  );
};

export default Component;
