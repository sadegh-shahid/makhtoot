// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-10 p-6 text-center text-sm">
      <div className="flex justify-center gap-6 mb-4">
        <Link to="/about">درباره ما</Link>
        <Link to="/contact">تماس با ما</Link>
      </div>
      <p>© {new Date().getFullYear()} همه حقوق محفوظ است.</p>
    </footer>
  );
}
