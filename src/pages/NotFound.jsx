import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">404 - صفحه یافت نشد</h1>
      <p className="mb-4">ممکن است مسیر اشتباه باشد یا صفحه حذف شده باشد.</p>
      <Link to="/" className="text-[var(--brand)] hover:underline">بازگشت به خانه</Link>
    </main>
  );
}
