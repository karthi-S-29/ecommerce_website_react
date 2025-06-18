import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './signup';
import Signin from './sign_in';
import Product from './product';
import Cart from './card';
import BuyPage from './buy';
import OrderHistory from './orderHistory';

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Navigate to="/sign_in" replace />} />

      {/* Auth Routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/sign_in" element={<Signin />} />

      {/* Product Routes */}
      <Route path="/product" element={<Product />} />
      <Route path="/products/:category" element={<Product />} />
      <Route path="/products/search/:keyword" element={<Product />} />

      {/* Cart & Checkout */}
      <Route path="/buy" element={<BuyPage />} />
      <Route path="/cart" element={<Cart />} />

      {/* Order History */}
      <Route path="/orders" element={<OrderHistory />} />
    </Routes>
  );
}

export default App;
