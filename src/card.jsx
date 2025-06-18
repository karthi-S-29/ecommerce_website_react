import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './card.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userEmail || !userId) {
      navigate("/sign_in");
      return;
    }

    axios.get(`http://localhost:3000/datas/${userId}`)
      .then((res) => {
        const user = res.data;
        if (user && user.cart) {
          const cartWithQuantities = user.cart.map(item => ({
            ...item,
            quantity: item.quantity || 1
          }));
          setCartItems(cartWithQuantities);
        } else {
          setCartItems([]);
        }
      })
      .catch(err => {
        console.error("Failed to fetch cart:", err);
        setCartItems([]);
      })
      .finally(() => setLoading(false));
  }, [userEmail, userId, navigate]);

  // ✅ SAFELY update only the cart field using PATCH
  const updateBackendCart = (updatedCart) => {
    axios.patch(`http://localhost:3000/datas/${userId}`, {
      cart: updatedCart
    })
    .then(() => setCartItems(updatedCart))
    .catch(err => console.error("Failed to update cart:", err));
  };

  const handleRemove = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    updateBackendCart(updatedCart);
  };

  const handleSingleBuy = (itemId) => {
    const selectedItem = cartItems.find(item => item.id === itemId);
    localStorage.setItem("buyMode", "single");
    localStorage.setItem("singleBuyItem", JSON.stringify(selectedItem));
    navigate('/buy');
  };

  const updateQuantity = (itemId, delta) => {
    const updatedCart = cartItems.map(item =>
      item.id === itemId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    updateBackendCart(updatedCart);
  };

  const handleBuyAll = () => {
    localStorage.setItem("buyMode", "all");
    navigate('/buy');
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading cart...</h2>;

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <h2 style={{padding:'10px'}}>Your cart is empty.</h2>
        <button onClick={() => navigate("/product")} className="buy-btn">Shop Now</button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h4>Your Cart</h4>
      <ul className="cart-list">
        {cartItems.map((item, index) => (
          <li key={index} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="cart-details">
              <h6>{item.name}</h6>
              <p>Price: ₹{item.price}</p>
              <div className="cart-buttons">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="quantity-btn"
                  disabled={item.quantity === 1}
                >−</button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="quantity-btn"
                >+</button>
              </div>
            </div>
            <div className="card-button">
              <button onClick={() => handleSingleBuy(item.id)} className="buy-btn">BUY</button>
              <button onClick={() => handleRemove(item.id)} className="remove-btn">Remove</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <h3>Total: ₹{totalPrice}</h3>
        <button onClick={handleBuyAll} className="buy-btn">Buy All</button>
      </div>
    </div>
  );
}

export default Cart;
