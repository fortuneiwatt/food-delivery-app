import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="pt-24 container mx-auto px-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          {cart.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">
                    {item.qty} × #{item.price}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.name)}
                className="text-red-500 font-medium hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-2xl font-bold text-center">
            Total: <span className="text-orange-500">#{total.toFixed(2)}</span>
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition">
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
