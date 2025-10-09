import React, { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

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
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Account = lazy(() => import("./pages/Account"));
const Sell = lazy(() => import("./pages/Sell"));


const LoadingFallback = () => (
  <div className="flex-1 flex items-center justify-center">
    <p>در حال بارگذاری...</p>
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const location = useLocation();

  // disable scroll when menu or auth is open
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (isMenuOpen || isAuthOpen) {
      root.classList.add("no-scroll");
      body.classList.add("no-scroll");
    } else {
      root.classList.remove("no-scroll");
      body.classList.remove("no-scroll");
    }
    return () => {
      root.classList.remove("no-scroll");
      body.classList.remove("no-scroll");
    };
  }, [isMenuOpen, isAuthOpen]);

  // Fix for mobile viewport height
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);

    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <div className="min-h-screen-dynamic flex flex-col" dir="rtl">
      <Header
        onMenuToggle={() => setIsMenuOpen(true)}
        onLoginClick={() => setIsAuthOpen(true)}
      />

      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenAuth={() => { setIsAuthOpen(true); setIsMenuOpen(false); }}
      />

      <main className={`flex-1 ${location.pathname !== "/" ? "pt-16" : ""}`}>
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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
            <Route path="/sell" element={<Sell />} />
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
