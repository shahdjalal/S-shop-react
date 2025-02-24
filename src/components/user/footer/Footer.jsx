import React from "react";
import style from  "./Footer.module.css";
import { Container } from "react-bootstrap";
import { FaCcVisa } from "react-icons/fa6";
import { FaCcAmazonPay } from "react-icons/fa"

export default function Footer() {
  return (
    <footer  className={`${style.footer}`}>
      <Container>
        <h2 className={`${style.logo}`}> S&Shop.</h2>

        <div  className={`${style.footerLinks}`}>
          <div className={`${style.footerColumn}`}>
            <h3>OUR STORES</h3>
            <ul>
              <li>New York</li>
              <li>London SF</li>
              <li>Cockfosters BP</li>
              <li>Los Angeles</li>
              <li>Chicago</li>
              <li>Las Vegas</li>
            </ul>
          </div>

          <div className={`${style.footerColumn}`}>
            <h3 >INFORMATION</h3>
            <ul>
              <li>About Store</li>
              <li>New Collection</li>
              <li>Woman Dress</li>
              <li>Contact Us</li>
              <li>Latest News</li>
              <li>Our Sitemap</li>
            </ul>
          </div>

          <div className={`${style.footerColumn}`}>
            <h3>USEFUL LINKS</h3>
            <ul>
              <li>Privacy Policy</li>
              <li>Returns</li>
              <li>Terms & Conditions</li>
              <li>Contact Us</li>
              <li>Latest News</li>
              <li>Our Sitemap</li>
            </ul>
          </div>

          <div className={`${style.footerColumn}`}>
            <h3>ABOUT THE STORE</h3>
            <p>STORE - worldwide fashion store since 1978. We sell over 1000+ branded products on our website.</p>
            <p>📍 451 Wall Street, USA, New York</p>
            <p>📞 Phone: (064) 332-1233</p>
          </div>
        </div>

        <div className={`${style.footerBottom}`}>
          <p>© 2025 S&Shop. All rights reserved.</p>
          <div className={`${style.paymentIcons}`}>
           
            <FaCcAmazonPay />
            <FaCcVisa />
          </div>
        </div>
      </Container>
    </footer>
  );
}
