import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-white shadow p-4 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500">
                    #{item.price} × {item.qty}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.name)}
                className="text-red-500 font-bold hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 text-xl font-bold">
            <span>Total:</span>
            <span>#{total}</span>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={clearCart}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Clear Cart
            </button>
            <Link
              to="/checkout"
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
