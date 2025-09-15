import React, { useEffect, useState } from "react";

function saveUser(user) {
  const users = JSON.parse(localStorage.getItem("demo_users") || "[]");
  users.push(user);
  localStorage.setItem("demo_users", JSON.stringify(users));
}

function checkUser(username, password) {
  const users = JSON.parse(localStorage.getItem("demo_users") || "[]");
  return users.find(u => u.username === username && u.password === password);
}

export default function LoginModal({ isOpen, mode = "login", onClose, onSuccess }) {
  const [tab, setTab] = useState(mode);

  useEffect(() => setTab(mode), [mode]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  if (!isOpen) return null;

  function handleLogin(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const user = checkUser(data.username, data.password);
    if (user) {
      onClose?.();
      onSuccess?.(user);
      alert("ورود موفق (دمو)");
    } else {
      alert("اطلاعات وارد شده اشتباه است یا حسابی وجود ندارد (دمو).");
    }
  }

  function handleSignup(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (data.password !== data.confirm) {
      alert("رمزها مطابقت ندارند");
      return;
    }
    saveUser({ username: data.username, password: data.password, name: data.name });
    onClose?.();
    alert("ثبت‌نام انجام شد (دمو)");
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-[96%] max-w-md rounded-xl p-5 animate-fadeIn">
        <div className="flex gap-2 mb-4" role="tablist" aria-label="auth tabs">
          <button onClick={() => setTab("login")} className={`flex-1 py-2 rounded ${tab === "login" ? "bg-[var(--brand)] text-white" : "bg-gray-100"}`}>ورود</button>
          <button onClick={() => setTab("signup")} className={`flex-1 py-2 rounded ${tab === "signup" ? "bg-[var(--brand)] text-white" : "bg-gray-100"}`}>ثبت‌نام</button>
        </div>

        {tab === "login" ? (
          <form onSubmit={handleLogin} className="space-y-3">
            <label htmlFor="username" className="block text-sm">ایمیل یا نام کاربری</label>
            <input id="username" name="username" required autoComplete="username" className="w-full border p-2 rounded" />

            <label htmlFor="password" className="block text-sm">رمز عبور</label>
            <input id="password" name="password" type="password" required autoComplete="current-password" className="w-full border p-2 rounded" />

            <div className="flex justify-between pt-2">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 rounded">بستن</button>
              <button type="submit" className="px-4 py-2 bg-[var(--brand)] text-white rounded">ورود</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-3">
            <label htmlFor="name" className="block text-sm">نام و نام خانوادگی</label>
            <input id="name" name="name" required className="w-full border p-2 rounded" />

            <label htmlFor="username-signup" className="block text-sm">ایمیل یا نام کاربری</label>
            <input id="username-signup" name="username" required className="w-full border p-2 rounded" />

            <label htmlFor="password-signup" className="block text-sm">رمز عبور</label>
            <input id="password-signup" name="password" type="password" required className="w-full border p-2 rounded" />

            <label htmlFor="confirm-signup" className="block text-sm">تکرار رمز عبور</label>
            <input id="confirm-signup" name="confirm" type="password" required className="w-full border p-2 rounded" />

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
