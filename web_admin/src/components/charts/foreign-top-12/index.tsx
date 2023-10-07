import React, { useState } from "react";
import * as CK from "@chakra-ui/react";
import numeral from "numeral";

import {
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  ComposedChart,
  LabelList,
} from "recharts";

interface IForeignTop12 {
  data?: any;
  type: "buy" | "sell";
  name: string;
  color?: string;
}

const CustomizedTick = ({ x, y, payload, offsetX, ratio = 1 }: any) => {
  return (
    <text fontSize={"14px"} fontWeight={600} y={y} x={x + offsetX}>
      {Number(payload.value) / ratio}
    </text>
  );
};

const CustomizedLabel = ({ x, y, label, viewBox }: any) => {
  return (
    <text fontWeight={600} y={viewBox.y - 24} x={viewBox.x}>
      {label}
    </text>
  );
};
const CustomizedLabelList = (props: any) => {
  const { x, y, value } = props;
  return (
    <text fontSize={"12px"} fontWeight={600} y={y - 14} x={x}>
      {numeral(Number(value)).format("0,0")}
    </text>
  );
};
const CustomizedDot = (props) => {
  const { cx, cy, stroke, payload, value } = props;
  return (
    <svg
      x={cx}
      y={cy}
      width={100}
      height={100}
      fill="green"
      viewBox="0 0 1024 1024"
    >
      <circle r="70" stroke="white" stroke-width="2" fill="white" />
      <text
        x="50"
        y="-120"
        text-anchor="middle"
        font-size="120"
        fontWeight={600}
        fill="#E4AA0A"
      >
        {numeral(Number(value)).format("0,0")}
      </text>
    </svg>
  );
};

const CustomizedAxisTick = (props: any) => {
  const { x, y, stroke, payload, width } = props;
  return (
    <text x={x + 18} y={y + 20} fontWeight={600} textAnchor="end" fill="#666">
      {payload.value}
    </text>
  );
};
const ForeignTop12 = (props: IForeignTop12) => {
  const { data, type = "buy", name, color = "#18712C" } = props;
  const [exchange, setExchange] = useState("HOSE");

  return (
    <CK.VStack sx={{ svg: { overflow: "initial" } }} w={"full"}>
      <CK.HStack w={"100%"} justifyContent={"flex-end"}>
        <CK.Select
          w={"160px"}
          variant={"filled"}
          onChange={(data) => {
            setExchange(data.target.value);
          }}
        >
          <option value="HOSE">SÀN HOSE</option>
          <option value="HNX">SÀN HNX</option>
        </CK.Select>
      </CK.HStack>
      <CK.Box w={"full"} pt={"35px"} h={"300px"}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data
              .filter((x: any) => x.exchange === exchange)
              .filter((y: any) => y.type === type)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tick={<CustomizedAxisTick />} dataKey="symbol" />
            <YAxis
              label={<CustomizedLabel label="(KL) triệu CP" />}
              type="number"
              yAxisId="1"
              tick={<CustomizedTick ratio={10000} offsetX={-30} />}
            />
            <YAxis
              label={<CustomizedLabel label="GT (tỷ)" />}
              type="number"
              orientation="right"
              yAxisId="2"
              tick={<CustomizedTick offsetX={10} />}
            />
            {/* <Tooltip /> */}

            {/* <Legend /> */}
            <Bar barSize={40} yAxisId="1" dataKey="vol" fill={color}>
              <LabelList dataKey="vol" content={CustomizedLabelList} />
            </Bar>
            <Line
              dot={<CustomizedDot />}
              yAxisId="2"
              type="monotone"
              dataKey="value"
              strokeWidth={3}
              stroke="#E4AA0A"
            />
          </ComposedChart>
        </ResponsiveContainer>
        <CK.VStack py="3">
          <CK.Text fontSize={"18px"} fontWeight={700}>
            {name} {exchange}
          </CK.Text>
        </CK.VStack>
      </CK.Box>
    </CK.VStack>
  );
};

export default ForeignTop12;
