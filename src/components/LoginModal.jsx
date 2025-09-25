import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";

export default function LoginModal({ isOpen, mode = "login", onClose }) {
  const [tab, setTab] = useState(mode);
  const { login, signup } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { register: registerSignup, handleSubmit: handleSubmitSignup, formState: { errors: errorsSignup }, reset: resetSignup } = useForm();

  useEffect(() => {
    setTab(mode);
    reset();
    resetSignup();
  }, [mode, isOpen, reset, resetSignup]);

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

  const onLoginSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      onClose();
    } catch (error) {
      console.error("Failed to log in", error);
      alert(`Failed to log in: ${error.message}`);
    }
  };

  const onSignupSubmit = async (data) => {
    try {
      await signup(data.email, data.password, data.role);
      onClose();
    } catch (error) {
      console.error("Failed to sign up", error);
      alert(`Failed to sign up: ${error.message}`);
    }
  };

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
          <button onClick={() => setTab("login")} className={`flex-1 py-2 rounded ${tab === "login" ? "bg-[var(--brand)] text-white" : "bg-gray-100"}`}>ورود</button>
          <button onClick={() => setTab("signup")} className={`flex-1 py-2 rounded ${tab === "signup" ? "bg-[var(--brand)] text-white" : "bg-gray-100"}`}>ثبت‌نام</button>
        </div>

        {tab === "login" ? (
          <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-3">
            <label className="block text-sm">Email</label>
            <input {...register("email", { required: true })} type="email" className="w-full border p-2 rounded" />
            {errors.email && <p className="text-red-500 text-xs">Email is required.</p>}

            <label className="block text-sm">Password</label>
            <input {...register("password", { required: true })} type="password" className="w-full border p-2 rounded" />
            {errors.password && <p className="text-red-500 text-xs">Password is required.</p>}

            <div className="flex justify-between pt-2">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 rounded">بستن</button>
              <button type="submit" className="px-4 py-2 bg-[var(--brand)] text-white rounded">ورود</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmitSignup(onSignupSubmit)} className="space-y-3">
            <label className="block text-sm">Email</label>
            <input {...registerSignup("email", { required: true })} type="email" className="w-full border p-2 rounded" />
            {errorsSignup.email && <p className="text-red-500 text-xs">Email is required.</p>}

            <label className="block text-sm">Password</label>
            <input {...registerSignup("password", { required: true, minLength: 6 })} type="password" className="w-full border p-2 rounded" />
            {errorsSignup.password && <p className="text-red-500 text-xs">Password must be at least 6 characters.</p>}

            <label className="block text-sm">Role</label>
            <select {...registerSignup("role", { required: true })} className="w-full border p-2 rounded">
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>

            <div className="flex justify-between pt-2">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 rounded">بستن</button>
              <button type="submit" className="px-4 py-2 bg-[var(--brand)] text-white rounded">ثبت‌نام</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}