import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function MobileDrawer({ open, onClose, onOpenAuth }) {
  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
          <div className="flex items-center justify-between">
            <NavLink to="/shop" onClick={onClose}>فروشگاه</NavLink>
            <Link to="/cart" className="relative" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>
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
            ورود
          </button>
        </div>
      </aside>
    </div>
  );
}
