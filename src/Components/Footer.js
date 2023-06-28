import React from 'react';
import './Footer.css';
import instagramIcon from '../images/insta.jpeg';
import whatsappIcon from '../images/WA.jpeg';
import twitterIcon from '../images/twitter.jpeg';
import facebookIcon from '../images/facebook.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="contact-info">
          <h3>Contact Us</h3>
          <p>Phone: 123-456-7890</p>
          <p>Email: info@example.com</p>
        </div>
        <div className="social-icons">
          <a href="https://www.instagram.com"><img src={instagramIcon} alt="Instagram" /></a>
          <a href="https://www.whatsapp.com"><img src={whatsappIcon} alt="WhatsApp" /></a>
          <a href="https://www.twitter.com"><img src={twitterIcon} alt="Twitter" /></a>
          <a href="https://www.facebook.com"><img src={facebookIcon} alt="Facebook" /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
