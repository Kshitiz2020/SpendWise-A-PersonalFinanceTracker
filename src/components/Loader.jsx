import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-20 h-20 lds-ripple">
        <div className="absolute border-4 border-blue-500 border-solid rounded-full animate-ripple"></div>
        <div className="absolute delay-150 border-4 border-blue-500 border-solid rounded-full animate-ripple"></div>
      </div>
    </div>
  );
}

export default Loader;
