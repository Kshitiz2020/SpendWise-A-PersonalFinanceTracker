import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { Modal } from "antd";
import AddExpensesModal from "../components/AddExpense";
import AddIncomeModal from "../components/AddIncome";
import { addDoc, collection, query, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
import TransactionsTable from "../components/TransactionsTable";
import Charts from "../components/Charts";
import Null from "../components/Null";
import { toast } from "react-toastify";

function Dashboard() {
  const [user] = useAuthState(auth);
  const [isExpensesModalopen, setIsExpensesModalopen] = useState(false);
  const [isIncomeModalopen, setIsIncomeModalopen] = useState(false);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Show and Hide Modals
  const showExpensesModal = () => {
    setIsExpensesModalopen(true);
  };
  const showIncomeModal = () => {
    setIsIncomeModalopen(true);
  };
  const handleExpensesCancel = () => {
    setIsExpensesModalopen(false);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModalopen(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction, false);
  };

  useEffect(() => {
    // Fetch all docs from a collection
    fetchTransactions();
  }, []);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  // Calculate balance
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

  // Add transaction
  const addTransaction = async (transaction, fromCSV = false) => {
    console.log("Adding transaction:", transaction);

    try {
      // Assuming you have a Firestore collection called "transactions"
      const transactionsRef = firebase.firestore().collection("transactions");
      await transactionsRef.add(transaction); // Add the transaction to Firestore
      if (fromCSV) {
        toast.success("Transaction added successfully from CSV.");
      } else {
        toast.success("Transaction added successfully.");
      }
      fetchTransactions(); // Refresh the list of transactions
    } catch (error) {
      console.error("Error adding transaction: ", error);
      toast.error("Error adding transaction.");
    }
  };

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const transactionsRef = collection(db, "transactions");
      const snapshot = await getDocs(transactionsRef);
      const fetchedTransactions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched transactions:", fetchedTransactions);
      setTransactions(fetchedTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Error fetching transactions");
    }
  };

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

      {/* Render charts if there are transactions */}
      {/* {transactions.length !== 0 ? <Charts /> : <Null />} */}
      <Charts />

      <Modal
        open={isIncomeModalopen}
        title="Add Income"
        onCancel={handleIncomeCancel}
        footer={null}
      >
        Income
      </Modal>
      <Modal
        open={isExpensesModalopen}
        title="Add Expense"
        onCancel={handleExpensesCancel}
        footer={null}
      >
        Expense
      </Modal>
      <AddExpensesModal
        isExpensesModalopen={isExpensesModalopen}
        handleExpensesCancel={handleExpensesCancel}
        onFinish={onFinish}
      />
      <AddIncomeModal
        isIncomeModalopen={isIncomeModalopen}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      />
      <TransactionsTable transactions={transactions} />
    </div>
  );
}

export default Dashboard;
