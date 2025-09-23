// src/data/products.js
export const categories = [
  { id: "carpets", title: "فرش‌ها" },
  { id: "miniatures", title: "مینیاتور" },
  { id: "ceramics", title: "سفالگری" },
  { id: "calligraphy", title: "خوشنویسی" },
];

export const artists = [
  { id: "attarbashi", name: "عطارباشی", bio: "هنرمند سنتی فرش و نگارگری" },
  { id: "samani", name: "سمانی", bio: "نگارگر و خوشنویس" },
  { id: "nikzad", name: "نیکزاد", bio: "سفالگر معاصر" },
];

export const products = [
  {
    id: 1,
    name: "فرش دستباف تبریز",
    image: "https://placehold.co/600x400?text=Tabriz+Carpet",
    desc: "فرش اصیل ایرانی با طرح لچک ترنج",
    category: "carpets",
    artistId: "attarbashi",
    price: 1200,
  },
  {
    id: 2,
    name: "مینیاتور بزم شاهنامه",
    image: "https://placehold.co/600x400?text=Shahnameh+Miniature",
    desc: "نگارگری الهام‌گرفته از فردوسی",
    category: "miniatures",
    artistId: "samani",
    price: 850,
  },
  {
    id: 3,
    name: "کاسه سفالی لعاب فیروزه‌ای",
    image: "https://placehold.co/600x400?text=Ceramic+Bowl",
    desc: "دست‌ساز با لعاب سنتی",
    category: "ceramics",
    artistId: "nikzad",
    price: 150,
  },
  {
    id: 4,
    name: "تابلو خوشنویسی نستعلیق",
    image: "https://placehold.co/600x400?text=Calligraphy",
    desc: "شعر حافظ با قلم نی",
    category: "calligraphy",
    artistId: "samani",
    price: 420,
  },
];
