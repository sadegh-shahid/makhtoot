// src/pages/Contact.jsx

export default function Contact() {
  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name")?.toString().trim();
    const phone = fd.get("phone")?.toString().trim();
    const message = fd.get("message")?.toString().trim();

    if (!name || !phone || !message) {
      alert("لطفاً همه فیلدها را پر کنید.");
      return;
    }

    const saved = JSON.parse(localStorage.getItem("contact_messages") || "[]");
    saved.push({ name, phone, message, date: new Date().toISOString() });
    localStorage.setItem("contact_messages", JSON.stringify(saved));

    e.currentTarget.reset();
    alert("پیام شما ثبت شد (دمو).");
  }

  return (
    <main className="pt-16 p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">تماس با ما</h1>
      <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded-lg shadow">
        <div>
          <label className="block text-sm mb-1">نام *</label>
          <input
            name="name"
            required
            className="w-full border p-2 rounded"
            placeholder="نام شما"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">شماره تماس *</label>
          <input
            name="phone"
            type="tel"
            required
            className="w-full border p-2 rounded"
            placeholder="09xxxxxxxxx"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">پیام *</label>
          <textarea
            name="message"
            rows={4}
            required
            className="w-full border p-2 rounded"
            placeholder="متن پیام شما"
          ></textarea>
        </div>
        <button type="submit" className="btn-primary">
          ارسال
        </button>
      </form>
    </main>
  );
}
