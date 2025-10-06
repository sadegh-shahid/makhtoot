import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

export default function SideMenu({ isOpen, onClose, onOpenAuth }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // focus first focusable element
      const t = setTimeout(() => {
        panelRef.current?.querySelector("a,button,input")?.focus();
      }, 50);
      return () => {
        document.body.style.overflow = "";
        clearTimeout(t);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      {/* overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
      />

      {/* panel */}
      <aside
        ref={panelRef}
        className={`absolute top-0 right-0 h-full w-[84%] max-w-sm bg-white shadow-xl p-5 overflow-y-auto transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="font-bold text-lg">مزایده اثار هنری (ماه)</span>
          </div>
          <button onClick={onClose} aria-label="close menu" className="text-gray-600 p-2 -mr-2">✕</button>
        </div>

        <nav className="flex flex-col gap-3 text-base">
          <NavLink to="/shop" onClick={onClose}>فروشگاه</NavLink>
          <NavLink to="/auction" onClick={onClose}>مزایده</NavLink>
          <NavLink to="/certificate" onClick={onClose}>صدور شناسنامه</NavLink>
          <NavLink to="/about" onClick={onClose}>درباره ما</NavLink>
          <NavLink to="/contact" onClick={onClose}>تماس با ما</NavLink>
        </nav>

        <div className="my-6 border-t pt-4">
          <button
            onClick={() => { onOpenAuth?.(); onClose(); }}
            className="w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            ورود / ثبت‌نام
          </button>
        </div>
      </aside>
    </div>
  );
}
