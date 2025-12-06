import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { Hotel, Menu, X } from 'lucide-react'
import { useState } from 'react'

const PublicNavbar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleNavigation = (path) => {
    navigate(path)
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="navbar"
    >
      <div className="navbar-container">
        <Link to="/" className="logo">
          <Hotel className="logo-icon" />
          <span>Komal Garden</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/rooms" className="nav-link">Rooms</Link>
          <Link to="/gallery" className="nav-link">Gallery</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
        <button 
          onClick={() => window.open('https://wa.me/919742856923?text=Hello,%20I%20would%20like%20to%20book%20a%20room%20at%20Komal%20Garden.', '_blank')}
          className="btn-book-now desktop-only"
        >
          Book Now
        </button>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
          <button className="mobile-nav-link" onClick={() => handleNavigation('/')}>Home</button>
          <button className="mobile-nav-link" onClick={() => handleNavigation('/rooms')}>Rooms</button>
          <button className="mobile-nav-link" onClick={() => handleNavigation('/gallery')}>Gallery</button>
          <button className="mobile-nav-link" onClick={() => handleNavigation('/about')}>About</button>
          <button className="mobile-nav-link" onClick={() => handleNavigation('/contact')}>Contact</button>
          <button 
            className="btn-book-now mt-4"
            onClick={() => {
              window.open('https://wa.me/919742856923?text=Hello,%20I%20would%20like%20to%20book%20a%20room%20at%20Komal%20Garden.', '_blank');
              setIsOpen(false);
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.nav>
  )
}

export default PublicNavbar
