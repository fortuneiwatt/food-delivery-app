// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import CheckoutPage from "./pages/Checkout";
import FloatingCart from "./components/FloatingCart";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PaymentSuccess from "./pages/PaymentSuccess";
import OrderTracking from "./pages/OrderTracking";
import DeliveryConfirmation from "./pages/DeliveryConfirmation";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* new */}
            <Route path="/payment/success/:orderId" element={<PaymentSuccess />} />
            <Route path="/track/:orderId" element={<OrderTracking />} />
            <Route path="/confirm/:orderId" element={<DeliveryConfirmation />} />
          </Routes>
          <FloatingCart />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
