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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '1rem' }}
        >
          <img 
            src="/logo-main-1.jpg" 
            alt="Komal Garden" 
            style={{ 
              maxWidth: '150px', 
              height: 'auto',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }} 
          />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Contact Us
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="page-subtitle"
        >
          We're here to help with reservations, inquiries, and special requests
        </motion.p>
      </div>

      {/* Contact Cards Grid */}
      <div className="section">
        <div className="container">
          <motion.div 
            className="rooms-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.15 }}
          >
            {/* Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="room-card"
              style={{ height: 'auto' }}
            >
              <div className="room-content" style={{ padding: '2.5rem', textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #8B6F47 0%, #D4A574 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: '0 8px 20px rgba(139, 111, 71, 0.3)'
                }}>
                  <MapPin size={40} color="white" />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2a1a12' }}>Our Location</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                  Chenduru (Thattihalli Cross)<br />
                  Bangalore Hyderabad Road<br />
                  Near Bagepalli<br />
                  Chikkaballapura District<br />
                  Karnataka, India
                </p>
              </div>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="room-card"
              style={{ height: 'auto' }}
            >
              <div className="room-content" style={{ padding: '2.5rem', textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #8B6F47 0%, #D4A574 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: '0 8px 20px rgba(139, 111, 71, 0.3)'
                }}>
                  <Phone size={40} color="white" />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2a1a12' }}>Call Us</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                  <a href="tel:+919739122444" style={{ color: '#8B6F47', textDecoration: 'none', fontWeight: '500' }}>
                    +91 97391 22444
                  </a><br />
                  <a href="tel:+917019199999" style={{ color: '#8B6F47', textDecoration: 'none', fontWeight: '500' }}>
                    +91 70191 99999
                  </a>
                </p>
                <p style={{ fontSize: '0.95rem', color: '#777', marginTop: '1rem' }}>Available 24/7 for assistance</p>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="room-card"
              style={{ height: 'auto' }}
            >
              <div className="room-content" style={{ padding: '2.5rem', textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #8B6F47 0%, #D4A574 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: '0 8px 20px rgba(139, 111, 71, 0.3)'
                }}>
                  <Mail size={40} color="white" />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2a1a12' }}>Email Us</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                  <a href="mailto:reservations@komalgarden.com" style={{ color: '#8B6F47', textDecoration: 'none', fontWeight: '500' }}>
                    reservations@komalgarden.com
                  </a>
                </p>
                <p style={{ fontSize: '0.95rem', color: '#777', marginTop: '1rem' }}>We'll respond within 24 hours</p>
              </div>
            </motion.div>

            {/* Hours Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="room-card"
              style={{ height: 'auto' }}
            >
              <div className="room-content" style={{ padding: '2.5rem', textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #8B6F47 0%, #D4A574 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: '0 8px 20px rgba(139, 111, 71, 0.3)'
                }}>
                  <Clock size={40} color="white" />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2a1a12' }}>Business Hours</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                  <strong>Restaurant:</strong><br />
                  7:30 AM - 10:30 PM<br /><br />
                  <strong>Front Desk:</strong><br />
                  24/7 Service
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Map Section */}
      <div className="section" style={{ paddingTop: '2rem', paddingBottom: '4rem', background: '#f8f8f8' }}>
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading"
            style={{ marginBottom: '2rem' }}
          >
            Find Us on Map
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
              height: '400px',
              maxWidth: '900px',
              margin: '0 auto'
            }}
          >
            <iframe 
              src="https://www.google.com/maps?q=13.71595475286034,77.78516818196616&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Komal Garden Location - Chenduru, Bangalore Hyderabad Road"
            ></iframe>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Contact
