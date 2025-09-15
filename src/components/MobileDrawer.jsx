import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export default function MobileDrawer({ open, onClose, onOpenAuth }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        className={`absolute top-0 right-0 h-full w-[84%] max-w-sm bg-white shadow-xl p-5 overflow-y-auto
                    transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">منو</h3>
          <button onClick={onClose} className="text-gray-600">✕</button>
        </div>

        <nav className="flex flex-col gap-3 text-base">
          <NavLink to="/shop" onClick={onClose}>فروشگاه</NavLink>
          <NavLink to="/auctions" onClick={onClose}>مزایده</NavLink>
          <NavLink to="/certificate" onClick={onClose}>صدور شناسنامه</NavLink>
          <NavLink to="/about" onClick={onClose}>درباره ما</NavLink>
          <NavLink to="/contact" onClick={onClose}>تماس با ما</NavLink>
        </nav>

        <div className="my-6 border-t pt-4 space-y-3">
          <button
            onClick={() => { onOpenAuth("login"); onClose(); }}
            className="w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            ورود / ثبت‌نام
          </button>
        </div>
      </aside>
    </div>
  );
}
