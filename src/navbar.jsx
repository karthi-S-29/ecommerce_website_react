import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './navbar.css';
import Sidebar from './sidenavbar';
import Cart from './card';
import { CgProfile } from "react-icons/cg";
import axios from 'axios';

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("email");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    axios.get('http://localhost:3000/datas')
      .then(res => {
        const user = res.data.find(u => u.email === userEmail);
        setCartCount(user?.cart.length || 0);
      })
      .catch(() => setCartCount(0));
  }, [userEmail]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim().toLowerCase();
    if (trimmed) navigate(`/products/search/${encodeURIComponent(trimmed)}`);
  };

  return (
    <nav>
      <div onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="myshop">
        <Link to="/product" style={{textDecoration:'none'}}>🛍️ MyShop</Link>
      </div>

      <div className="nav-middle">
        <form onSubmit={handleSearch} className="nav-search-form">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div className="profile" onClick={() => setShowProfile(!showProfile)}>
          <CgProfile />
          {showProfile && (
            <div className="profilepage">
              <p>Welcome, {userName}</p>
              <p>Email: {userEmail}</p>
              <p><Link to="/orders">Order History</Link></p>
              <button onClick={() => {
        localStorage.clear();         
        setShowProfile(false); 
        navigate("/sign_in"); }} className="signout-btn">
        Sign Out
      </button>
            </div>
          )}
        </div>

        <div className="newcard" onClick={() => setIsCartOpen(!isCartOpen)}>
          🛒 Cart
          <span>{cartCount}</span>
        </div>

        <div className={`cardpage ${isCartOpen ? 'open' : ''}`}>
          <Cart />
        </div>
      </div>

      <div className="sidenavbar">
        <Sidebar />
      </div>
    </nav>
  );
}

export default Navbar;
