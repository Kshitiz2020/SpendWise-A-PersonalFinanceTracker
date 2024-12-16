import React, { useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { Modal } from "antd";
import AddExpensesModal from "../components/AddExpense";
import AddIncomeModal from "../components/AddIncome";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Dashboard() {
  const [user] = useAuthState(auth);
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

  const onFinish = (values, type) => {  const newTransaction = {
    type: type,
    date: moment(values.date).format("YYYY-MM-DD"),
    amount: parseFloat(values.amount),
    tag: values.tag,
    name: values.name,};

  //add transaction
  async function addTransaction(transaction, many) {try {
    const docRef = await addDoc(
      collection(db, `users/${user.uid}/transactions`),
      transaction
    );
    console.log("Document written with ID: ", docRef.id);
    if (!many) {
      toast.success("Transaction Added!");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
    if (!many) {
      toast.error("Couldn't add transaction");
    }
  }}

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
