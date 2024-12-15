import React from "react";
import { Card, Row } from "antd";
import Button from "./Button";

const Cards = ({ showExpensesModal, showIncomeModal }) => (
  <div className="p-4 mx-auto">
    <Row gutter={[16, 16]} justify="center">
      {/* current balance */}
      <Card
        className="bg-green-200  box-shadow min-w-[300px]"
        title="Available Balance"
      >
        <strong>€</strong>0
        <Button buttonLabel="Restore Balance" />
      </Card>

      {/*Total Income */}
      <Card
        className="bg-green-200  box-shadow min-w-[300px]"
        title="Total Income"
      >
        <strong>€</strong>0
        <Button buttonLabel="Deposit Income" onClick={showIncomeModal} />
      </Card>

      {/*Total Expenses */}
      <Card
        className="bg-green-200  box-shadow min-w-[300px]"
        title="Total expenses"
      >
        <strong>€</strong>0
        <Button buttonLabel="Add Expenses" onClick={showExpensesModal} />
      </Card>

      {/* Loans/Investment */}
      <Card
        className="bg-green-200  box-shadow min-w-[300px]"
        title="Loans/Investment"
      >
        <strong>€</strong>0
        <Button buttonLabel="Restore Balance" />
      </Card>
    </Row>
  </div>
);

export default Cards;
