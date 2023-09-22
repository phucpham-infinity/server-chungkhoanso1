import React, { useState } from "react";
import * as CK from "@chakra-ui/react";

import {
  Bar,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  ComposedChart,
} from "recharts";

interface IForeignTop12 {
  data?: any;
  type: "buy" | "sell";
}

const CustomizedTick = ({ x, y, payload, offsetX }: any) => {
  return (
    <text fontWeight={600} y={y} x={x + offsetX}>
      {Number(payload.value) / 100000}
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
const ForeignTop12 = (props: IForeignTop12) => {
  const { data, type = "buy" } = props;

  const [exchange, setExchange] = useState("HOSE");

  return (
    <CK.VStack sx={{ svg: { overflow: "initial" } }} w={"full"}>
      <CK.HStack w={"full"} justifyContent={"flex-end"}>
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

      <CK.Box w={"full"} pt={"40px"} h={"500px"}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data
              .filter((x: any) => x.exchange === exchange)
              .filter((y: any) => y.type === type)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="symbol" />
            <YAxis
              label={<CustomizedLabel label="(KL) triệu CP" />}
              type="number"
              yAxisId="1"
              tick={<CustomizedTick offsetX={-30} />}
            />
            <YAxis
              label={<CustomizedLabel label="GT (tỷ)" />}
              type="number"
              orientation="right"
              yAxisId="2"
              tick={<CustomizedTick offsetX={10} />}
            />
            <Tooltip />
            <Legend />
            <Bar barSize={40} yAxisId="1" dataKey="vol" fill="#18712C" />
            <Line
              yAxisId="2"
              type="monotone"
              dataKey="value"
              stroke="#ff7300"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CK.Box>
    </CK.VStack>
  );
};

export default ForeignTop12;
