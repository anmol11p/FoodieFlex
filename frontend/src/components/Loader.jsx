import React from "react";

const Loader = () => {
  return (
    <div className="grid place-items-center py-5">
      <div className="h-10 w-10 border-4 border-t-red-500 border-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
