import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './orderHistory.css'; 
import Navbar from './navbar';
import Footer from './footer';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    axios.get('http://localhost:3000/datas')
      .then((res) => {
        const user = res.data.find(u => u.email === userEmail);
        if (user && user.order_history) {
          setOrders(user.order_history);
        } else {
          setOrders([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch order history:", err);
        setLoading(false);
      });
  }, [userEmail]);

  return (
    <>
      <Navbar />
      <div className="order-history-container">
        <h2>🧾 Your Order History</h2>
        {loading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <p>You haven't placed any orders yet.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="order-card">
              <h4>Order #{index + 1}</h4>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
              <p><strong>Payment:</strong> {order.paymentMethod}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Total:</strong> ₹{Number(order.total).toFixed(2)}</p>
              <h5>Items:</h5>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i} className="order-item">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '60px', height: '60px', marginRight: '10px', borderRadius: '5px' }} 
                    />
                    {item.name} - ₹{item.price} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
}

export default OrderHistory;
