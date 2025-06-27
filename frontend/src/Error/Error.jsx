import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

import errorAnimation from "../assets/404.json";
import Lottie from "lottie-react";
const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  if (!error || Object.keys(error).length === 0) return null;

  if (error.status === 404) {
    return (
      <section className="min-h-screen  z-10 relative flex items-center  justify-center bg-orange-500 px-4 w-full">
        <Lottie
          animationData={errorAnimation}
          loop={true}
          // style={{ height: 200 }}
        />
        <button
          onClick={() => navigate(-1)}
          className="absolute z-20 focus:outline-none text-blue-500 bg-white cursor-pointer  px-4 py-1.5 rounded-sm "
        >
          Go Back
        </button>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Oops! Something went wrong.
        </h2>
        <p className="text-gray-600 mb-6">
          {error.statusText || error.message}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    </section>
  );
};

export default ErrorPage;
