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
    <CK.VStack alignItems={"flex-start"} w={"full"} pt={3}>
      <CK.Text fontSize={"24px"} fontWeight={700}>
        Các tin tức đáng chú ý
      </CK.Text>
      <CK.VStack
        border={"1px solid var(--troke, #DADCE0)"}
        p={4}
        bgColor={"white"}
        borderRadius={10}
        alignItems={"flex-start"}
      >
        <CK.Text fontSize={"16px"} fontWeight={400}>
          - GDP Mỹ tăng trưởng 21% trong quý 2, chưa có dấu hiệu suy hoàn <br />
          - Fed nâng lãi suốt lên cao nhất trong 22 năm. - Trong một quyết định
          đã được dự báo từ trước Fed nâng lãi suất năm 25 điểm cơ biến lên
          5.25%-55%, là mức cao nhất kể từ đầu năm 2001.
          <br /> - Heniana - Canini làm nhất Việt Nam mang về cho LCT Group tạo
          nhiều
          <br /> - Bánh bao Thọ Phát năng mạnh vốn điều lệ trước khi hơn cho
          kiba <br /> - Hơn 12.000 tỷ đồng tại phiếu được mua hơn tranh trên
          <br /> - Trước ngày công bỏ thầu Long Thành, cổ đông ngoại của Ricons
          có thay đổi.
          <br /> - Tồn kho 30.000 bì thư, nhà thờ nghỉ nướng Nga se tang true ut
          khu cau len 153 USD van gay 5 dự kiến năng quỹ đất sạch lớn hơn 1,200
          ha ates her <br /> - Ngoài 3 730 căn hộ chung cư TP HCM sẽ ban đầu già
          133 đất và 1 khu đất từ Khu đô thị mới Thủ Thiêm
        </CK.Text>
        <CK.Text fontSize={"16px"} fontWeight={700}>
          Quét mã code để xem đầy đủ nội dung
        </CK.Text>

        <CK.HStack spacing={10}>
          <CK.HStack>
            <CK.Image w={"160px"} h={"160px"} src={QRCode} />
            <CK.Text fontSize={"16px"} fontWeight={400}>
              Mở Zalo, bấm quét QR <br /> để quét và xem trên điện thoại
            </CK.Text>
          </CK.HStack>
          <CK.Box>
            <CK.Image src={Line} />
          </CK.Box>
          <CK.VStack spacing={3} alignItems={"flex-start"}>
            <CK.Text fontSize={"14px"} fontWeight={500}>
              Hoặc truy cập Ứng dụng đầu tư số 1 thị trường
            </CK.Text>
            <CK.Image src={AppStore} />
          </CK.VStack>
        </CK.HStack>
      </CK.VStack>
      <CK.VStack
        border={"1px solid var(--troke, #DADCE0)"}
        p={5}
        w={"full"}
        bgColor={"white"}
        borderRadius={10}
        alignItems={"flex-start"}
      >
        <CK.HStack spacing={10} alignItems={"flex-start"}>
          <CK.VStack alignItems={"flex-start"}>
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
          <CK.HStack alignItems={"flex-start"} w={"full"} py={4}>
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
                  fill: "#00AA00",
                },
                {
                  value: dataTotalVolValueForeign?.sale_volume,
                  fill: "#FF593B",
                },
              ]}
            />
            <CK.VStack spacing={10} w={"full"}>
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
