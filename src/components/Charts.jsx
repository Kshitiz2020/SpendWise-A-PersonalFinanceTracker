import React from "react";
import { Line, Pie } from "@ant-design/charts";

function Charts({ sortedTransactions }) {
  const data = (sortedTransactions || []).map((item) => {
    return {
      date: item.date,
      amount: item.amount,
    };
  });

  const spendingData = sortedTransactions.filter((transaction) => {
    if (transaction.type == "expenses") {
      return { transaction: transaction.tag, amount: transaction.amount };
    }
  });

  const props = {
    data,
    xField: "year",
    yField: "value",
  };

  const spendingDataConfig = {
    spendingData,
    angleField: "value",
    colorField: "tag",
  };

  return (
    <>
      <div>
        <h3>Your Analytics</h3>
        <Line {...props} />
      </div>

      <div>
        <h3>Your spending</h3>
        <Pie {...spendingDataConfig} />
      </div>
    </>
  );
}
export default Charts;
