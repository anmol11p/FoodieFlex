import React, { useCallback, useContext, useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../api/Authentication";
import { UserContext } from "../context/Userprovider";
import Loader from "../components/Loader";
import Button from "../components/Button";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const { setToken, token } = useContext(UserContext);
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);
  const Navigate = useNavigate();
  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setLoader(true);
        const resp = await loginUser(formData);
        if (resp.status === 200) {
          localStorage.setItem("token", resp.data.token);
          setToken(resp.data.token);
          toast.success(resp.data.message);
          Navigate("/");
        }
      } catch (error) {
        switch (error.status) {
          case 400:
            toast.error(error.response.data.message);
            break;
          case 401:
            toast.error(error.response.data.message);
          default:
            break;
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
    <div className="relative text-white min-h-screen flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[url('assets/login.webp')] bg-cover bg-center blur-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
      </div>

      {/* Login Form */}
      <div className="relative z-20 p-6 sm:w-[400px] rounded-2xl border border-green-200 shadow-lg shadow-green-700/40 overflow-hidden">
        <form
          className="flex flex-col gap-5 z-20 relative"
          onSubmit={handleLogin}
        >
          <h2 className="text-2xl font-bold text-center mb-4">Welcome Back</h2>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              id="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 text-white bg-transparent border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              autoComplete="off"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 pr-10 text-white bg-transparent border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <span
              className="absolute right-2 top-9 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {!showPassword ? (
                <FiEyeOff className="w-6 h-6 text-white" />
              ) : (
                <FiEye className="w-6 h-6 text-white" />
              )}
            </span>
          </div>

          {/* Submit Button */}
          {loader ? <Loader /> : <Button name={"Login"} />}

          {/* Link to Register */}
          <p className="text-sm text-center mt-2">
            Don’t have an account?{" "}
            <NavLink to="/signup" className="text-blue-400 hover:underline">
              Register here
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
