import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { Modal } from "antd";
import AddExpensesModal from "../components/AddExpense";
import AddIncomeModal from "../components/AddIncome";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  query,
  getDocs,
  updateDoc,
} from "firebase/firestore";
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

  /* const restore = () => {
    setIncome(0);
    setExpenses(0);
    setTotalBalance(0);
  }; */

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
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
      const monthYear = moment(transaction.date).format("MMM YYYY");
      const tag = transaction.tag;

      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });
    setIncome(incomeTotal);
    setExpenses(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal);
    console.log("T1", transactions);
  }
  // Add transaction
  const addTransaction = async (transaction, fromCSV = false) => {
    console.log("Adding transaction:", transaction);

    try {
      // Use the 'transactions' collection and add the new transaction
      const docRef = doc(collection(db, "transactions")); // Generate a new document reference
      await setDoc(docRef, transaction); // Set the document with the transaction data

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

      console.log("Fetched transactions:", fetchedTransactions); // Add this to check if the transactions are being fetched

      setTransactions(fetchedTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Error fetching transactions");
    }
  };

  let sortedTransactions = transactions.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  // restore transaction
  const restoreAllTransactions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "transactions"));
      const updates = [];

      querySnapshot.forEach((doc) => {
        const docRef = doc.ref;

        // Set amount to 0 (or any other fields to reset)
        updates.push(
          updateDoc(docRef, { amount: 0 }) // Replace 'amount' with the field to reset
        );
      });

      await Promise.all(updates); // Wait for all updates to complete
      console.log("All transactions have been reset!");
      toast.success("All transactions reset successfully.");

      // Clear or fetch updated transactions
      setTransactions([]); // Clear the table UI by resetting state
      fetchTransactions(); // Alternatively, refetch transactions if necessary
    } catch (error) {
      console.error("Error resetting transactions:", error);
      toast.error("Failed to reset transactions.");
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
        restore={restoreAllTransactions}
      />

      {/* Render charts if there are transactions */}
      {/*   {transactions.length !== 0 ? (
    /*     <Charts sortedTransactions={sortedTransactions} />
      ) : (
        <Null />
      )} */}
      <Charts sortedTransactions={sortedTransactions} />

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
