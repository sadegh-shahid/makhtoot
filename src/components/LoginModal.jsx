import React, { useEffect, useState } from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export default function LoginModal({ isOpen, mode = "login", onClose }) {
  const [tab, setTab] = useState(mode);

  useEffect(() => setTab(mode), [mode]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-[96%] max-w-md rounded-xl p-5 animate-fadeIn">
        <div className="flex gap-2 mb-4" role="tablist" aria-label="auth tabs">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-2 rounded ${
              tab === "login" ? "bg-[var(--brand)] text-white" : "bg-gray-100"
            }`}
          >
            ورود
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`flex-1 py-2 rounded ${
              tab === "signup" ? "bg-[var(--brand)] text-white" : "bg-gray-100"
            }`}
          >
            ثبت‌نام
          </button>
        </div>

        {tab === "login" ? <Login /> : <Signup />}

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 rounded"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}