import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../../constants/categories";
import { COUNTRIES } from "../../constants/countries";
import { Menu, X } from "lucide-react";

function Dropdown({ title, items, basePath, isScrollable = false }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link className="text-white hover:text-gray-300 px-8 py-2 transition">
        {title}
      </Link>
      {isOpen && (
        <ul
          className={`absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden border border-gray-200 ${isScrollable ? 'max-h-60 overflow-y-auto' : ''} z-50`}
        >
          {items.map((item) => (
            <li key={item.value} className="hover:bg-gray-100 transition">
              <Link to={`${basePath}/${item.value}`} className="block px-4 py-2">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 shadow-lg py-4">
      <nav className="container mx-auto flex items-center justify-between px-6">
        <div className="flex items-center ml-6 space-x-5">
          <Link to="/">
            <img src="/logo.png" alt="NewsHub Logo" className="w-14 h-auto" />
          </Link>
          <h3 className="text-white text-2xl font-semibold">NewsHub</h3>
        </div>
        <ul className="hidden md:flex text-lg">
          <li className="px-8">
            <Link to="/all-news" className="text-white hover:text-gray-300 transition">
              All News
            </Link>
          </li>
          <Dropdown title="Category" items={CATEGORIES} basePath="/category-news" isScrollable={true} />
          <Dropdown title="Country" items={COUNTRIES} basePath="/country-news" isScrollable={true} />
        </ul>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 text-white py-4 absolute w-full z-50 shadow-lg">
          <ul className="flex flex-col items-center space-y-3">
            <li>
              <Link to="/all-news" className="text-white hover:text-gray-300 transition" onClick={() => setIsMenuOpen(false)}>
                All News
              </Link>
            </li>
            <Dropdown title="Category" items={CATEGORIES} basePath="/category-news" isScrollable={true} />
            <Dropdown title="Country" items={COUNTRIES} basePath="/country-news" isScrollable={true} />
          </ul>
        </div>
      )}

    </header>
  );
}

export default Header;