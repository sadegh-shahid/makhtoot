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

export const shopItems = [
  {
    id: 1,
    name: "فرش دستباف تبریز",
    image: "/images/product1.jpg",
    desc: "فرش اصیل ایرانی با طرح لچک ترنج",
    category: "carpets",
    artistId: "attarbashi",
    price: 1200,
  },
  {
    id: 2,
    name: "مینیاتور بزم شاهنامه",
    image: "/images/product2.jpg",
    desc: "نگارگری الهام‌گرفته از فردوسی",
    category: "miniatures",
    artistId: "samani",
    price: 850,
  },
  {
    id: 3,
    name: "کاسه سفالی لعاب فیروزه‌ای",
    image: "/images/product3.jpg",
    desc: "دست‌ساز با لعاب سنتی",
    category: "ceramics",
    artistId: "nikzad",
    price: 150,
  },
  {
    id: 4,
    name: "تابلو خوشنویسی نستعلیق",
    image: "/images/product4.jpg",
    desc: "شعر حافظ با قلم نی",
    category: "calligraphy",
    artistId: "samani",
    price: 420,
  },
];

export const auctions = [
  { id: 1, name: "تابلو شاهنامه", image: "/images/product2.jpg", desc: "اثر منتخب نگارگر", startPrice: 500, endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
  { id: 2, name: "ست سفالی", image: "/images/product3.jpg", desc: "دست‌ساز معاصر", startPrice: 100, endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) },
  { id: 3, name: "تابلو خوشنویسی", image: "/images/product4.jpg", desc: "نستعلیقِ استاد", startPrice: 300, endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
  { id: 4, name: "فرش نفیس", image: "/images/product1.jpg", desc: "فرش دستباف قدیمی", startPrice: 1000, endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) },
];
