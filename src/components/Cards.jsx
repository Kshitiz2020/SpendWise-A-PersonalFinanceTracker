import React from "react";
import { Card, Row } from "antd";
import Button from "./Button";

const Cards = ({
  showExpensesModal,
  showIncomeModal,
  income,
  expenses,
  totalBalance,
}) => (
  <div className="p-4 mx-auto">
    <Row gutter={[32, 32]} justify="center">
      {/* current balance */}
      <Card
        className="bg-green-200  box-shadow min-w-[400px]"
        title="Available Balance"
      >
        <strong>€</strong>
        {totalBalance}
        <Button buttonLabel="Restore Balance" />
      </Card>

      {/*Total Income */}
      <Card
        className="bg-green-200  box-shadow min-w-[400px]"
        title="Total Income"
      >
        <strong>€</strong>
        {income}
        <Button buttonLabel="Deposit Income" onClick={showIncomeModal} />
      </Card>

      {/*Total Expenses */}
      <Card
        className="bg-green-200  box-shadow min-w-[400px]"
        title="Total expenses"
      >
        <strong>€</strong>
        {expenses}
        <Button buttonLabel="Add Expenses" onClick={showExpensesModal} />
      </Card>

      {/* Loans/Investment */}
    </Row>
  </div>
);

export default Cards;
