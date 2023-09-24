import * as CK from "@chakra-ui/react";
import { useBloc } from "./bloc";
import format from "date-fns/format";

import Logo from "@/assets/images/logo.svg";
import CapitalizationTable from "@/components/charts/capitalization";
import { isEmpty } from "lodash";

import IndustryChart from "@/components/charts/industry";

const Component = () => {
  const { isLoading, data, versionData } = useBloc();

  return (
    <CK.HStack
      position={"relative"}
      spacing={6}
      alignItems={"flex-start"}
      w={"full"}
      pt={3}
    >
      <CK.VStack
        border={"1px solid var(--troke, #DADCE0)"}
        boxShadow={"0px 0px 30px 0px rgba(0, 0, 0, 0.04)"}
        bgColor={"white"}
        borderRadius={10}
        flexGrow={1}
        alignItems={"flex-start"}
        p={5}
      >
        <CK.Text fontSize={"24px"} fontWeight={700}>
          THỐNG KÊ NGÀNH NGHỀ
        </CK.Text>
        {versionData?.version && (
          <CK.Text fontWeight={500} fontSize={"16px"}>
            Dữ liệu InvestOne cập nhật lúc 15:30 ngày{" "}
            {format(new Date(+versionData?.version), "HH:mm dd/MM/yyyy")}
          </CK.Text>
        )}
        <CK.Box mt={16}>
          {isLoading ? "loading" : <IndustryChart data={data} />}
        </CK.Box>

        <CK.Text fontSize={"16px"} fontWeight={500} mt={3}>
          Nguồn: InvestOne
        </CK.Text>
      </CK.VStack>
      <CK.Image position={"absolute"} bottom={8} right={8} src={Logo} />
    </CK.HStack>
  );
};

export default Component;
