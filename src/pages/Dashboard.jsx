import React, { useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { Modal } from "antd";

function Dashboard() {
  const [isExpensesModalVisible, setIsExpensesModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const showExpensesModal = () => {
    setIsExpensesModalVisible(true);
  };
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const handleExpensesCancel = () => {
    setIsExpensesModalVisible(false);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };
  return (
    <div>
      <Header />
      <Cards
        showExpensesModal={showExpensesModal}
        showIncomeModal={showIncomeModal}
        handleExpensesCancel={handleExpensesCancel}
        handleIncomeCancel={handleIncomeCancel}
      />
      <Modal open={isIncomeModalVisible}>Income</Modal>
      <Modal open={isExpensesModalVisible}>Expense</Modal>
    </div>
  );
}
export default Dashboard;
