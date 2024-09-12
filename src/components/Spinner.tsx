import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen mt-[-10vh]">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Spinner;
