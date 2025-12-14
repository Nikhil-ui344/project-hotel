import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
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
          <span className="logo-text">Komal Garden</span>
          <span className="logo-tagline">Luxury Hotel</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/restaurant" className="nav-link">Restaurant</Link>
          <Link to="/rooms" className="nav-link">Rooms</Link>
          <Link to="/gallery" className="nav-link">Gallery</Link>
          <Link to="/party-hall" className="nav-link">Party Hall</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Backdrop */}
        {isOpen && <div className="mobile-menu-backdrop" onClick={() => setIsOpen(false)} />}

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
          <button className="mobile-nav-link" onClick={() => handleNavigation('/')}>Home</button>
          <button className="mobile-nav-link" onClick={() => handleNavigation('/about')}>About</button>
          <button className="mobile-nav-link" onClick={() => handleNavigation('/restaurant')}>Restaurant</button>
          <button className="mobile-nav-link" onClick={() => handleNavigation('/rooms')}>Rooms</button>
          <button className="mobile-nav-link" onClick={() => handleNavigation('/gallery')}>Gallery</button>
          <button className="mobile-nav-link" onClick={() => handleNavigation('/party-hall')}>Party Hall</button>
          <button className="mobile-nav-link" onClick={() => handleNavigation('/contact')}>Contact</button>
        </div>
      </div>
    </motion.nav>
  )
}

export default PublicNavbar
