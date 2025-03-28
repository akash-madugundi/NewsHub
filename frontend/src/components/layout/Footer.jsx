import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white py-6 mt-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold">NewsHub</h2>
          <p className="text-sm text-gray-200 mt-1">Your daily source of news updates.</p>
        </div>

        <ul className="flex space-x-6 mt-4 md:mt-0">
          <li>
            <Link to="/about" className="hover:text-gray-300 transition">About Us</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-300 transition">Contact</Link>
          </li>
          <li>
            <Link to="/privacy" className="hover:text-gray-300 transition">Privacy Policy</Link>
          </li>
        </ul>

        <div className="text-sm text-gray-300 mt-4 md:mt-0 text-center md:text-right">
          <p>&copy; 2025 NewsHub. All rights reserved.</p>
          <p className="text-gray-400 text-xs mt-1">Designed & Developed by <span className="font-semibold text-white">Madugundi Akash</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;