import "../assets/Footer.css";
import "bootstrap-icons/font/bootstrap-icons.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section ">
          <h2 className=" fs-3 mt-5 m-5">FreeToGo</h2>
          <p className="fs-6">
            La tua guida definitiva per scoprire e partecipare ai migliori
            eventi. Trova, condividi e vivi esperienze uniche.
          </p>
        </div>

        <div className="footer-section links">
          <h2 className=" fs-3 mt-5">Link Utili</h2>
          <ul>
            <li>
              <a href="/about" className="fs-6">
                Chi Siamo
              </a>
            </li>
            <li>
              <a href="/contact" className="fs-6">
                Contatti
              </a>
            </li>
            <li>
              <a href="/faq" className="fs-6">
                FAQ
              </a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
          </ul>
        </div>

        <div className="footer-section social">
          <h2 className=" fs-3 mt-5">Seguici</h2>
          <div className="social-icons">
            <a href="https://facebook.com" aria-label="Facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://linkedin.com" aria-label="Linkedin">
              <i className="bi bi-linkedin"></i>
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom text-center">
        <p>
          &copy; {new Date().getFullYear()} FreeToGo. Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
