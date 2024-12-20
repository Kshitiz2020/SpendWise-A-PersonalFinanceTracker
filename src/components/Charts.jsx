import React, { useState, useEffect } from "react";
import { Card, Row, DatePicker, Button } from "antd";
import { Line, Pie } from "@ant-design/charts";
import moment from "moment";

function Charts({ sortedTransactions, addTransaction }) {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [selectedDate, setSelectedDate] = useState(moment()); // Default to today's date

  // Format data for Line Chart and ensure date is in valid format
  const data = (sortedTransactions || [])
    .map((item) => ({
      date: moment(item.date).format("YYYY-MM-DD"), // Ensure date is in ISO format
      amount: item.amount,
    }))
    .sort((a, b) => (moment(a.date).isBefore(moment(b.date)) ? -1 : 1)); // Sort by date

  // Filter out expenses and prepare data for Pie Chart
  const spendingData = (sortedTransactions || [])
    .filter(
      (transaction) =>
        transaction.type === "expense" && transaction.tag && transaction.amount
    )
    .map((transaction) => ({
      tag: transaction.tag,
      value: transaction.amount,
    }));

  // Handle income date selection change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Handle adding income (or any transaction)
  const handleAddTransaction = () => {
    const newTransaction = {
      date: selectedDate.format("YYYY-MM-DD"), // Store date in ISO format
      amount: 100, // You can replace this with dynamic amount
      type: "income", // Assuming you're adding income
    };

    addTransaction(newTransaction); // Update the parent or global state with the new transaction
  };

  // Line Chart Configuration with Smooth Curve and Date Format
  const lineChartConfig = {
    data,
    xField: "date",
    yField: "amount",
    smooth: true, // Curve the line
    point: {
      size: 5,
      shape: "diamond",
    },
    xAxis: {
      type: "time", // Use time scale for x-axis
      tickCount: 5, // Adjust the number of ticks on the x-axis
    },
    yAxis: {
      label: {
        formatter: (value) => `$${value}`, // Optional: Format the y-axis labels
      },
    },
  };

  // Pie Chart Configuration with dynamic data for expenses
  const pieChartConfig = {
    data: spendingData, // Use dynamic spendingData
    angleField: "value",
    colorField: "tag",
    radius: 0.8,
    label: {
      type: "outer", // Correct label type
      content: "{name} ({percentage}%)", // Correct content template
    },
  };

  // Calculate balance, income, and expenses from transactions
  useEffect(() => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    sortedTransactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpenses(expensesTotal);
    setCurrentBalance(incomeTotal - expensesTotal);
  }, [sortedTransactions]);

  return (
    <div className="max-w-5xl px-4 py-8 mx-auto rounded-lg shadow-lg bg-gray-50">
      <h1 className="mb-8 text-2xl font-bold text-center text-gray-800">
        Financial Analytics Dashboard
      </h1>

      {/* Income and Expenses Summary */}
      <Row gutter={16}>
        <Card
          bordered={true}
          style={{
            boxShadow: "0px 0px 30px 8px rgba(227, 227, 227, 0.75)",
            marginBottom: "2rem",
            flex: 1,
          }}
        >
          <h3 className="mb-4 text-lg font-semibold text-gray-700">
            Current Balance
          </h3>
          <p className="text-xl font-bold text-gray-800">${currentBalance}</p>
        </Card>

        <Card
          bordered={true}
          style={{
            boxShadow: "0px 0px 30px 8px rgba(227, 227, 227, 0.75)",
            marginBottom: "2rem",
            flex: 1,
          }}
        >
          <h3 className="mb-4 text-lg font-semibold text-gray-700">Income</h3>
          <p className="text-xl font-bold text-gray-800">${income}</p>
        </Card>

        <Card
          bordered={true}
          style={{
            boxShadow: "0px 0px 30px 8px rgba(227, 227, 227, 0.75)",
            marginBottom: "2rem",
            flex: 1,
          }}
        >
          <h3 className="mb-4 text-lg font-semibold text-gray-700">Expenses</h3>
          <p className="text-xl font-bold text-gray-800">${expenses}</p>
        </Card>
      </Row>

      {/* Line Chart for financial data */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-gray-700">
          Your Analytics
        </h3>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <Line {...lineChartConfig} />
        </div>
      </div>

      {/* Pie Chart for spending data */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-700">
          Your Spending
        </h3>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          {spendingData.length === 0 ? (
            <p>No spending data available...</p>
          ) : (
            <Pie {...pieChartConfig} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Charts;
