// src/pages/Certificate.jsx
import React, { useState } from "react";

export default function Certificate() {
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const title = fd.get("title")?.toString().trim();
    const name = fd.get("name")?.toString().trim();
    const phone = fd.get("phone")?.toString().trim();
    const files = Array.from(fd.getAll("photos"));

    if (!title || !name || !phone) {
      alert("لطفاً همه فیلدهای ضروری را پر کنید.");
      return;
    }

    setSending(true);

    // Convert files to base64 (no preview, demo storage)
    const toBase64 = (file) => new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result);
      reader.onerror = rej;
      reader.readAsDataURL(file);
    });

    const imagesBase64 = [];
    try {
      for (const f of files) {
        if (f && f.size) {
          imagesBase64.push(await toBase64(f));
        }
      }
    } catch (err) {
      console.error(err);
      alert("خطا در خواندن تصاویر.");
      setSending(false);
      return;
    }

    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem("certificate_requests") || "[]");
    saved.push({
      title,
      name,
      phone,
      images: imagesBase64,
      date: new Date().toISOString(),
    });
    localStorage.setItem("certificate_requests", JSON.stringify(saved));

    setSending(false);
    setDone(true);
    e.currentTarget.reset();
  }

  return (
    <main className="p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h1 className="text-2xl font-bold mb-4">درخواست صدور شناسنامه / ثبت اثر</h1>

          {done ? (
            <div className="p-4 bg-green-50 rounded">درخواست شما ثبت شد. متشکریم!</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">عنوان اثر *</label>
                <input name="title" required className="w-full border p-2 rounded" placeholder="مثلاً: فرش تبریز اصیل" />
              </div>

              <div>
                <label className="block text-sm mb-1">تصاویر اثر (چندتایی مجاز است)</label>
                <input name="photos" type="file" accept="image/*" multiple className="w-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1">نام *</label>
                  <input name="name" required className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="block text-sm mb-1">شماره تماس *</label>
                  <input name="phone" type="tel" required className="w-full border p-2 rounded" placeholder="09xxxxxxxxx" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button type="submit" disabled={sending} className="px-4 py-2 bg-[var(--brand)] text-white rounded">
                  {sending ? "در حال ارسال..." : "ثبت درخواست"}
                </button>
                <small className="text-gray-500 text-xs">اطلاعات موقتاً در مرورگر ذخیره می‌شود (دمو)</small>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
