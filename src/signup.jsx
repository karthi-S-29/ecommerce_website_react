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
    cart: []
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/datas')
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.error('Error fetching profile:', err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z ]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

    if (!nameRegex.test(formData.name)) {
      newErrors.name = "Name must be at least 3 letters long and contain only letters and spaces.";
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 6 characters long and include letters and numbers.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const foundUser = userData.find(user => user.email === formData.email);

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
        <form onSubmit={handleSubmit} noValidate>
          <div className="login_fields">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
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
