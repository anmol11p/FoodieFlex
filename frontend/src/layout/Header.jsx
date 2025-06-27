import React, { useCallback, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { UserContext } from "../context/Userprovider";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, setToken } = useContext(UserContext);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-green-400" : "hover:text-green-300 transition";

  const handleLogout = useCallback(() => {
    localStorage.setItem("token", "");
    setToken("");
    setIsOpen(false);
  }, [setToken]);

  return (
    <header className="bg-gradient-to-r from-black/40 via-green-900/40 to-black/20 text-white fixed w-full z-30 shadow-md backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-green-300">🍴 MealBook</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-sm sm:text-base">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/menu" className={navLinkClass}>
            Menu
          </NavLink>
          <NavLink to="/orders" className={navLinkClass}>
            My Orders
          </NavLink>
          {!token ? (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink to="/signup" className={navLinkClass}>
                Signup
              </NavLink>
            </>
          ) : (
            <button onClick={handleLogout} className="cursor-pointer">
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? (
              <FiX className="text-2xl text-white" />
            ) : (
              <FiMenu className="text-2xl text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="w-full md:hidden bg-transparent shadow-md backdrop-blur-sm px-4 pb-4 pt-2 text-white flex flex-col gap-3 text-base transition-all duration-300 ease-in-out">
          <NavLink to="/" onClick={toggleMenu} className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/menu" onClick={toggleMenu} className={navLinkClass}>
            Menu
          </NavLink>
          <NavLink to="/orders" onClick={toggleMenu} className={navLinkClass}>
            My Orders
          </NavLink>
          {!token ? (
            <>
              <NavLink
                to="/login"
                onClick={toggleMenu}
                className={navLinkClass}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                onClick={toggleMenu}
                className={navLinkClass}
              >
                Signup
              </NavLink>
            </>
          ) : (
            <button onClick={handleLogout} className=" cursor-pointer">
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
