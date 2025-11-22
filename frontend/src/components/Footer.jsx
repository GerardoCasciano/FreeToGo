import React from "react";
import "../assets/Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h2 className="footer-title">FreeToGo</h2>
          <p>
            La tua guida definitiva per scoprire e partecipare ai migliori
            eventi. Trova, condividi e vivi esperienze uniche.
          </p>
        </div>
        <div className="footer-section links">
          <h2 className="footer-title">Link Utili</h2>
          <ul>
            <li>
              <a href="/about">Chi Siamo</a>
            </li>
            <li>
              <a href="/contact">Contatti</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="footer-section social">
          <h2 className="footer-title">Seguici</h2>
          <div className="social-icons">
            <a href="https://facebook.com" aria-label="Facebook">
              Fb
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              Tw
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              In
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} FreeToGo. Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
