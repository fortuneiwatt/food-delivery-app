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
    if (!email) {
      alert("Please enter a valid email.");
      return;
    }

    const templateParams = {
      email: email, // ✅ must match {{email}} in your EmailJS template
      to_name: user?.email || "Customer",
      order_id: order.id,
      order_total: order.total,
      items: `
        <table style="width:100%; border-collapse: collapse; font-family: Arial, sans-serif;">
          <thead>
            <tr>
              <th style="text-align:left; padding:8px; border-bottom:1px solid #ddd;">Item</th>
              <th style="text-align:center; padding:8px; border-bottom:1px solid #ddd;">Qty</th>
              <th style="text-align:right; padding:8px; border-bottom:1px solid #ddd;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${order.items
              .map(
                (it) => `
                <tr>
                  <td style="padding:8px; border-bottom:1px solid #eee;">${it.name}</td>
                  <td style="text-align:center; padding:8px; border-bottom:1px solid #eee;">${it.quantity || 1}</td>
                  <td style="text-align:right; padding:8px; border-bottom:1px solid #eee;">₦${(it.price || 0) * (it.quantity || 1)}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
      `,
    };

    emailjs
      .send("service_17vzitb", "template_rynitnh", templateParams, "Y_yWeoaJ7VS_7TRog")
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
