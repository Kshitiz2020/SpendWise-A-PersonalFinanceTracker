import React from "react";
import { Card, Row } from "antd";
import Button from "./Button";

const Cards = () => (
  <div className="p-4 mx-auto">
    <Row gutter={[16, 16]} justify="center">
      <Card
        className="bg-green-400 box-shadow min-w-[300px]"
        title="Available Balance"
      >
        <strong>€0</strong>
        <Button buttonLabel="Restore Balance" />
      </Card>
      <Card
        className="bg-green-400 box-shadow min-w-[300px]"
        title="Total Income"
      >
        <strong>€0</strong>
        <Button buttonLabel="Deposit Income" />
      </Card>
      <Card
        className="bg-green-400 box-shadow min-w-[300px]"
        title="Total expenses"
      >
        <strong>€0</strong>
        <Button buttonLabel="Add Expenses" />
      </Card>
      <Card
        className="bg-green-400 box-shadow min-w-[300px]"
        title="Loans/Investment"
      >
        <strong>€0</strong>
        <Button buttonLabel="Restore Balance" />
      </Card>
    </Row>
  </div>
);

export default Cards;
