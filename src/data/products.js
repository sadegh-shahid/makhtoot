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
  // Regular Products
  {
    id: 1,
    name: "فرش دستباف تبریز",
    image: "https://placehold.co/600x400?text=Tabriz+Carpet",
    desc: "فرش اصیل ایرانی با طرح لچک ترنج",
    category: "carpets",
    artistId: "attarbashi",
    price: 1200,
    isAuction: false,
  },
  {
    id: 2,
    name: "مینیاتور بزم شاهنامه",
    image: "https://placehold.co/600x400?text=Shahnameh+Miniature",
    desc: "نگارگری الهام‌گرفته از فردوسی",
    category: "miniatures",
    artistId: "samani",
    price: 850,
    isAuction: false,
  },
  {
    id: 3,
    name: "کاسه سفالی لعاب فیروزه‌ای",
    image: "https://placehold.co/600x400?text=Ceramic+Bowl",
    desc: "دست‌ساز با لعاب سنتی",
    category: "ceramics",
    artistId: "nikzad",
    price: 150,
    isAuction: false,
  },
  {
    id: 4,
    name: "تابلو خوشنویسی نستعلیق",
    image: "https://placehold.co/600x400?text=Calligraphy",
    desc: "شعر حافظ با قلم نی",
    category: "calligraphy",
    artistId: "samani",
    price: 420,
    isAuction: false,
  },

  // Auction Items
  {
    id: 101,
    name: "قالیچه ابریشمی قم",
    image: "https://placehold.co/600x400?text=Silk+Rug",
    desc: "قالیچه دستباف ابریشمی از قم با طرح درختی. یک اثر هنری بی‌نظیر.",
    category: "carpets",
    artistId: "attarbashi",
    isAuction: true,
    startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Started 2 days ago
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // Ends in 5 days
    startPrice: 1500,
    currentBid: 1850,
    minIncrement: 50,
    reservePrice: 2000,
    buyNowPrice: 3500,
    bids: [
      { amount: 1500, bidderId: "user1", date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 100000) },
      { amount: 1600, bidderId: "user2", date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
      { amount: 1850, bidderId: "user1", date: new Date() },
    ],
  },
  {
    id: 102,
    name: "مخطوطه قدیمی",
    image: "https://placehold.co/600x400?text=Ancient+Manuscript",
    desc: "نسخه خطی از قرن ۱۲ هجری با تذهیب.",
    category: "calligraphy",
    artistId: "samani",
    isAuction: true,
    startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Starts in 3 days
    endTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // Ends in 10 days
    startPrice: 5000,
    currentBid: null,
    minIncrement: 200,
    reservePrice: 6000,
    buyNowPrice: null,
    bids: [],
  },
  {
    id: 103,
    name: "مجسمه برنزی دوران معاصر",
    image: "https://placehold.co/600x400?text=Bronze+Statue",
    desc: "اثر هنرمند معاصر با الهام از فرم‌های طبیعی.",
    category: "ceramics",
    artistId: "nikzad",
    isAuction: true,
    startTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Started yesterday
    endTime: new Date(Date.now() + 1 * 60 * 60 * 1000), // Ends in 1 hour
    startPrice: 500,
    currentBid: 500,
    minIncrement: 25,
    reservePrice: 500,
    buyNowPrice: 1200,
    bids: [{ amount: 500, bidderId: "user3", date: new Date() }],
  },
];

// For simplicity, we can have a single export now
export const items = products;
export const auctions = products.filter(p => p.isAuction);
export const shopItems = products.filter(p => !p.isAuction);
