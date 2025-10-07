import { useState } from "react";

export default function RequestForm() {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    if (!data.title || !data.name || !data.phone) {
      alert("لطفاً فیلدهای ضروری را پر کنید.");
      return;
    }
    setSubmitting(true);
    const reqs = JSON.parse(localStorage.getItem("register_requests") || "[]");
    reqs.push({ ...data, date: new Date().toISOString() });
    localStorage.setItem("register_requests", JSON.stringify(reqs));
    setSubmitting(false);
    e.target.reset();
    alert("درخواست شما ثبت شد (دمو).");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block mb-1 text-sm">عنوان اثر *</label>
        <input name="title" required className="w-full border p-2 rounded" placeholder="مثلاً: فرش تبریز اصیل" />
      </div>

      <div>
        <label className="block mb-1 text-sm">تصاویر اثر</label>
        <input name="photos" type="file" multiple className="w-full border p-2 rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block mb-1 text-sm">نام و نام خانوادگی *</label>
          <input name="name" required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block mb-1 text-sm">شماره تماس *</label>
          <input name="phone" required className="w-full border p-2 rounded" placeholder="09xxxxxxxxx" />
        </div>
      </div>

      <button disabled={submitting} className="w-full md:w-auto btn-primary">
        {submitting ? "در حال ثبت..." : "ثبت"}
      </button>
    </form>
  );
}
