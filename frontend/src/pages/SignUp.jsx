import React, { useCallback, useContext, useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/Userprovider";
import { userRegistration } from "../api/Authentication";
import Loader from "../components/Loader";
import Button from "../components/Button";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    password: "",
  });

  const { token, setToken } = useContext(UserContext);
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleRegister = useCallback(
    async (e) => {
      e.preventDefault();
      const { fullname, phone, email, password } = formData;
      const dataTosend = { fullname, phone, email, password };

      try {
        setLoader(true);
        const resp = await userRegistration(dataTosend);
        if (resp.status === 201) {
          localStorage.setItem("token", resp.data.token);
          setToken(resp.data.token);
          toast.success(resp.data.message);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          const Errors = error.response.data.errors;
          if (Array.isArray(Errors)) {
            Errors.map((err) => {
              toast.error(err.message);
              return;
            });
          } else {
            toast.error(error.response.data.message);
          }
        }
      } finally {
        setLoader(false);
      }
    },
    [formData, setToken, Navigate]
  );

  useEffect(() => {
    if (token) {
      Navigate("/");
    }
  }, [token, Navigate]);

  return (
    <div className="text-white min-h-screen flex items-center justify-center relative">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[url('assets/registrationImg.webp')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 backdrop-blur-lg"></div>
      </div>

      {/* Form Container */}
      <div className="relative z-20 p-6 sm:w-[400px] rounded-2xl border border-green-200 shadow-lg shadow-green-700/40 overflow-hidden">
        <form
          className="flex flex-col gap-5 z-20 relative"
          onSubmit={handleRegister}
        >
          <h2 className="text-2xl font-bold text-center mb-2">
            Create an Account
          </h2>

          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              id="name"
              autoComplete="off"
              placeholder="John Doe"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full p-2 text-white border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-transparent"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              autoComplete="off"
              placeholder="9876543210"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 text-white border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 text-white border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-transparent"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="••••••••"
              value={formData.password}
              autoComplete="off"
              onChange={handleChange}
              className="w-full p-2 pr-10 text-white border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-transparent"
            />
            <span
              className="absolute right-2 top-9 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <FiEyeOff className="w-6 h-6 text-white" />
              ) : (
                <FiEye className="w-6 h-6 text-white" />
              )}
            </span>
          </div>

          {/* Submit Button */}
          {loader ? <Loader /> : <Button name={"Registration"} />}

          <p className="text-sm text-center mt-2">
            Already have an account?{" "}
            <NavLink to="/login" className="text-green-400 hover:underline">
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
