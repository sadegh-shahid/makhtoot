import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import LoginModal from "./components/LoginModal";
import Footer from "./components/Footer";
import ProductPage from "./pages/ProductPage";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Auction from "./pages/Auction";
import Certificate from "./pages/Certificate";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/auction" element={<Auction />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      <LoginModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}
