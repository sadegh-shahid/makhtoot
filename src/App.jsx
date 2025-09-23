import React, { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import LoginModal from "./components/LoginModal";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Auction = lazy(() => import("./pages/Auction"));
const Certificate = lazy(() => import("./pages/Certificate"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const LoadingFallback = () => (
  <div className="flex-1 flex items-center justify-center">
    <p>در حال بارگذاری...</p>
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // disable scroll when menu or auth is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen || isAuthOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isMenuOpen, isAuthOpen]);

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header
        onMenuToggle={() => setIsMenuOpen(true)}
        onLoginClick={() => setIsAuthOpen(true)}
      />

      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenAuth={() => { setIsAuthOpen(true); setIsMenuOpen(false); }}
      />

      <main className="flex-1 pt-16">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/auction" element={<Auction />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/certificate" element={<Certificate />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />

      <LoginModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}
