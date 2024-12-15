import React, { useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { Modal } from "antd";
import AddExpensesModal from "../components/AddExpense";
import AddIncomeModal from "../components/AddIncome";

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

  const onFinish = () => {
    console.log("onFinish", values, type);
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
      <Modal
        open={isIncomeModalVisible}
        title="Add Income"
        onCancel={() => setIsIncomeModalVisible(false)}
        footer={null}
      >
        Income
      </Modal>
      <Modal
        open={isExpensesModalVisible}
        title="Add Expense"
        onCancel={() => setIsExpensesModalVisible(false)}
        footer={null}
      >
        Expense
      </Modal>
      <AddExpensesModal
        isExpensesModalVisible={isExpensesModalVisible}
        handleExpensesCancel={handleExpensesCancel}
        onFinish={onFinish}
      />
      <AddIncomeModal
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      />
    </div>
  );
}
export default Dashboard;
