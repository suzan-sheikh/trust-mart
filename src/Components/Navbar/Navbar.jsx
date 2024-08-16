import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand Name */}
        <div className="text-white text-lg font-bold">
          <Link to="/">
            <img
              className=" w-16 rounded-lg  h-10"
              src="/src/assets/3.png"
              alt=""
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-grow mx-4">
          <select className="px-4 py-2 rounded-md border  rounded-r-none border-gray-300 focus:outline-none focus:border-blue-500">
            <option value="tshirt">T-shirt</option>
            <option value="pant">Pant</option>
            <option value="suit">Suit</option>
          </select>
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full  border-l-0 rounded-l-none px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Authentication and Cart as */}
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-white hover:text-gray-300">
            Login
          </Link>
          <Link to="/Signup" className="text-white hover:text-gray-300">
            Sign Up
          </Link>
        </div>
      </div>

      {/* Mobile View: Hamburger Menu */}
      <div className="md:hidden flex justify-between items-center mt-4">
          <select className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500">
            <option value="tshirt">T-shirt</option>
            <option value="pant">Pant</option>
            <option value="suit">Suit</option>
          </select>
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
    </nav>
  );
}

export default Navbar;
