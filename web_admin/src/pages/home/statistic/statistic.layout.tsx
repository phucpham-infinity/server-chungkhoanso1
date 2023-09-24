import React from "react";
import { Outlet } from "react-router-dom";
import * as CK from "@chakra-ui/react";
import IndexPrices from "@/components/index_prices";

const Layout = () => {
  return (
    <CK.VStack p={4} alignItems={"flex-start"}>
      <CK.VStack
        w={"full"}
        borderRadius={12}
        p={5}
        bgColor={"black"}
        alignItems={"flex-start"}
        color={"white"}
        spacing={1}
      >
        <CK.Text fontSize={"24px"} fontWeight={700}>
          TỔNG QUAN
        </CK.Text>
        <CK.Text fontSize={"48px"} color={"#F8C66A"} fontWeight={700}>
          THỊ TRƯỜNG CHỨNG KHOÁN
        </CK.Text>
        <CK.HStack spacing={10}>
          <CK.Text fontSize={"16px"} fontWeight={700}>
            Ngày 01/08/2023
          </CK.Text>
          <CK.Text fontSize={"16px"} fontWeight={400}>
            Dữ liệu cập nhật lúc: 19:03:34 - 01/08/2023
          </CK.Text>
        </CK.HStack>
      </CK.VStack>
      <CK.Box mt={5} w={"full"}>
        <IndexPrices />
      </CK.Box>
      <Outlet />
    </CK.VStack>
  );
};

export default Layout;
