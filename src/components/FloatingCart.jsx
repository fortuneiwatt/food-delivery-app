import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function FloatingCart() {
  const { cart } = useCart();

  if (cart.length === 0) return null;

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <Link
      to="/checkout"
      className="fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition flex items-center space-x-2"
    >
      <ShoppingCart size={24} />
      <span className="font-bold">{totalItems}</span>
    </Link>
  );
}
