import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About</h4>
          <p>Contact Us</p>
          <p>About Us</p>
          <p>Careers</p>
          <p>Flipkart Stories</p>
        </div>

        <div className="footer-section">
          <h4>Help</h4>
          <p>Payments</p>
          <p>Shipping</p>
          <p>Cancellation & Returns</p>
          <p>FAQ</p>
        </div>

        <div className="footer-section">
          <h4>Consumer Policy</h4>
          <p>Return Policy</p>
          <p>Terms Of Use</p>
          <p>Security</p>
          <p>Privacy</p>
        </div>

        <div className="footer-section">
          <h4>Social</h4>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>YouTube</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MyShop by Karthi. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
