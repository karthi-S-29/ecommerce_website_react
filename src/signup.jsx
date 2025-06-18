import React, { useState, useEffect } from 'react';
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cart:[]
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    axios.get('http://localhost:3000/datas')
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.error('Error fetching profile:', err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundUser = userData.find(
      (user) => user.email === formData.email
    );

    if (foundUser) {
      alert('This user already exists. Please log in.');
    } else {
      try {
        axios.post('http://localhost:3000/datas', formData);
        alert('Signup successful!');
        navigate('/sign_in');
      } catch (err) {
        console.error('Signup failed:', err);
        alert('Error submitting form');
      }
    }
  };

  return (
    <div className="login_container">
      <div className="login">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="login_fields">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Continue</button>
        </form>

        <p className="login_acc">
          Already have an account?
          <Link to="/sign_in"> Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
