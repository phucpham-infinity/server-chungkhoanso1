import React, { useEffect, useState } from "react";
import * as CK from "@chakra-ui/react";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import { keyBy } from "lodash";
import numeral from "numeral";

interface ICapitalization {
  data: any[];
  chart1Colors?: [string, string];
  chart2Colors?: [string, string];
}

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent }) => {
  const radius = outerRadius + 30;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fill="black"
    >{`${(percent * 100).toFixed(2)}%`}</text>
  );
};

const Capitalization = (props: ICapitalization) => {
  const {
    data,
    chart1Colors = ["#00AA00", "#FF593B"],
    chart2Colors = ["#00A0AA", "#FF7F37"],
  } = props;

  const [time, setTime] = useState("1D");
  const [objData, setObjData] = useState({});
  const [chartData1, setChartData1] = useState<any[]>([]);
  const [chartData2, setChartData2] = useState<any[]>([]);

  useEffect(() => {
    const objData = keyBy(
      data?.filter((x) => x.time === time),
      "key"
    );
    setObjData(objData);
    setChartData1([objData["kl_mua"], objData["kl_ban"]]);
    setChartData2([objData["gt_mua"], objData["gt_ban"]]);
  }, [data, time]);

  console.log("objData", objData);

  return (
    <CK.VStack w={"full"}>
      <CK.HStack w={"100%"} justifyContent={"flex-end"}>
        <CK.Select
          w={"160px"}
          variant={"filled"}
          onChange={(data) => {
            setTime(data.target.value);
          }}
        >
          <option value="1D">1 Ngày</option>
          <option value="1W">1 Tuần</option>
          <option value="1M">1 Tháng</option>
          <option value="3M">3 Tháng</option>
          <option value="12M">12 Tháng</option>
        </CK.Select>
      </CK.HStack>
      <CK.VStack w={"full"}>
        <CK.HStack spacing={3}>
          <CK.Box position={"relative"} minW={"430px"} w={"400px"} h={"200px"}>
            <CK.Box
              bottom={"10px"}
              left={"50%"}
              transform={"translateX(-50%)"}
              zIndex={1}
              position={"absolute"}
              textAlign={"center"}
            >
              <CK.Text fontWeight={"bold"} fontSize={"36px"}>
                {objData["kl_mua"] && objData["kl_ban"] && (
                  <CK.Text lineHeight={"36px"}>
                    {numeral(
                      (objData["kl_mua"]?.value + objData["kl_ban"]?.value) /
                        1000000
                    ).format("0,0.0")}
                  </CK.Text>
                )}
              </CK.Text>
              <CK.Text fontWeight={"bold"} fontSize={"12px"}>
                triệu CP
              </CK.Text>
            </CK.Box>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={300}>
                <Pie
                  dataKey="value"
                  label={renderCustomizedLabel}
                  startAngle={180}
                  endAngle={0}
                  data={chartData1}
                  cx="50%"
                  cy="100%"
                  innerRadius={100}
                  outerRadius={140}
                  fill="#8884d8"
                >
                  {data.map((entry, index) => {
                    return (
                      <Cell key={`cell-${index}`} fill={chart1Colors[index]} />
                    );
                  })}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CK.Box>
          <CK.VStack spacing={4} w={"full"}>
            <CK.HStack w={"full"}>
              <CK.Square
                size={"38px"}
                bgColor={chart1Colors[0]}
                borderRadius={"4px"}
              ></CK.Square>

              <CK.VStack w={"full"} spacing={0} alignItems={"flex-start"}>
                <CK.Text fontSize={"14px"} fontWeight={"semibold"}>
                  KL mua:
                </CK.Text>
                {objData["gt_mua"]?.value && (
                  <CK.Text fontWeight={700} fontSize={"14px"}>
                    {numeral(objData["kl_mua"]?.value).format("0,0")} CP
                  </CK.Text>
                )}
              </CK.VStack>
            </CK.HStack>
            <CK.HStack w={"full"}>
              <CK.Square
                size={"38px"}
                bgColor={chart1Colors[1]}
                borderRadius={"4px"}
              ></CK.Square>
              <CK.VStack w={"full"} spacing={0} alignItems={"flex-start"}>
                <CK.Text fontSize={"14px"} fontWeight={"semibold"}>
                  KL Bán:
                </CK.Text>
                {objData["gt_ban"]?.value && (
                  <CK.Text fontWeight={700} fontSize={"14px"}>
                    {numeral(objData["kl_ban"].value).format("0,0")} CP
                  </CK.Text>
                )}
              </CK.VStack>
            </CK.HStack>
          </CK.VStack>
        </CK.HStack>
        <CK.HStack spacing={3}>
          <CK.Box minW={"430px"} position={"relative"} w={"400px"} h={"200px"}>
            <CK.Box
              bottom={"10px"}
              left={"50%"}
              transform={"translateX(-50%)"}
              zIndex={1}
              position={"absolute"}
              textAlign={"center"}
            >
              <CK.Text fontWeight={"bold"} fontSize={"36px"}>
                {objData["gt_mua"] && objData["gt_ban"] && (
                  <CK.Text lineHeight={"36px"}>
                    {numeral(
                      (objData["gt_mua"]?.value + objData["gt_ban"]?.value) /
                        10000000
                    ).format("0,0.00")}
                  </CK.Text>
                )}
              </CK.Text>
              <CK.Text fontWeight={"bold"} fontSize={"12px"}>
                triệu tỷ đồng
              </CK.Text>
            </CK.Box>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={300}>
                <Pie
                  dataKey="value"
                  label={renderCustomizedLabel}
                  startAngle={180}
                  endAngle={0}
                  data={chartData2}
                  cx="50%"
                  cy="100%"
                  innerRadius={100}
                  outerRadius={140}
                  fill="#8884d8"
                >
                  {data.map((entry, index) => {
                    return (
                      <Cell key={`cell-${index}`} fill={chart2Colors[index]} />
                    );
                  })}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CK.Box>
          <CK.VStack spacing={4} w={"full"}>
            <CK.HStack w={"full"}>
              <CK.Square
                size={"38px"}
                bgColor={chart2Colors[0]}
                borderRadius={"4px"}
              ></CK.Square>

              <CK.VStack w={"full"} spacing={0} alignItems={"flex-start"}>
                <CK.Text fontSize={"14px"} fontWeight={"semibold"}>
                  GT mua:
                </CK.Text>
                {objData["gt_mua"]?.value && (
                  <CK.Text fontWeight={700} fontSize={"14px"}>
                    {numeral(objData["gt_mua"]?.value).format("0,0")} Tỷ
                  </CK.Text>
                )}
              </CK.VStack>
            </CK.HStack>
            <CK.HStack w={"full"}>
              <CK.Square
                size={"38px"}
                bgColor={chart2Colors[1]}
                borderRadius={"4px"}
              ></CK.Square>
              <CK.VStack w={"full"} spacing={0} alignItems={"flex-start"}>
                <CK.Text fontSize={"14px"} fontWeight={"semibold"}>
                  GT Bán:
                </CK.Text>
                {objData["gt_ban"]?.value && (
                  <CK.Text fontWeight={700} fontSize={"14px"}>
                    {numeral(objData["gt_ban"].value).format("0,0")} CP
                  </CK.Text>
                )}
              </CK.VStack>
            </CK.HStack>
          </CK.VStack>
        </CK.HStack>
      </CK.VStack>
      <CK.VStack spacing={2} mt={8} px={20} w={"full"}>
        <CK.HStack w={"full"}>
          <CK.VStack w={"50%"} alignItems={"flex-start"}>
            <CK.Text
              lineHeight={"normal"}
              textTransform={"capitalize"}
              fontSize={"14px"}
            >
              KL Mua Khớp lệnh
            </CK.Text>
            <CK.Text fontWeight={600} fontSize={"14px"}>
              {numeral(objData?.["kl_mua_khop_lenh"]?.value).format("0,0")} CP
            </CK.Text>
          </CK.VStack>
          <CK.VStack w={"50%"} alignItems={"flex-start"}>
            <CK.Text
              lineHeight={"normal"}
              textTransform={"capitalize"}
              fontSize={"14px"}
            >
              giá trị mua khớp lệnh
            </CK.Text>
            <CK.Text fontWeight={600} fontSize={"14px"}>
              {numeral(objData?.["gt_mua_khop_lenh"]?.value).format("0,0")} Tỷ
            </CK.Text>
          </CK.VStack>
        </CK.HStack>

        <CK.Divider />

        <CK.HStack w={"full"}>
          <CK.VStack w={"50%"} alignItems={"flex-start"}>
            <CK.Text
              lineHeight={"normal"}
              textTransform={"capitalize"}
              fontSize={"14px"}
            >
              KL Bán Khớp lệnh
            </CK.Text>
            <CK.Text fontWeight={600} fontSize={"14px"}>
              {numeral(objData?.["kl_ban_khop_lenh"]?.value).format("0,0")} CP
            </CK.Text>
          </CK.VStack>
          <CK.VStack w={"50%"} alignItems={"flex-start"}>
            <CK.Text
              lineHeight={"normal"}
              textTransform={"capitalize"}
              fontSize={"14px"}
            >
              giá trị Bán khớp lệnh
            </CK.Text>
            <CK.Text fontWeight={600} fontSize={"14px"}>
              {numeral(objData?.["gt_ban_khop_lenh"]?.value).format("0,0")} Tỷ
            </CK.Text>
          </CK.VStack>
        </CK.HStack>
      </CK.VStack>
      <CK.VStack w={"full"}>
        <CK.HStack px={20} py={3} mt={3} bgColor={"#E8F6F3"} w={"full"}>
          <CK.VStack w={"50%"} alignItems={"flex-start"}>
            <CK.Text
              lineHeight={"normal"}
              textTransform={"capitalize"}
              fontSize={"14px"}
            >
              Tổng Khối Lượng ròng
            </CK.Text>
            <CK.Text color={"#00AA00"} fontWeight={600} fontSize={"14px"}>
              {numeral(objData?.["kl_ban_khop_lenh"]?.value).format("0,0")} CP
            </CK.Text>
          </CK.VStack>
          <CK.VStack w={"50%"} alignItems={"flex-start"}>
            <CK.Text
              lineHeight={"normal"}
              textTransform={"capitalize"}
              fontSize={"14px"}
            >
              Tổng giá trị Ròng
            </CK.Text>
            <CK.Text color={"#00AA00"} fontWeight={600} fontSize={"14px"}>
              {numeral(objData?.["gt_ban_khop_lenh"]?.value).format("0,0")} Tỷ
            </CK.Text>
          </CK.VStack>
        </CK.HStack>
      </CK.VStack>
    </CK.VStack>
  );
};

export default Capitalization;
