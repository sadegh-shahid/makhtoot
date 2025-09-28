import React from "react";
import { useForm } from "react-hook-form";

export default function MiniRequestForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    const toBase64 = (file) =>
      new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result);
        reader.onerror = rej;
        reader.readAsDataURL(file);
      });

    const imagesBase64 = [];
    try {
      for (const f of data.photos) {
        if (f && f.size) imagesBase64.push(await toBase64(f));
      }
    } catch (err) {
      console.error(err);
      alert("خطا در بارگذاری تصاویر.");
      return;
    }

    const saved = JSON.parse(localStorage.getItem("mini_register_requests") || "[]");
    saved.push({
      title: data.title,
      name: data.name,
      phone: data.phone,
      images: imagesBase64,
      date: new Date().toISOString(),
      source: "mini",
    });
    localStorage.setItem("mini_register_requests", JSON.stringify(saved));

    reset();
    alert("درخواست سریع شما ثبت شد (دمو).");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="block text-sm mb-1">عنوان اثر *</label>
        <input {...register("title", { required: "عنوان اثر الزامی است" })} className="w-full border p-2 rounded" placeholder="مثلاً: فرش تبریز اصیل" />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
      </div>
      <div>
        <label className="block text-sm mb-1">تصاویر اثر (اختیاری)</label>
        <input {...register("photos")} type="file" accept="image/*" multiple className="w-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm mb-1">نام *</label>
          <input {...register("name", { required: "نام الزامی است" })} className="w-full border p-2 rounded" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">شماره تماس *</label>
          <input
            {...register("phone", {
              required: "شماره تماس الزامی است",
              pattern: {
                value: /09[0-9]{9}/,
                message: "شماره تماس معتبر نیست"
              }
            })}
            type="tel"
            className="w-full border p-2 rounded"
            placeholder="09xxxxxxxxx"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button type="submit" className="px-4 py-2 bg-[var(--brand)] text-white rounded">ارسال درخواست</button>
        <small className="text-gray-500 text-xs">ارسال به صورت دمو</small>
      </div>
    </form>
  );
}
