import * as CK from "@chakra-ui/react";
import { useBloc } from "./bloc";
import format from "date-fns/format";
import { isEmpty } from "lodash";

import Logo from "@/assets/images/logo.svg";
import InstitutionIndividualChart from "@/components/charts/institution-individual";

const Component = () => {
  const { isLoading, data, versionData } = useBloc();

  return isLoading ? (
    <CK.Center minH={"100px"} w={"full"}>
      <CK.Center minH={"100px"} w={"full"}>
        <CK.Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </CK.Center>
    </CK.Center>
  ) : (
    <CK.VStack spacing={6} w={"full"}>
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
            <CK.VStack w={"full"} alignItems={"flex-start"}>
              <CK.Text
                textTransform={"uppercase"}
                fontWeight={700}
                fontSize={"24px"}
              >
                Thống kê <br /> cá nhân trong nước
              </CK.Text>
            </CK.VStack>
          </CK.HStack>
          {versionData?.version && (
            <CK.Text fontWeight={500} fontSize={"16px"}>
              Dữ liệu InvestOne cập nhật lúc{" "}
              {format(
                new Date(+versionData?.version),
                "HH:mm 'ngày' dd/MM/yyyy"
              )}
            </CK.Text>
          )}
          {!isEmpty(data) && (
            <InstitutionIndividualChart
              chart1Colors={["#00AA00", "#FF593B"]}
              chart2Colors={["#00A0AA", "#FF7F37"]}
              data={data?.filter((x: any) => x.type === "domestic_individual")}
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
            <CK.VStack w={"full"} alignItems={"flex-start"}>
              <CK.Text
                fontWeight={700}
                textTransform={"uppercase"}
                fontSize={"24px"}
              >
                Thống kê <br /> cá nhân nước ngoài
              </CK.Text>
            </CK.VStack>
          </CK.HStack>
          {versionData?.version && (
            <CK.Text fontWeight={500} fontSize={"16px"}>
              Dữ liệu InvestOne cập nhật lúc{" "}
              {format(
                new Date(+versionData?.version),
                "HH:mm 'ngày' dd/MM/yyyy"
              )}
            </CK.Text>
          )}
          {!isEmpty(data) && (
            <InstitutionIndividualChart
              chart1Colors={["#1AEE95", "#FF9979"]}
              chart2Colors={["#0011AA", "#FFDF37"]}
              data={data?.filter((x: any) => x.type === "foreign_individual")}
            />
          )}
          <CK.Text fontSize={"16px"} fontWeight={500} mt={3}>
            Nguồn: FiinPro
          </CK.Text>
        </CK.VStack>
      </CK.HStack>
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
            <CK.VStack w={"full"} alignItems={"flex-start"}>
              <CK.Text
                textTransform={"uppercase"}
                fontWeight={700}
                fontSize={"24px"}
              >
                Thống kê <br /> tổ chức trong nước
              </CK.Text>
            </CK.VStack>
          </CK.HStack>
          {versionData?.version && (
            <CK.Text fontWeight={500} fontSize={"16px"}>
              Dữ liệu InvestOne cập nhật lúc{" "}
              {format(
                new Date(+versionData?.version),
                "HH:mm 'ngày' dd/MM/yyyy"
              )}
            </CK.Text>
          )}
          {!isEmpty(data) && (
            <InstitutionIndividualChart
              chart1Colors={["#3A8476", "#FFB13B"]}
              chart2Colors={["#A2F6FC", "#42A1FA"]}
              data={data?.filter((x: any) => x.type === "domestic_institution")}
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
            <CK.VStack w={"full"} alignItems={"flex-start"}>
              <CK.Text
                fontWeight={700}
                textTransform={"uppercase"}
                fontSize={"24px"}
              >
                Thống kê <br /> tổ chức nước ngoài
              </CK.Text>
            </CK.VStack>
          </CK.HStack>
          {versionData?.version && (
            <CK.Text fontWeight={500} fontSize={"16px"}>
              Dữ liệu InvestOne cập nhật lúc{" "}
              {format(
                new Date(+versionData?.version),
                "HH:mm 'ngày' dd/MM/yyyy"
              )}
            </CK.Text>
          )}
          {!isEmpty(data) && (
            <InstitutionIndividualChart
              chart1Colors={["#74AA00", "#FF823B"]}
              chart2Colors={["#9200AA", "#B6ACA6"]}
              data={data?.filter((x: any) => x.type === "foreign_institution")}
            />
          )}
          <CK.Text fontSize={"16px"} fontWeight={500} mt={3}>
            Nguồn: FiinPro
          </CK.Text>
        </CK.VStack>
      </CK.HStack>
    </CK.VStack>
  );
};

export default Component;
