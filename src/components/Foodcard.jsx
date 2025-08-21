import { useCart } from "../context/CartContext";

export default function FoodCard({ name, price, image }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 hover:shadow-2xl">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-orange-500 font-bold mt-2">#{price}</p>
        <button
          onClick={() => addToCart({ name, price, image })}
          className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl shadow-md hover:opacity-90 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
