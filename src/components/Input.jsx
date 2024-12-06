import React from "react";
function Input({ label, state, setState, placeholder }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
        className="block w-full py-1 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
}
export default Input;
