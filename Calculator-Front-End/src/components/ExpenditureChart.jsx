import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
const ExpenditureChart = ({ data }) => {
  /*
    Results Object keys 
     maxOffset,
    offsetsByYear,
    maxOffsetYear,
    yearsInvested,
    isCarbonNeutral,
    targetOffset,
    countryName,
    totalExpenditure,
    expendituresByYear, 
    totalTrees
    
    */
  console.log("data", data);
  return (
    <div>
      <h2 className="display-6 mb-5 text-center">Expenditures By Year</h2>
      <ResponsiveContainer
        minWidth={300}
        maxWidth={600}
        minHeight={300}
        maxHeight={300}
        width="100%"
        height="100%"
      >
        <AreaChart
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
          <XAxis dataKey="currentYear" name="year" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="yearlyTotal"
            name="Total USD"
            stroke="#6c757d"
            fill="#6c757d"
          />
          <Legend />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenditureChart;
