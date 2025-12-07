import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Hotel, ArrowLeft, Menu, X } from 'lucide-react'
import { useState } from 'react'

const Navbar = () => {
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
      <div className="navbar-content">
        <button 
          onClick={() => handleNavigation('/')}
          className="navbar-brand"
        >
          <Hotel size={32} />
          <span>
            Komal Garden
          </span>
        </button>

        {/* Desktop Menu */}
        <div className="navbar-links">
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/services')}>Services</button>
          <button onClick={() => navigate('/party-hall')}>Party Hall</button>
          <button onClick={() => navigate('/profile')}>Profile</button>
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
          <button className="mobile-nav-link" onClick={() => handleNavigation('/services')}>Services</button>
          <button className="mobile-nav-link" onClick={() => handleNavigation('/party-hall')}>Party Hall</button>
          <button className="mobile-nav-link" onClick={() => handleNavigation('/profile')}>Profile</button>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
