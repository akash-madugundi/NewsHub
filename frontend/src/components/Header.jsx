import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { CATEGORIES } from "../constants/categories";
import { COUNTRIES } from "../constants/countries";

function Dropdown({ title, items, basePath }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      style={{ position: "relative" }}
    >
      <Link to={basePath}>{title}</Link>

      {isOpen && (
        <ul className="dropdown">
          {items.map((item) => (
            <li key={item.value}>
              <Link
                to={`${basePath}/${item.value}`}
              >
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
  return (
    <header>
      <nav>
        <img
          src={logo}
          alt="NewsHub Logo"
          className="logo"
          style={{ width: "80px", height: "auto" }}
        />
        <h3>NewsHub</h3>
        <ul>
          <li>
            <Link to="/all-news">All News</Link>
          </li>
          <Dropdown title="Category" items={CATEGORIES} basePath="/category-news" />
          <Dropdown title="Country" items={COUNTRIES} basePath="/country-news" />
        </ul>
      </nav>
    </header>
  );
}

export default Header;
