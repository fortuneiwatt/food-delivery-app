// src/pages/DeliveryConfirmation.jsx
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import emailjs from "emailjs-com";

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

  function sendEmailReceipt() {
    const templateParams = {
      to_email: email,
      to_name: user?.email || "Customer",
      order_id: order.id,
      order_total: order.total,
      items: order.items.map(it => `${it.name} x${it.quantity || 1}`).join(", "),
    };

    emailjs
      .send(
        "service_17vzitb",     // from EmailJS dashboard
        "template_rynitnh",    // from EmailJS dashboard
        templateParams,
        "Y_yWeoaJ7VS_7TRog"      // from EmailJS dashboard
      )
      .then(
        () => {
          setSent(true);
          // mark order completed
          const updated = { ...order, status: "Completed", emailedTo: email };
          const all = JSON.parse(localStorage.getItem("orders") || "{}");
          all[orderId] = updated;
          localStorage.setItem("orders", JSON.stringify(all));

          setTimeout(() => navigate("/"), 2000);
        },
        (err) => {
          console.error("EmailJS error:", err);
          alert("Failed to send email. Check console for details.");
        }
      );
  }

  return (
    <div className="pt-24 px-4 container mx-auto max-w-lg">
      <div className="bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold">Confirm Delivery</h1>
        <p className="text-gray-600 mt-1">
          Order <span className="font-mono">{orderId}</span> has been delivered.
        </p>

        <label className="block mt-6 text-sm mb-1">Email for receipt</label>
        <input
          type="email"
          className="w-full border rounded-lg px-3 py-2"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={sendEmailReceipt}
          disabled={!email || sent}
          className={`w-full mt-4 py-3 rounded-xl text-white ${
            email && !sent ? "bg-green-600" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {sent ? "Email Sent ✅" : "Confirm & Send Receipt"}
        </button>
      </div>
    </div>
  );
}
