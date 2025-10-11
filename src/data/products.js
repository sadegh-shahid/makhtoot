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
    images: [
      "/images/products/1.webp",
      "/images/products/1.webp",
      "/images/products/1.webp",
    ],
    desc: "فرش اصیل ایرانی با طرح لچک ترنج",
    summary: "این یک خلاصه سه خطی برای فرش دستباف تبریز است.\nاین فرش دارای طرح و رنگ زیبایی است.\nمناسب برای دکوراسیون منزل شما.",
    category: "carpets",
    artistId: "attarbashi",
    price: 1200,
  },
  {
    id: 2,
    name: "مینیاتور بزم شاهنامه",
    images: [
      "/images/products/2.webp",
      "/images/products/2.webp",
      "/images/products/2.webp",
    ],
    desc: "نگارگری الهام‌گرفته از فردوسی",
    summary: "این یک خلاصه سه خطی برای مینیاتور بزم شاهنامه است.\nاین مینیاتور دارای جزئیات دقیق و رنگ‌های زنده است.\nیک اثر هنری بی‌نظیر.",
    category: "miniatures",
    artistId: "samani",
    price: 850,
  },
  {
    id: 3,
    name: "کاسه سفالی لعاب فیروزه‌ای",
    images: [
      "/images/products/3.webp",
      "/images/products/3.webp",
      "/images/products/3.webp",
    ],
    desc: "دست‌ساز با لعاب سنتی",
    summary: "این یک خلاصه سه خطی برای کاسه سفالی است.\nاین کاسه با دست ساخته شده و دارای لعاب فیروزه‌ای است.\nزیبا و کاربردی.",
    category: "ceramics",
    artistId: "nikzad",
    price: 150,
  },
  {
    id: 4,
    name: "تابلو خوشنویسی نستعلیق",
    images: [
      "/images/products/4.webp",
      "/images/products/4.webp",
      "/images/products/4.webp",
    ],
    desc: "شعر حافظ با قلم نی",
    summary: "این یک خلاصه سه خطی برای تابلو خوشنویسی است.\nاین تابلو با خط نستعلیق نوشته شده است.\nیک هدیه مناسب برای دوست‌داران هنر.",
    category: "calligraphy",
    artistId: "samani",
    price: 420,
  },
];

export const auctions = [
  {
    id: 101,
    name: "قالیچه ابریشمی قم",
    images: [
      "/images/products/101.webp",
      "/images/products/101.webp",
      "/images/products/101.webp",
    ],
    desc: "قالیچه دستباف ابریشمی از قم با طرح درختی",
    startPrice: 1500,
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
  },
];
