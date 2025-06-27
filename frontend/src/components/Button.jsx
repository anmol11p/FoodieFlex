import React, { memo } from "react";

const Button = memo(({ name }) => {
  return (
    <button
      type="submit"
      className="group relative overflow-hidden px-6 py-2 font-semibold text-white border rounded-md cursor-pointer shadow-md hover:shadow-blue-500 transition-all duration-300"
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-green-700 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out opacity-80"></span>
      <span className="relative z-10">{name}</span>
    </button>
  );
});

export default Button;
