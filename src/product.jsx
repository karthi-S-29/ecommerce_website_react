import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './product.css';
import Navbar from './navbar';
import Footer from './footer';
import DarkVariantExample from './banner';

function Product() {
  const [productData, setProductData] = useState([]);
  const { category, keyword } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/Products')
      .then((res) => {
        let data = res.data;

        if (category) {
          data = data.filter(item =>
            item.category?.toLowerCase() === category.toLowerCase()
          );
        }

        if (keyword) {
          const search = keyword.toLowerCase();
          data = data.filter(item =>
            (item.name && item.name.toLowerCase().includes(search)) ||
            (item.brand && item.brand.toLowerCase().includes(search))
          );
        }

        setProductData(data);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  }, [category, keyword]);

  const addToCart = (product) => {
    const userEmail = localStorage.getItem('email');

    if (!userEmail) {
      alert("Please log in to add items to your cart.");
      navigate("/sign_in");
      return;
    }

    axios.get('http://localhost:3000/datas')
      .then((res) => {
        const users = res.data;
        const user = users.find(u => u.email === userEmail);

        if (!user) {
          alert("User not found.");
          return;
        }

        const userCart = user.cart;

        const existingItem = userCart.find(item => item.id === product.id);
        if (existingItem) {
          alert('Product already in cart.');
          return;
        }

        const updatedUser = {
          ...user,
          cart: [...userCart, { ...product, quantity: 1 }]
        };

        axios.put(`http://localhost:3000/datas/${user.id}`, updatedUser)
          .then(() => {
            alert('Product added to cart successfully!');
          })
          .catch((err) => {
            console.error('Error updating user cart:', err);
          });
      })
      .catch((err) => {
        console.error('Error fetching user data:', err);
      });
  };

  const handleSingleBuy = (itemId) => {
    const selectedItem = productData.find(item => item.id === itemId);
    if (!selectedItem) {
      alert("Product not found.");
      return;
    }

    localStorage.setItem("buyMode", "single");
    localStorage.setItem("singleBuyItem", JSON.stringify(selectedItem));
    navigate('/buy');
  };
// console.log('chech',productData)



  return (
    <>
      <div className="navbar  w-100">
        <Navbar />
      </div>

      <div className="banner w-100">
        <DarkVariantExample/>
      </div>
      
      <div className="fullproduct">
        {productData.length === 0 ? (
          <p style={{ padding: '20px', fontSize: '18px' }}>No products found.</p>
        ) : (
          productData.map((data) => (
            <div key={data.id} className="product-card">
              <img src={data.image} alt={data.name} className="product-image" />
              <h3>{data.name}</h3>
              <p>Brand: {data.brand}</p>
              <p>Category: {data.category}</p>
              <p><b>₹{data.price}</b></p>
              <div className="product-buttons">
                <button className="product-button" onClick={() => addToCart(data)}>ADD TO CART</button>
                <button onClick={() => handleSingleBuy(data.id)} className="buy-btn">BUY</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="footer">
        <Footer />
      </div>
    </>
  );
}

export default Product;
