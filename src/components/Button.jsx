import React from "react";
function Button({ buttonLabel, onClick, isPrimary, disabled }) {
  return (
    <button
      buttonLabel={buttonLabel}
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-4 py-2 mt-4 text-lg font-semibold rounded-md focus:outline-none focus:ring-4 transition-all ${
        isPrimary
          ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-300" // Blue Button
          : "bg-green-500 text-white hover:bg-green-600 focus:ring-green-300" // Green Button
      }`}
    >
      {buttonLabel}
    </button>
  );
}

export default Button;
