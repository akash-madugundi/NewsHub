import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Bookmark, User, Menu, X, Plus } from "lucide-react";

function Header({ isAdmin = false }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/auth/sign-in";
  };

  return (
    <header className="bg-blue-600 shadow-lg py-4">
      <nav className="container mx-auto flex items-center justify-between px-6">
        <div className="flex items-center ml-6 space-x-5">
          <Link to={isAdmin ? "/admin" : "/news"}>
            <img src="/logo.png" alt="NewsHub Logo" className="w-14 h-auto" />
          </Link>
          <h3
            className="text-white text-3xl font-semibold"
            style={{ fontFamily: "Courier New, monospace" }}
          >
            NewsHub
          </h3>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        <ul className="hidden md:flex text-lg space-x-20 mr-15 items-center">
          {isAdmin &&
            <li>
              <Link
                to="/admin/add-news"
                className="text-white hover:text-gray-400 transition flex items-center cursor-pointer"
              >
                <Plus size={27} />
              </Link>
            </li>
          }
          <li>
            <Link
              to={isAdmin ? "/admin" : "/news"}
              className="text-white hover:text-gray-400 transition flex items-center cursor-pointer"
            >
              <Home size={27} />
            </Link>
          </li>
          {/* <li>
            <Link
              to="/news/read-later"
              className="text-white hover:text-gray-400 transition flex items-center cursor-pointer"
            >
              <Bookmark size={27} />
            </Link>
          </li> */}
          <li>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-white hover:text-gray-300 transition flex items-center cursor-pointer space-x-1 focus:outline-none"
            >
              <User size={27} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg overflow-hidden z-10">
                <Link
                  onClick={() => { setDropdownOpen(false); }}
                  to={isAdmin ? "/admin/profile" : "/news/profile"}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Sign Out
                </button>
              </div>
            )}
          </li>
        </ul>
      </nav>
      {menuOpen && (
        <div className="md:hidden bg-blue-600 w-full absolute top-16 left-0 z-10 shadow-lg">
          <ul className="flex flex-col items-center space-y-6 py-4">
            <li>
              <Link to={isAdmin ? "/admin" : "/news"} onClick={() => setMenuOpen(false)} className="text-white flex items-center space-x-2">
                <Home size={27} /> <span>Home</span>
              </Link>
            </li>
            {/* <li>
              <Link to="/news/read-later" onClick={() => setMenuOpen(false)} className="text-white flex items-center space-x-2">
                <Bookmark size={27} /> <span>Read Later</span>
              </Link>
            </li> */}
            <li className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-white flex items-center space-x-2">
                <User size={27} /> <span>Profile</span>
              </button>
              {dropdownOpen && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
                  <Link onClick={() => { setDropdownOpen(false); setMenuOpen(false); }} to={isAdmin ? "/admin/profile" : "/news/profile"} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Profile</Link>
                  <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Sign Out</button>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;