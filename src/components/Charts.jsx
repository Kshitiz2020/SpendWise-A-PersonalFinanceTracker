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
    <div className="max-w-5xl px-4 py-8 mx-auto rounded-lg shadow-lg bg-gray-50">
      <h1 className="mb-8 text-2xl font-bold text-center text-gray-800">
        Financial Analytics Dashboard
      </h1>

      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-gray-700">
          Your Analytics
        </h3>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <Line {...lineChartConfig} />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-700">
          Your Spending
        </h3>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <Pie {...pieChartConfig} />
        </div>
      </div>
    </div>
  );
}

export default Charts;
