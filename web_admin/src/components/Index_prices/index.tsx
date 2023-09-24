import React from "react";
import * as CK from "@chakra-ui/react";
import { useBloc } from "./bloc";
import numeral from "numeral";

import HLine from "@/assets/images/h-line.svg";

const IndexPrices = () => {
  const { data, isLoading } = useBloc();
  return isLoading ? (
    <CK.Spinner />
  ) : (
    <CK.HStack w={"full"} justifyContent={"space-between"}>
      {data.map((x: any) => (
        <CK.HStack
          alignItems={"flex-start"}
          justifyContent={"stretch"}
          bgColor={"white"}
          borderRadius={10}
          overflow={"hidden"}
          border={"1px solid #DADCE0"}
        >
          <CK.Box
            w={2}
            h={"105px"}
            bg={`radial-gradient(272.66% 237.35% at 52.34% -70.02%, #FFE4A6 0%, #FDCA6D 18%, #F8C66A 25.52%, #996D2B 75%, #744A13 100%)`}
          ></CK.Box>
          <CK.VStack py={3} px={4} alignItems={"flex-start"}>
            <CK.Text fontSize={"24px"} fontWeight={700}>
              {x.code}
            </CK.Text>
            <CK.HStack spacing={2}>
              <CK.Text fontSize={"24px"} fontWeight={700}>
                {numeral(x.price).format("0,0.00")}
              </CK.Text>
              <CK.Text
                fontSize={"14px"}
                color={String(x.change).includes("-") ? "red" : "green"}
              >
                {numeral(x.change).format("0,0.00")}
              </CK.Text>
              <CK.Image src={HLine} />
              <CK.Text
                fontSize={"14px"}
                color={String(x.change).includes("-") ? "red" : "green"}
              >
                {numeral(x.changePct).format("0,0.00")}%
              </CK.Text>
            </CK.HStack>
          </CK.VStack>
        </CK.HStack>
      ))}
    </CK.HStack>
  );
};

export default IndexPrices;
