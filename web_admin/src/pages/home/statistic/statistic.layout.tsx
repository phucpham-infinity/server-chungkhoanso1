import React from "react";
import { Outlet } from "react-router-dom";
import * as CK from "@chakra-ui/react";
import { format } from "date-fns";
import Bg01 from "@/assets/images/bg-01.svg";
import IndexPrices from "@/components/index_prices";

const Layout = () => {
  const statisticEL = React.useRef<any>({});
  const iframeHeightNotify = () => {
    window.parent.postMessage(
      { height: statisticEL.current.scrollHeight },
      "*"
    );
  };
  React.useEffect(() => {
    let timer = setInterval(iframeHeightNotify, 300);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <CK.VStack
      ref={statisticEL}
      bgColor={"white"}
      p={4}
      alignItems={"flex-start"}
    >
      <CK.VStack
        w={"full"}
        borderRadius={12}
        px={4}
        py={3}
        bgColor={"black"}
        alignItems={"flex-start"}
        color={"white"}
        spacing={1}
        position={"relative"}
        overflow={"hidden"}
      >
        <CK.Image position={"absolute"} right={0} top={0} src={Bg01} />
        <CK.Text fontSize={"20px"} lineHeight={"20px"} fontWeight={700}>
          TỔNG QUAN
        </CK.Text>
        <CK.Text
          fontFamily={"Genos"}
          fontSize={"40px"}
          color={"#F8C66A"}
          lineHeight={"40px"}
          fontWeight={700}
        >
          THỊ TRƯỜNG CHỨNG KHOÁN
        </CK.Text>
        <CK.HStack spacing={10}>
          <CK.Text fontSize={"16px"} fontWeight={700}>
            Ngày {format(new Date(), "dd/MM/yyyy")}
          </CK.Text>
          <CK.Text fontSize={"16px"} fontWeight={400}>
            Dữ liệu cập nhật lúc: {format(new Date(), "HH:mm dd/MM/yyyy")}{" "}
            (Nguồn: vndirect)
          </CK.Text>
        </CK.HStack>
      </CK.VStack>
      <CK.Box w={"full"}>
        <IndexPrices />
      </CK.Box>
      <Outlet />
    </CK.VStack>
  );
};

export default Layout;
