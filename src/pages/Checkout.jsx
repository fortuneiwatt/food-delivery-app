// src/pages/Checkout.jsx
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const cartCtx = useCart();
  const items = cartCtx?.items || cartCtx?.cartItems || cartCtx?.cart || [];
  const clearCart = cartCtx?.clearCart || (() => {});
  const navigate = useNavigate();

  const total = useMemo(
    () => items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 1), 0),
    [items]
  );

  function handlePay() {
    if (!items.length) return alert("Your cart is empty.");
    const orderId = Date.now().toString();
    const order = {
      id: orderId,
      items,
      total,
      status: "paid",
      createdAt: new Date().toISOString(),
      history: [{ at: Date.now(), status: "Paid" }],
    };
    const orders = JSON.parse(localStorage.getItem("orders") || "{}");
    orders[orderId] = order;
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("last_order_id", orderId);
    clearCart();
    navigate(`/payment/success/${orderId}`);
  }

  return (
    <div className="pt-24 px-4 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {!items.length ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y bg-white rounded-2xl shadow">
            {items.map((it, idx) => (
              <li key={idx} className="p-4 flex items-center gap-4">
                <img src={it.image} alt={it.name} className="w-16 h-16 object-cover rounded-lg" />
                <div className="flex-1">
                  <p className="font-semibold">{it.name}</p>
                  <p className="text-sm text-gray-500">Qty: {it.quantity || 1}</p>
                </div>
                <div className="font-bold">#{(it.price || 0) * (it.quantity || 1)}</div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-6">
            <span className="text-xl font-bold">Total: #{total}</span>
            <button
              onClick={handlePay}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white"
            >
              Pay Now
            </button>
          </div>
        </>
      )}
    </div>
  );
}
