import React, { useEffect, useState } from 'react';
import './signup.css'; // reuse your CSS
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState([]);
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

  const handleLogin=(e)=>{
     e.preventDefault();

     const foundUser = userData.find(
      (user) => user.email === email && user.password === password
    );

    console.log(foundUser)
    

    if (foundUser) {
      alert('Login successful! Welcome, ' + foundUser.name);
      localStorage.setItem("email", foundUser.email);
      localStorage.setItem("userId", foundUser.id);
      localStorage.setItem("userName", foundUser.name);
      
      navigate('/product')
    } else {
      alert('Invalid email or password.');
    }

  }

  

    
  

  

  return (
    <div className="login_container">
      <div className="login">
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="login_fields">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>

        <p className="login_acc">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;

















































































































































// function Signin() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.get('http://localhost:3000/datas', {
//         params: { email, password }
//       });
//       console.log(response.data)
//       if (response.data.length > 0) {
//         alert('Login successful! Welcome, ' + response.data[0].name);
//         navigate('/home'); // change to your app’s protected route
//       } else {
//         alert('Invalid email or password.');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       alert('Error submitting form.');
//     }
//   };

//   return (
//     <div className="login_container">
//       <div className="login">
//         <h1>Sign In</h1>
//         <form onSubmit={handleLogin}>
//           <div className="login_fields">
//             <input
//               type="email"
//               placeholder="Your Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Login</button>
//         </form>

//         <p className="login_acc">
//           Don't have an account? <Link to="/signup">Sign up</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signin;
