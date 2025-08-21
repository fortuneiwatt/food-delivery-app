import FoodCard from "../components/FoodCard"; // ✅ match file name (uppercase "C")

const foods = [
  { 
    name: "Cheese Burger", 
    price: 12000, 
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    name: "Pizza Margherita", 
    price: 7600, 
    image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2023/2/23/FNK_Indian-Fried-Chicken_s4x3.jpg.rend.hgtvcom.826.620.suffix/1677264108617.webp" 
  },
  { 
    name: "Fried Chicken", 
    price: 9000, 
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500&auto=format&fit=crop&q=60" 
  },
  { 
    name: "Tacos", 
    price: 6900, 
    image: "https://www.onceuponachef.com/images/2023/08/Beef-Tacos-760x570.jpg" 
  },
  { 
    name: "Sushi Platter", 
    price: 8900, 
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    name: "Pasta Carbonara", 
    price: 5000, 
    image: "https://www.cookingclassy.com/wp-content/uploads/2020/10/spaghetti-carbonara-01-600x900.jpg" 
  },
];

export default function HomePage() {
  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] sm:h-[60vh] flex items-center justify-center text-center text-white">
        <img
          src="https://images.unsplash.com/photo-1682778418768-16081e4470a1?w=800&auto=format&fit=crop&q=80"
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 px-4 sm:px-6">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Delicious food,{" "}
            <span className="text-yellow-400">delivered fast</span>
          </h1>
          <p className="text-base sm:text-lg mb-6 max-w-lg sm:max-w-2xl mx-auto">
            Order your favorite meals from the best restaurants near you 🍕🍔🍗
          </p>
          <a
            href="#menu"
            className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl shadow-lg hover:scale-105 transition"
          >
            Explore Menu
          </a>
        </div>
      </div>

      {/* Menu Section */}
      <div id="menu" className="container mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-orange-600">
          🍴 Our Specials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {foods.map((f, i) => (
            <FoodCard key={i} {...f} />
          ))}
        </div>
      </div>
    </div>
  );
}
