import React from "react";
import { Line, Pie } from "@ant-design/charts";

function Charts({ sortedTransactions }) {
  const data = (sortedTransactions || []).map((item) => ({
    date: item.date,
    amount: item.amount,
  }));

  const spendingData = (sortedTransactions || [])
    .filter((transaction) => transaction.type === "expenses")
    .map((transaction) => ({
      tag: transaction.tag,
      value: transaction.amount,
    }));

  const lineChartConfig = {
    data,
    xField: "date",
    yField: "amount",
    smooth: true,
    point: {
      size: 5,
      shape: "diamond",
    },
  };

  const pieChartConfig = {
    data: spendingData,
    angleField: "value",
    colorField: "tag",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} ({percentage})",
    },
  };

  return (
    <>
      <div>
        <h3>Your Analytics</h3>
        <Line {...lineChartConfig} />
      </div>

      <div>
        <h3>Your Spending</h3>
        <Pie {...pieChartConfig} />
      </div>
    </>
  );
}

export default Charts;
