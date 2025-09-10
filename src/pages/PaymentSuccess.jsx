// src/pages/PaymentSuccess.jsx
import { Link, useParams, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const orders = JSON.parse(localStorage.getItem("orders") || "{}");
  const order = orders[orderId];

  if (!order) {
    return (
      <div className="pt-24 px-4 container mx-auto">
        <h2 className="text-2xl font-bold">Order not found</h2>
        <Link to="/" className="text-orange-600 underline">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 container mx-auto max-w-2xl">
      <div className="bg-white rounded-2xl shadow p-6">
        <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
        <p className="mt-2 text-gray-600">Order ID: <span className="font-mono">{order.id}</span></p>

        <h3 className="mt-6 font-semibold">Items</h3>
        <ul className="divide-y">
          {order.items.map((it, idx) => (
            <li key={idx} className="py-3 flex items-center gap-3">
              <img src={it.image} alt={it.name} className="w-12 h-12 rounded object-cover" />
              <div className="flex-1">
                <p className="font-medium">{it.name}</p>
                <p className="text-sm text-gray-500">Qty: {it.quantity || 1}</p>
              </div>
              <div className="font-semibold">#{(it.price || 0) * (it.quantity || 1)}</div>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-between font-bold">
          <span>Total</span>
          <span>#{order.total}</span>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate(`/track/${order.id}`)}
            className="flex-1 py-3 rounded-xl bg-blue-600 text-white"
          >
            Track your order
          </button>
          <button
            onClick={() => navigate(`/confirm/${order.id}`)}
            className="flex-1 py-3 rounded-xl bg-green-600 text-white"
          >
            Confirm delivery & email receipt
          </button>
        </div>
      </div>
    </div>
  );
}
