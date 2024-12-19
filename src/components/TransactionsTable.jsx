import React, { useRef, useState } from "react";
import { Input, Table, Select, Radio } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import search from "../assets/search.svg";
import { parse } from "papaparse";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Papa from "papaparse"; // Make sure to import papaparse

const { Search } = Input;
const { Option } = Select;

const TransactionsTable = ({
  transactions = [], // Default to an empty array if undefined
  exportToCsv = () => {}, // Default function
  addTransaction = () => {}, // Default function
  fetchTransactions = () => {}, // Default function
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const fileInput = useRef();

  // Function to export transactions to CSV
  const handleExportToCsv = () => {
    const csv = Papa.unparse(transactions); // Convert the transactions array to CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transactions.csv";
    link.click();
  };

  function importFromCsv(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          // Now results.data is an array of objects representing your CSV rows
          for (const transaction of results.data) {
            console.log("Transactions", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseInt(transaction.amount, 10),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All Transactions Added");
      fetchTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
  ];

  const filteredTransactions = (transactions || []).filter((transaction) => {
    const searchMatch = searchTerm
      ? transaction.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const tagMatch = selectedTag ? transaction.tag === selectedTag : true;
    const typeMatch = typeFilter ? transaction.type === typeFilter : true;

    return searchMatch && tagMatch && typeMatch;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  const dataSource = sortedTransactions.map((transaction, index) => ({
    key: index,
    ...transaction,
  }));

  return (
    <div className="w-full px-8 sm:px-4">
      <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between md:items-center">
        <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded input-flex">
          <img src={search} className="w-4 h-4" alt="search icon" />
          <input
            className="flex-grow outline-none"
            placeholder="Search by Name"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
          className="w-full select-input md:w-48"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>

      <div className="my-table">
        <div className="flex flex-col w-full mb-4 md:flex-row md:justify-between md:items-center">
          <h2 className="mb-2 text-lg font-semibold md:mb-0">
            My Transactions
          </h2>
          <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-4 md:justify-start">
          <button
            className="px-4 py-2 bg-gray-300 rounded btn hover:bg-gray-400"
            onClick={handleExportToCsv} // Call the handleExportToCsv function here
          >
            Export to CSV
          </button>
          <label
            htmlFor="file-csv"
            className="px-4 py-2 text-white bg-blue-500 rounded cursor-pointer btn btn-blue hover:bg-blue-600"
          >
            Import from CSV
          </label>
          <input
            onChange={importFromCsv}
            id="file-csv"
            type="file"
            accept=".csv"
            required
            className="hidden"
          />
        </div>

        <Table className="w-full" columns={columns} dataSource={dataSource} />
      </div>
    </div>
  );
};

TransactionsTable.propTypes = {
  transactions: PropTypes.array,
  exportToCsv: PropTypes.func,
  addTransaction: PropTypes.func,
  fetchTransactions: PropTypes.func,
};

export default TransactionsTable;
