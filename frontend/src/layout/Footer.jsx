import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-black/80 via-green-900/80 to-black/80 text-white py-6 mt-auto shadow-inner">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-center">
        {/* Left: Copyright */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MealBook App. All rights reserved.
        </p>

        {/* Right: Links */}
        <div className="text-sm space-x-4">
          <NavLink
            to="/privacypolicy"
            className="hover:text-green-300 transition duration-200"
          >
            Privacy Policy
          </NavLink>
          <NavLink
            to="/terms"
            className="hover:text-green-300 transition duration-200"
          >
            Terms of Use
          </NavLink>
          <NavLink
            to="/contact"
            className="hover:text-green-300 transition duration-200"
          >
            Contact Us
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
