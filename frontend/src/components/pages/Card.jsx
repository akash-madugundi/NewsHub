import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Dropdown({ title, items, basePath, isScrollable = false }) {
  return (
    <ul
      className={`absolute mt-100 sm:right-30 lg:right-170 lg:mt-40 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden border border-gray-200 ${
        isScrollable ? "max-h-70 overflow-y-auto" : ""
      } z-50`}
    >
      {items.map((item) => (
        <li key={item.value} className="hover:bg-gray-100 transition">
          <Link to={`${basePath}/${item.value}`} className="block px-4 py-2">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Card({ image, title, items, basePath, isScrollable = false }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="relative group h-70 rounded-4xl shadow-lg hover:shadow-blue-300 overflow-hidden cursor-pointer border-2 border-blue-600 hover:border-blue-400 transition-all duration-300 transform hover:scale-105"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:opacity-91 transition-opacity duration-300"
        />
        <div className="absolute bottom-0 left-0 w-full p-3 flex justify-center bg-blue-600 backdrop-blur-lg">
          <h2
            className="text-white text-3xl font-bold"
            style={{ fontFamily: "Courier New, monospace" }}
          >
            {title}
          </h2>
        </div>
      </div>
      <div className="absolute left-0 w-full flex justify-center ">
        {isOpen && items && (
          <Dropdown
            title={title}
            items={items}
            basePath={basePath}
            isScrollable={isScrollable}
          />
        )}
      </div>
    </>
  );
}

export default Card;
