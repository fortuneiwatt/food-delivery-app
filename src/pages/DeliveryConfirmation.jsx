// src/pages/DeliveryConfirmation.jsx
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DeliveryConfirmation() {
  const { orderId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const orders = JSON.parse(localStorage.getItem("orders") || "{}");
  const order = orders[orderId];

  const [email, setEmail] = useState(user?.email || "");
  const [sent, setSent] = useState(false);

  if (!order) {
    return (
      <div className="pt-24 px-4 container mx-auto">
        <h2 className="text-2xl font-bold">Order not found</h2>
        <Link to="/" className="text-orange-600 underline">Go Home</Link>
      </div>
    );
  }

  function simulateEmailSend() {
    // mark as completed, "send" email (simulated)
    const updated = { ...order, status: "Completed", emailedTo: email, completedAt: new Date().toISOString() };
    const all = JSON.parse(localStorage.getItem("orders") || "{}");
    all[orderId] = updated;
    localStorage.setItem("orders", JSON.stringify(all));
    setSent(true);
    setTimeout(() => navigate("/"), 1500);
  }

  return (
    <div className="pt-24 px-4 container mx-auto max-w-lg">
      <div className="bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold">Confirm Delivery</h1>
        <p className="text-gray-600 mt-1">
          Order <span className="font-mono">{orderId}</span> has been delivered.
        </p>

        <label className="block mt-6 text-sm mb-1">Email for receipt/confirmation</label>
        <input
          type="email"
          className="w-full border rounded-lg px-3 py-2"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={simulateEmailSend}
          disabled={!email}
          className={`w-full mt-4 py-3 rounded-xl text-white ${email ? "bg-green-600" : "bg-gray-400 cursor-not-allowed"}`}
        >
          {sent ? "Sending..." : "Confirm & Send Email"}
        </button>

        <div className="mt-4 text-sm text-gray-500">
          (This demo simulates email sending. For real emails later, you can hook up EmailJS or a backend endpoint.)
        </div>
      </div>
    </div>
  );
}
