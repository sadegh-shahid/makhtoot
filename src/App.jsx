import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./components/layout/Header";
import SideMenu from "./components/layout/SideMenu";
import LoginModal from "./components/auth/LoginModal";
import Footer from "./components/layout/Footer";
import { useBodyScrollLock } from "./hooks/useBodyScrollLock";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useBodyScrollLock(isMenuOpen || isAuthOpen);

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
        <Outlet />
      </main>

      <Footer />

      <LoginModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}
