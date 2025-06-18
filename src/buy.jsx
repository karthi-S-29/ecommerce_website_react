import React, { useEffect, useState } from 'react';
import './buy.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BuyPage() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState({});
  const [selectedPayment, setSelectedPayment] = useState('COD');
  const [billingAddressOption, setBillingAddressOption] = useState('same');
  const [address, setAddress] = useState('');
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
const userName1=localStorage.getItem('userName')
  useEffect(() => {
    const email = localStorage.getItem('email');
    const mode = localStorage.getItem("buyMode");

    axios.get('http://localhost:3000/datas')
      .then(res => {
        const foundUser = res.data.find(u => u.email === email);
        if (foundUser) {
          setUser(foundUser);
          setAddress(foundUser.address || '');

          if (mode === "single") {
            const item = JSON.parse(localStorage.getItem("singleBuyItem"));
            const quantity = item.quantity || 1;
            setCartItems([{ ...item, quantity }]);
            setTotal(item.price * quantity);
          } else {
            const cart = foundUser.cart || [];
            const updatedCart = cart.map(item => ({
              ...item,
              quantity: item.quantity || 1
            }));
            setCartItems(updatedCart);
            const totalPrice = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
            setTotal(totalPrice);
          }
        }
      });
  }, []);

  const handlePlaceOrder = async () => {
    const mode = localStorage.getItem("buyMode");

    try {
      let updatedCart = user.cart || [];

      // If it's a single buy, remove only that item from cart
      if (mode === "single") {
        const singleItem = JSON.parse(localStorage.getItem("singleBuyItem"));
        updatedCart = updatedCart.filter(item => item.id !== singleItem.id);
      } else {
        // Buy all: clear entire cart
        updatedCart = [];
      }

      // Create a new order object
      const newOrder = {
        paymentMethod: selectedPayment.toUpperCase(),
        total: total.toFixed(2),
        address: address,
        date: new Date().toISOString(),
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        }))
      };

      // Update order history
      const updatedHistory = [...(user.order_history || []), newOrder];

      // Send PATCH request to update user data
      await axios.patch(`http://localhost:3000/datas/${user.id}`, {
        address: address,
        cart: updatedCart,
        order_history: updatedHistory
      });

      alert(`🎉 Order placed successfully via ${selectedPayment.toUpperCase()}!\nTotal: ₹${total.toFixed(2)}, Address: ${address}`);

      // Clear local state and storage
      setCartItems([]);
      setTotal(0);
      localStorage.removeItem("buyMode");
      localStorage.removeItem("singleBuyItem");

      navigate("/product");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("❌ Failed to complete the order. Try again.");
    }
  };

  return (
    <div className="buy-container">
      
      <div className="buy-left">
        <h3>Account</h3>
        <p>{user.email}</p>

        <h3>Ship to</h3>
        <p>{userName1}</p>
        <input
          type="text"
          placeholder="Enter shipping address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: '100%', padding: '10px', marginTop: '10px' }}
        />

        <h3>Shipping Method</h3>
        <p>Standard Shipping — <strong>FREE</strong></p>

        <h3>Payment</h3>
        <label>
          <input
            type="radio"
            name="payment"
            value="razorpay"
            checked={selectedPayment === 'razorpay'}
            onChange={(e) => setSelectedPayment(e.target.value)}
          />
          Razorpay Secure (UPI, Cards, Wallets)
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={selectedPayment === 'COD'}
            onChange={(e) => setSelectedPayment(e.target.value)}
          />
          Cash on Delivery
        </label>

        <h3>Billing Address</h3>
        <label>
          <input
            type="radio"
            name="billing"
            value="same"
            checked={billingAddressOption === 'same'}
            onChange={(e) => setBillingAddressOption(e.target.value)}
          />
          Same as shipping address
        </label>
        <label>
          <input
            type="radio"
            name="billing"
            value="different"
            checked={billingAddressOption === 'different'}
            onChange={(e) => setBillingAddressOption(e.target.value)}
          />
          Use a different billing address
        </label>

        <button className="complete-order-btn" onClick={handlePlaceOrder}>
          Complete Order
        </button>
      </div>

      <div className="buy-right">
        <h3>Order Summary</h3>
        <ul>
          {cartItems.map((item, i) => (
            <li key={i}>
              <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
              <br />
              <strong>{item.name}</strong><br />
              ₹{item.price} × {item.quantity}
            </li>
          ))}
        </ul>
        <hr />
        
        <p>Shipping: FREE</p>
        <h4>Total: ₹{total.toFixed(2)}</h4>
      </div>
    </div>
  );
}

export default BuyPage;
