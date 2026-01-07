import { Hotel, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/logo-main-2.jpg" alt="Komal Garden" className="footer-logo-image" />
          </div>
          <p>
            Experience authentic multi-cuisine dining and comfortable accommodations. Where culinary excellence meets hospitality, creating unforgettable memories.
          </p>
        </div>
        <div>
          <h4 className="footer-heading">Contact</h4>
          <div className="footer-links">
            <p className="footer-contact-item"><MapPin className="footer-icon" /> Chenduru (Thattihalli Cross), Bangalore Hyderabad Road, Near Bagepalli, Chikkaballapura (D)</p>
            <p className="footer-contact-item"><Phone className="footer-icon" /> +91 97391 22444, +91 70191 99999</p>
            <p className="footer-contact-item"><Mail className="footer-icon" /> reservations@grandluxe.com</p>
          </div>
        </div>
        <div>
          <h4 className="footer-heading">Follow Us</h4>
          <div className="social-links">
            <a href="https://www.instagram.com/komal._.garden?igsh=MWpmZ2J5N3o4aHM5Yg==" target="_blank" rel="noopener noreferrer" className="social-link">
              <Instagram size={20} />
            </a>
            <a href="#" className="social-link"><Facebook size={20} /></a>
          </div>
        </div>
        <div>
          <h4 className="footer-heading">Newsletter</h4>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>Subscribe to receive exclusive offers and updates.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" className="newsletter-input" />
            <button className="newsletter-btn">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Komal Garden. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
