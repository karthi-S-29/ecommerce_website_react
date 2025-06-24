// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store'; // ✅ since store.js is directly under src
import App from './App';
import './signup.css'; // ✅ main CSS
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter basename="/ecommerce_website_react">
      <App />
    </BrowserRouter>
  </Provider>
);
