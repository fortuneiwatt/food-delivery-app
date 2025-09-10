// src/pages/OrderTracking.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const STAGES = [
  "Order Placed",
  "Restaurant is Preparing",
  "Rider Assigned",
  "Picked Up",
  "On the way",
  "Arriving Soon",
  "Delivered",
];

export default function OrderTracking() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const orders = JSON.parse(localStorage.getItem("orders") || "{}");
  const order = orders[orderId];

  const [stageIndex, setStageIndex] = useState(() => {
    // resume progress if previously saved
    if (order?.trackingIndex != null) return order.trackingIndex;
    return 0;
  });

  const timerRef = useRef(null);

  const percent = useMemo(
    () => Math.round((stageIndex / (STAGES.length - 1)) * 100),
    [stageIndex]
  );

  useEffect(() => {
    if (!order) return;
    // move through stages every 4 seconds until delivered
    if (stageIndex < STAGES.length - 1) {
      timerRef.current = setTimeout(() => setStageIndex(i => i + 1), 4000);
    }
    // persist to localStorage
    const updated = { ...order, trackingIndex: stageIndex, status: STAGES[stageIndex] };
    const all = JSON.parse(localStorage.getItem("orders") || "{}");
    all[orderId] = updated;
    localStorage.setItem("orders", JSON.stringify(all));
    return () => clearTimeout(timerRef.current);
  }, [stageIndex, orderId]);

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
        <h1 className="text-2xl font-bold">Tracking Order <span className="font-mono">{orderId}</span></h1>
        <p className="mt-1 text-gray-600">Status: <span className="font-semibold">{STAGES[stageIndex]}</span></p>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-3 bg-gradient-to-r from-orange-500 to-red-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>0%</span><span>{percent}%</span><span>100%</span>
          </div>
        </div>

        {/* Timeline */}
        <ol className="mt-6 space-y-3">
          {STAGES.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <span
                className={`w-3 h-3 rounded-full ${
                  i <= stageIndex ? "bg-green-500" : "bg-gray-300"
                }`}
              />
              <span className={i <= stageIndex ? "font-semibold" : ""}>{s}</span>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex gap-3">
          <button
            disabled={stageIndex < STAGES.length - 1}
            onClick={() => navigate(`/confirm/${orderId}`)}
            className={`flex-1 py-3 rounded-xl text-white ${stageIndex < STAGES.length - 1 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"}`}
          >
            {stageIndex < STAGES.length - 1 ? "Waiting for delivery..." : "Confirm Delivery"}
          </button>
          <Link to="/" className="flex-1 py-3 rounded-xl text-center bg-blue-600 text-white">
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
