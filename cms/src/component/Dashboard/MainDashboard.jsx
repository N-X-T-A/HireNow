import React, { useEffect, useState } from "react";
import { Box, H2, Button } from "@adminjs/design-system";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const periodLabels = {
  month: "This Month",
  year: "This Year",
};

const MainDashboard = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("month");
  const [total, setTotal] = useState(0);

  const fetchData = async (p) => {
    const res = await fetch(`/admin/api/dashboard?period=${p}`);
    const json = await res.json();
    setData(json.chartData || []);
    setTotal(json.totalRevenue || 0);
    setPeriod(json.period || "month");
  };

  useEffect(() => {
    fetchData(period);
  }, [period]);

  return (
    <Box variant="grey" style={{ padding: "20px" }}>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box style={{ display: "flex", gap: "8px" }}>
          <Button
            size="sm"
            variant={period === "month" ? "primary" : "text"}
            onClick={() => fetchData("month")}
          >
            Month
          </Button>
          <Button
            size="sm"
            variant={period === "year" ? "primary" : "text"}
            onClick={() => fetchData("year")}
          >
            Year
          </Button>
        </Box>
      </Box>

      <Box style={{ margin: "16px 0px", fontSize: "18px" }}>
        <strong>Total Revenue ({periodLabels[period]}): </strong>${total}
      </Box>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#007bff"
            fill="#007bff"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MainDashboard;
