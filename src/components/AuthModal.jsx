import { useEffect, useState } from "react";

function saveUser(user) {
  const users = JSON.parse(localStorage.getItem("demo_users") || "[]");
  users.push(user);
  localStorage.setItem("demo_users", JSON.stringify(users));
}

function checkUser(username, password) {
  const users = JSON.parse(localStorage.getItem("demo_users") || "[]");
  return users.find(u => u.username === username && u.password === password);
}

export default function AuthModal({ isOpen, mode = "login", onClose, onSuccess }) {
  const [tab, setTab] = useState(mode);

  useEffect(() => setTab(mode), [mode]);

  if (!isOpen) return null;

  function handleLogin(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const user = checkUser(data.username, data.password);
    if (user) {
      onClose();
      onSuccess?.(user);
      alert("ورود موفق");
    } else {
      alert("اطلاعات وارد شده اشتباه است یا حسابی وجود ندارد .");
    }
  }

  function handleSignup(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    if (data.password !== data.confirm) {
      alert("رمزها مطابقت ندارند");
      return;
    }
    saveUser({ username: data.username, password: data.password, name: data.name });
    onClose();
    alert("ثبت‌نام انجام شد ");
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-[96%] max-w-md rounded-xl p-5">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-2 rounded ${tab === "login" ? "bg-gray-900 text-white" : "bg-gray-100"}`}
          >
            ورود
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`flex-1 py-2 rounded ${tab === "signup" ? "bg-gray-900 text-white" : "bg-gray-100"}`}
          >
            ثبت‌نام
          </button>
        </div>

        {tab === "login" ? (
          <form onSubmit={handleLogin} className="space-y-3">
            <input name="username" required placeholder="ایمیل یا نام کاربری" className="w-full border p-2 rounded" />
            <input name="password" type="password" required placeholder="رمز عبور" className="w-full border p-2 rounded" />
            <div className="flex justify-between">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 rounded">بستن</button>
              <button type="submit" className="px-4 py-2 bg-[#b48c64] text-white rounded">ورود</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-3">
            <input name="name" required placeholder="نام و نام خانوادگی" className="w-full border p-2 rounded" />
            <input name="username" required placeholder="ایمیل یا نام کاربری" className="w-full border p-2 rounded" />
            <input name="password" type="password" required placeholder="رمز عبور" className="w-full border p-2 rounded" />
            <input name="confirm" type="password" required placeholder="تکرار رمز عبور" className="w-full border p-2 rounded" />
            <div className="flex justify-between">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 rounded">بستن</button>
              <button type="submit" className="px-4 py-2 bg-[#b48c64] text-white rounded">ثبت‌نام</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
