import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          🍴 GlopatEateries
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-lg font-medium items-center">
          <Link to="/" className="hover:text-yellow-300 transition">
            Home
          </Link>
          <Link to="/checkout" className="hover:text-yellow-300 transition">
            Checkout
          </Link>

          {user ? (
            <>
              <span className="font-semibold">{user.email}</span>
              <button
                onClick={logout}
                className="bg-white text-red-500 px-3 py-1 rounded-lg hover:bg-red-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-white text-orange-600 px-3 py-1 rounded-lg hover:bg-orange-100 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu with Animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-6 pb-4 space-y-4 text-lg font-medium">
          <Link
            to="/"
            className="block hover:text-yellow-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/checkout"
            className="block hover:text-yellow-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Checkout
          </Link>

          {user ? (
            <>
              <span className="block font-semibold">{user.email}</span>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="bg-white text-red-500 px-3 py-1 rounded-lg hover:bg-red-100 transition w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block bg-white text-orange-600 px-3 py-1 rounded-lg hover:bg-orange-100 transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
