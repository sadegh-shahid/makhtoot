import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="pt-16 p-4 md:p-6 max-w-4xl mx-auto">
      <title>سبد خرید - گالری هنری پارسیان</title>
      <h1 className="text-2xl font-bold mb-6">سبد خرید شما</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 dark:text-gray-400">سبد خرید شما خالی است.</p>
          <Link to="/shop" className="mt-4 inline-block px-6 py-2 bg-[var(--brand)] text-white rounded">
            رفتن به فروشگاه
          </Link>
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-500">{item.price}$ x {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                    <p className="font-semibold">{(item.price * item.quantity).toFixed(2)}$</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                        حذف
                    </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <h2 className="text-xl font-bold">جمع کل: {total.toFixed(2)}$</h2>
            <button onClick={clearCart} className="px-6 py-2 bg-red-600 text-white rounded">
              خالی کردن سبد
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
