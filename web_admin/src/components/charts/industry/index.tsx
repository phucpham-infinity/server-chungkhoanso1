import React from "react";
import * as CK from "@chakra-ui/react";
import numeral from "numeral";

import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

interface IIndustry {
  data?: any[];
}

const Industry = (props: IIndustry) => {
  const { data } = props;

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <CK.HStack
          border={"1px solid var(--troke, #DADCE0)"}
          boxShadow={"0px 0px 30px 0px rgba(0, 0, 0, 0.04)"}
          borderRadius={10}
          p={4}
          bgColor={"white"}
        >
          <p className="label">{`${payload[0]?.payload?.label} : ${numeral(
            payload[0].value
          ).format("0.00")}%`}</p>
        </CK.HStack>
      );
    }
    return null;
  };

  return (
    <CK.HStack
      justifyContent={"space-between"}
      alignItems={"flex-start"}
      w={"full"}
      gap={10}
    >
      <CK.HStack minW={"400px"} w={"400px"} h={"360px"}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={180}
              innerRadius={50}
              fill="#8884d8"
              labelLine={false}
              label={renderCustomizedLabel}
              startAngle={90}
              endAngle={360 + 90}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={data[index].color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </CK.HStack>
      <CK.HStack flexGrow={1} flexWrap={"wrap"}>
        {data.map((x) => (
          <CK.HStack w={"200px"}>
            <CK.Square bgColor={x.color} size={"12px"}></CK.Square>
            <CK.Text fontWeight={600} fontSize={"11px"}>
              {x.label}
            </CK.Text>
          </CK.HStack>
        ))}
      </CK.HStack>
    </CK.HStack>
  );
};

export default Industry;
