import React from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

export default function Header({ onMenuToggle, onLoginClick }) {
  const { cartItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const linkCls = ({ isActive }) =>
    `px-2 py-1 rounded ${isActive ? "text-[var(--brand)] font-semibold" : "text-gray-800 dark:text-gray-200 hover:text-[var(--brand)]"}`;

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div className="max-w-6xl mx-auto flex items-center gap-3 p-3">
        {/* Mobile hamburger on left */}
        <button
          onClick={onMenuToggle}
          className="md:hidden w-10 h-10 rounded-lg border flex items-center justify-center dark:text-white"
          aria-label="menu"
        >
          ☰
        </button>

        {/* Logo */}
        <div>
          <Logo />
        </div>

        {/* Desktop nav (right after logo) */}
        <nav className="hidden md:flex items-center gap-4 ml-6">
          <NavLink to="/" className={linkCls}>صفحه اصلی</NavLink>
          <NavLink to="/shop" className={linkCls}>فروشگاه</NavLink>
          <NavLink to="/auction" className={linkCls}>مزایده</NavLink>
          <NavLink to="/sell" className={linkCls}>فروش</NavLink>
          <NavLink to="/account" className={linkCls}>حساب کاربری</NavLink>
        </nav>

        {/* Login & Cart on far end */}
        <div className="mr-auto flex items-center gap-4">
          <Link to="/cart" className="relative dark:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </Link>
          <button onClick={toggleTheme} className="w-10 h-10 rounded-lg border flex items-center justify-center dark:text-white">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          {currentUser ? (
            <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-red-500 text-white">خروج</button>
          ) : (
            <button onClick={onLoginClick} className="px-4 py-2 rounded-lg bg-[var(--brand)] text-white">ورود / ثبت‌نام</button>
          )}
        </div>
      </div>
    </header>
  );
}
