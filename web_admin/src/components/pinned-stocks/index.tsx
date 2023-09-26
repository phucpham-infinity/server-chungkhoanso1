import React from "react";
import { useBloc } from "./bloc";
import * as CK from "@chakra-ui/react";
import numeral from "numeral";

import ICDown from "@/assets/images/ic-down.svg";
import ICUp from "@/assets/images/ic-up.svg";

const PinnedStocks = () => {
  const { dataStocks, isLoading, dataPinnedStocks } = useBloc();

  return isLoading ? (
    <CK.Center minH={"50px"} w={"full"}>
      <CK.Spinner />
    </CK.Center>
  ) : (
    <CK.HStack w={"full"} justifyContent={"space-between"}>
      {dataPinnedStocks?.data.map((x: any) => (
        <CK.VStack
          borderRadius={6}
          py={"16px"}
          px={"20px"}
          bgColor={"#363636"}
          border={"1px solid  #A96C3D"}
          alignItems={"flex-start"}
        >
          <CK.Text fontSize={"20px"} fontWeight={700} color={"white"}>
            {x.code} {x.change}
          </CK.Text>
          <CK.HStack spacing={0}>
            {!String(x?.change).includes("-") && (
              <CK.Text fontWeight={700} fontSize={"24px"} color={"green"}>
                +
              </CK.Text>
            )}
            <CK.Text
              fontSize={"24px"}
              color={String(x?.change).includes("-") ? "red" : "green"}
              fontWeight={700}
            >
              {numeral(x.changePct).format("0.00")} %
            </CK.Text>
            <CK.Box ml={2}>
              {String(x?.change).includes("-") ? (
                <CK.Image src={ICDown} />
              ) : (
                <CK.Image src={ICUp} />
              )}
            </CK.Box>
          </CK.HStack>
        </CK.VStack>
      ))}
      <CK.Box cursor={"pointer"}>
        <CK.Text
          fontFamily={"Genos"}
          fontWeight={600}
          fontSize={"20px"}
          color="white"
        >
          Xem thêm
        </CK.Text>
      </CK.Box>
    </CK.HStack>
  );
};

export default PinnedStocks;
