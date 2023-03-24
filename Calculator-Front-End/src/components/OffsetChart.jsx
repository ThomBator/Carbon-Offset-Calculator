import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const OffsetChart = ({ data }) => {
  return (
    <div className="mb-5">
      <h2 className="display-6 mb-5 text-center">Offset Growth By Year</h2>
      <ResponsiveContainer
        minWidth={300}
        maxWidth={600}
        minHeight={300}
        maxHeight={300}
        width="100%"
        height="100%"
      >
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="currentYear" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="yearlyOffset"
            name="Yearly Offset Kilograms"
            stroke="#6c757d"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OffsetChart;
