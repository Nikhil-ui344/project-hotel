import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import PublicNavbar from './PublicNavbar'
import Footer from './Footer'

const Contact = () => {
  return (
    <div className="contact-page">
      <PublicNavbar />
      
      {/* Header */}
      <div className="page-header">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Contact Us
        </motion.h1>
        <p>
          We are here to assist you. Reach out to us for reservations, inquiries, or special requests.
        </p>
      </div>

      <div className="contact-container">
        <div className="contact-grid">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="contact-info"
          >
            <h2>
              Get in Touch
            </h2>
            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-icon-box">
                  <MapPin size={24} />
                </div>
                <div className="contact-details">
                  <h3>Address</h3>
                  <p>Chenduru (Thattihalli Cross)<br />Bangalore Hyderabad Road<br />Near Bagepalli, Chikkaballapura (D)</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon-box">
                  <Phone size={24} />
                </div>
                <div className="contact-details">
                  <h3>Phone</h3>
                  <p>+91 97391 22444<br />+91 70191 99999</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon-box">
                  <Mail size={24} />
                </div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <p>reservations@grandluxe.com<br />info@grandluxe.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon-box">
                  <Clock size={24} />
                </div>
                <div className="contact-details">
                  <h3>Hours</h3>
                  <p>Front Desk: 24/7<br />Concierge: 8:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="contact-form-container"
          >
            <h2>
              Send a Message
            </h2>
            <form className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" className="form-input" placeholder="John" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" className="form-input" placeholder="Doe" />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" className="form-input" placeholder="john@example.com" />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <select className="form-select">
                  <option>General Inquiry</option>
                  <option>Reservation</option>
                  <option>Event Hosting</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="4" className="form-textarea" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" className="submit-btn">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Contact
