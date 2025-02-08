import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white py-4 px-8 flex justify-between items-center z-50">
      <div className="text-2xl font-bold text-blue-600">Mindful</div>
      <div className="flex gap-8">
        <Link
          to="/about"
          className="text-gray-700 font-medium hover:text-blue-500 transition duration-300"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-gray-700 font-medium hover:text-blue-500 transition duration-300"
        >
          Contact Us
        </Link>
        <Link
          to="/emergency"
          className="text-gray-700 font-medium hover:text-red-500 transition duration-300"
        >
          Emergency Numbers
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
