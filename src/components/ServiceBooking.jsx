import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Utensils, Coffee, Shirt, Droplet, 
  Sparkles, Phone, Clock, CheckCircle2 
} from 'lucide-react'
import Navbar from './Navbar'

const ServiceBooking = () => {
  const [selectedService, setSelectedService] = useState(null)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const services = [
    {
      id: 1,
      icon: Utensils,
      title: 'Room Service',
      description: 'Gourmet dining delivered to your room',
      time: '24/7 Available',
      price: 'Varies'
    },
    {
      id: 2,
      icon: Coffee,
      title: 'In-Room Breakfast',
      description: 'Wake up to a delicious morning spread',
      time: '6:00 AM - 11:00 AM',
      price: '$35 per person'
    },
    {
      id: 3,
      icon: Shirt,
      title: 'Laundry Service',
      description: 'Express cleaning and pressing',
      time: 'Same day service',
      price: 'From $15'
    },
    {
      id: 4,
      icon: Droplet,
      title: 'Spa Treatment',
      description: 'Rejuvenating massage and wellness',
      time: '9:00 AM - 9:00 PM',
      price: 'From $120'
    },
    {
      id: 5,
      icon: Sparkles,
      title: 'Housekeeping',
      description: 'Additional room cleaning service',
      time: 'On Request',
      price: 'Complimentary'
    },
    {
      id: 6,
      icon: Phone,
      title: 'Concierge',
      description: 'Personal assistance and reservations',
      time: '24/7 Available',
      price: 'Complimentary'
    }
  ]

  const handleBookService = (service) => {
    setSelectedService(service)
    setTimeout(() => {
      setBookingSuccess(true)
      setTimeout(() => {
        setBookingSuccess(false)
        setSelectedService(null)
      }, 2000)
    }, 500)
  }

  return (
    <div className="service-booking-page">
      <Navbar />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="service-header"
      >
        <div className="service-header-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1>
              Request a Service
            </h1>
            <p>We're here to make your stay exceptional</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Services Grid */}
      <div className="services-container">
        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon
            const isSelected = selectedService?.id === service.id

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -8, 
                  boxShadow: '0 10px 40px rgba(212, 168, 70, 0.2)'
                }}
                className={`service-card ${isSelected ? 'selected' : ''}`}
              >
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="service-icon-box"
                >
                  <Icon size={32} />
                </motion.div>

                <h3>
                  {service.title}
                </h3>
                <p>{service.description}</p>

                <div className="service-meta">
                  <div className="service-time">
                    <Clock size={16} />
                    <span>{service.time}</span>
                  </div>
                  <div className="service-price">
                    {service.price}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBookService(service)}
                  disabled={isSelected}
                  className={`service-btn ${isSelected && bookingSuccess ? 'booked' : ''}`}
                >
                  {bookingSuccess && isSelected ? (
                    <span className="service-btn-content">
                      <CheckCircle2 size={20} />
                      Booked!
                    </span>
                  ) : (
                    'Request Service'
                  )}
                </motion.button>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="special-request-section"
      >
        <div className="special-request-card">
          <h3>
            Need Something Special?
          </h3>
          <p>
            Our concierge team is available 24/7 to assist with any special requests or arrangements.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="concierge-btn"
          >
            <Phone size={20} />
            <span>Contact Concierge</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default ServiceBooking
