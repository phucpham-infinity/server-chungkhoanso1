import React from "react";
import * as CK from "@chakra-ui/react";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import numeral from "numeral";

const RADIAN = Math.PI / 180;

interface IChart01 {
  dataVol?: any;
  dataValue?: any;
}

const Chart01 = (props: IChart01) => {
  const { dataVol, dataValue } = props;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
  }) => {
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

  return (
    <CK.VStack
      bgColor={"white"}
      border={"1px solid  #DADCE0"}
      borderRadius={"10px"}
      pb={"40px"}
      pt={"10px"}
      spacing={"30px"}
    >
      <CK.VStack alignItems={"flex-start"}>
        <CK.Box position={"relative"} w={"400px"} h={"250px"}>
          <CK.Box
            bottom={"10px"}
            left={"50%"}
            transform={"translateX(-50%)"}
            zIndex={1}
            position={"absolute"}
            textAlign={"center"}
          >
            <CK.Text fontWeight={"bold"} fontSize={"36px"}>
              {dataVol[1]?.value && dataVol[0]?.value && (
                <CK.Text lineHeight={"36px"}>
                  {numeral(
                    (dataVol[0]?.value + dataVol[1]?.value) / 1000000
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
                data={dataVol}
                cx="50%"
                cy="100%"
                innerRadius={100}
                outerRadius={140}
                fill="#8884d8"
              >
                {dataVol.map((entry, index) => {
                  return <Cell key={`cell-${index}`} fill={entry.fill} />;
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CK.Box>
        <CK.VStack pl={"86px"}>
          <CK.HStack>
            <CK.Square
              size={"38px"}
              bgColor={"#00AA00"}
              borderRadius={"4px"}
            ></CK.Square>
            <CK.VStack spacing={0} alignItems={"flex-start"}>
              <CK.Text fontSize={"14px"} fontWeight={"semibold"}>
                KL mua:
              </CK.Text>
              {dataVol[0]?.value && (
                <CK.Text fontSize={"14px"}>
                  {numeral(dataVol[0]?.value).format("0,0")} CP
                </CK.Text>
              )}
            </CK.VStack>
          </CK.HStack>
          <CK.HStack>
            <CK.Square
              size={"38px"}
              bgColor={"#FF593B"}
              borderRadius={"4px"}
            ></CK.Square>
            <CK.VStack spacing={0} alignItems={"flex-start"}>
              <CK.Text fontSize={"14px"} fontWeight={"semibold"}>
                KL Bán:
              </CK.Text>
              {dataVol[1]?.value && (
                <CK.Text fontSize={"14px"}>
                  {numeral(dataVol[1]?.value).format("0,0")} CP
                </CK.Text>
              )}
            </CK.VStack>
          </CK.HStack>
        </CK.VStack>
      </CK.VStack>
      <CK.VStack alignItems={"flex-start"}>
        <CK.Box position={"relative"} w={"400px"} h={"250px"}>
          <CK.Box
            bottom={"10px"}
            left={"50%"}
            transform={"translateX(-50%)"}
            zIndex={2}
            position={"absolute"}
            textAlign={"center"}
          >
            <CK.Text fontWeight={"bold"} fontSize={"36px"}>
              {dataValue[1]?.value && dataValue[0]?.value && (
                <CK.Text lineHeight={"36px"}>
                  {numeral(
                    (dataValue[0]?.value + dataValue[1]?.value) / 1000000
                  ).format("0,0.0")}
                </CK.Text>
              )}
            </CK.Text>
            <CK.Text fontWeight={"bold"} fontSize={"12px"}>
              triệu tỷ đồng
            </CK.Text>
          </CK.Box>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={dataValue}
                label={renderCustomizedLabel}
                cx="50%"
                cy="100%"
                innerRadius={100}
                outerRadius={140}
                fill="#8884d8"
              >
                {dataValue.map((entry, index) => {
                  return <Cell key={`cell-${index}`} fill={entry.fill} />;
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CK.Box>
        <CK.VStack pl={"86px"}>
          <CK.HStack>
            <CK.Square
              size={"38px"}
              bgColor={"#00A0AA"}
              borderRadius={"4px"}
            ></CK.Square>

            <CK.VStack spacing={0} alignItems={"flex-start"}>
              <CK.Text fontSize={"14px"} fontWeight={"semibold"}>
                GT mua:
              </CK.Text>
              {dataValue[0]?.value && (
                <CK.Text fontSize={"14px"}>
                  {numeral(dataVol[0]?.value).format("0,0")} Tỷ
                </CK.Text>
              )}
            </CK.VStack>
          </CK.HStack>
          <CK.HStack>
            <CK.Square
              size={"38px"}
              bgColor={"#FF7F37"}
              borderRadius={"4px"}
            ></CK.Square>
            <CK.VStack spacing={0} alignItems={"flex-start"}>
              <CK.Text fontSize={"14px"} fontWeight={"semibold"}>
                GT Bán:
              </CK.Text>
              {dataValue[1]?.value && (
                <CK.Text fontSize={"14px"}>
                  {numeral(dataVol[1]?.value).format("0,0")} Tỷ
                </CK.Text>
              )}
            </CK.VStack>
          </CK.HStack>
        </CK.VStack>
      </CK.VStack>
    </CK.VStack>
  );
};

export default Chart01;
