import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import images from '../images/logo2.JPG';
function Footer() {
  return (
    <footer class="footer">
  <div class="footerContainer">
    <div class="footerLogo">
      <img src={images} alt="Logo" />
    </div>
    
    <div class="footerLinks">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="#aboutUs">AboutUs </a></li>
        <li><a href="#">TermsOfService </a></li>
        <li><a href="#">PrivacyPolicy</a></li>
      </ul>
    </div>
    <div class="footerSocial">
      <h3>Follow Us</h3>
      <ul>
        <li><a href="#"><i><FaFacebook/></i></a></li>
        <li><a href="#"><i><FaTwitter /></i></a></li>
        <li><a href="#"><i><FaInstagram /></i></a></li>
        <li><a href="#"><i><FaLinkedin /></i></a></li>
      </ul>
    </div>
    <div className="footerContact">
      <h3>Contact Us</h3>
      <p> Email: info@yourstore.com</p>
      <p> Phone: +1-123-456-7890</p>
      <p> Address: 123 Main St, City, Country</p>
    </div>
  </div>
  <div className="footerCopyright">
    <p>&copy; 2024 Your Store. All rights reserved.</p>
  </div>
</footer>

  )
}

export default Footer
