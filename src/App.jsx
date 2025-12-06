import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen'
import LandingPage from './components/LandingPage'
import ServiceBooking from './components/ServiceBooking'
import CustomerProfile from './components/CustomerProfile'
import Rooms from './components/Rooms'
import Gallery from './components/Gallery'
import About from './components/About'
import Contact from './components/Contact'
import WhatsAppButton from './components/WhatsAppButton'
import AdminDashboard from './components/Admin/AdminDashboard'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <SplashScreen />
  }

  return (
    <Router>
      <WhatsAppButton />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<ServiceBooking />} />
        <Route path="/profile" element={<CustomerProfile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
