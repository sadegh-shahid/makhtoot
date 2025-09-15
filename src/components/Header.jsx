import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

export default function Header({ onMenuToggle, onLoginClick }) {
  const linkCls = ({ isActive }) =>
    `px-2 py-1 rounded ${isActive ? "text-[var(--brand)] font-semibold" : "text-gray-800 hover:text-[var(--brand)]"}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="max-w-6xl mx-auto flex items-center gap-3 p-3">
        {/* Mobile hamburger on left */}
        <button
          onClick={onMenuToggle}
          className="md:hidden w-10 h-10 rounded-lg border flex items-center justify-center"
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
          <NavLink to="/shop" className={linkCls}>فروشگاه</NavLink>
          <NavLink to="/auction" className={linkCls}>مزایده</NavLink>
          <NavLink to="/certificate" className={linkCls}>صدور شناسنامه</NavLink>
          <NavLink to="/about" className={linkCls}>درباره ما</NavLink>
          <NavLink to="/contact" className={linkCls}>تماس با ما</NavLink>
        </nav>

        {/* Login on far end */}
        <div className="mr-auto">
          <button onClick={onLoginClick} className="px-4 py-2 rounded-lg bg-[var(--brand)] text-white">ورود / ثبت‌نام</button>
        </div>
      </div>
    </header>
  );
}
