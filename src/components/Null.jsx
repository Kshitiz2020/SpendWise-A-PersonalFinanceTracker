import React from "react";
import transactions from "../assets/transactions.svg";

function Null() {
  return (
    <div className="flex flex-col items-center justify-center w-full mb-8">
      <img src={transactions} className="my-16 w-96" alt="No Transactions" />
      <p className="text-lg text-center">You Have No Transactions Currently</p>
    </div>
  );
}

export default Null;
