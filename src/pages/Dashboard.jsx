import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { Modal } from "antd";
import AddExpensesModal from "../components/AddExpense";
import AddIncomeModal from "../components/AddIncome";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
import TransactionsTable from "../components/TransactionsTable";

function Dashboard() {
  /* const sampleTransactions = [
    {
      name: "Freelance Payment",
      type: "income",
      date: "2023-02-10",
      amount: 1500,
      tag: "freelance",
    },
    {
      name: "Groceries",
      type: "expense",
      date: "2023-02-12",
      amount: 200,
      tag: "food",
    },
    {
      name: "Gym Membership",
      type: "expense",
      date: "2023-02-15",
      amount: 50,
      tag: "health",
    },
    {
      name: "Car Maintenance",
      type: "expense",
      date: "2023-02-18",
      amount: 300,
      tag: "transportation",
    },
    {
      name: "Bonus",
      type: "income",
      date: "2023-02-20",
      amount: 800,
      tag: "bonus",
    },
  ]; */

  const [user] = useAuthState(auth);
  const [isExpensesModalVisible, setIsExpensesModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
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

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
  };

  /*  useEffect(() => {
    //GEt all docs from a collection
    fetchTransactions();
  }, []); */

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  // calculate balance
  function calculateBalance() {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });
    setIncome(incomeTotal);
    setExpenses(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal);
  }

  //add transaction
  async function addTransaction(transaction, many) {
    try {
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
    }
  }

  return (
    <div>
      <Header />
      <Cards
        showExpensesModal={showExpensesModal}
        showIncomeModal={showIncomeModal}
        income={income}
        expenses={expenses}
        totalBalance={totalBalance}
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
      <TransactionsTable transaction={transactions} />
    </div>
  );
}
export default Dashboard;
