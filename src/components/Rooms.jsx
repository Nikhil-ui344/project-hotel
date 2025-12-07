import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Wifi, Coffee, Tv, Wind } from 'lucide-react'
import PublicNavbar from './PublicNavbar'
import Footer from './Footer'
import API_URL from '../config/api'

const Rooms = () => {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/api/rooms`)
      .then(res => res.json())
      .then(data => {
        // Transform backend data to match component structure
        const formattedRooms = data.map(room => ({
          id: room._id,
          title: room.title,
          price: room.price,
          size: room.size,
          view: room.view,
          img: room.imageUrl,
          desc: room.description,
          isAvailable: room.isAvailable
        }))
        setRooms(formattedRooms)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch rooms", err)
        setLoading(false)
      })
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="landing-page">
      <PublicNavbar />
      
      {/* Header */}
      <div className="page-header">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="page-title"
        >
          Our Accommodations
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="page-subtitle"
        >
          Choose from our selection of meticulously designed rooms and suites, each offering a unique blend of comfort and luxury.
        </motion.p>
      </div>

      {/* Rooms Grid */}
      <div className="section">
        <div className="container">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-brown"></div>
            </div>
          ) : (
            <motion.div 
              className="rooms-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {rooms.map((room) => (
                <motion.div
                  key={room.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="room-card"
                >
                  <div className="room-image-container">
                    <img src={room.img} alt={room.title} className="room-image" />
                    <div className="room-badge">
                      {room.size}
                    </div>
                    {!room.isAvailable && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                        Booked
                      </div>
                    )}
                  </div>
                  <div className="room-content">
                    <div className="room-header">
                      <h3 className="room-title">{room.title}</h3>
                      <span className="room-price">{room.price}</span>
                    </div>
                    <p className="room-desc">{room.desc}</p>
                    <div className="room-amenities">
                      <Wifi className="amenity-icon" />
                      <Coffee className="amenity-icon" />
                      <Tv className="amenity-icon" />
                      <Wind className="amenity-icon" />
                    </div>
                    <button 
                      className={`btn-full ${!room.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!room.isAvailable}
                      onClick={() => window.open('https://wa.me/919742856923?text=Hello,%20I%20would%20like%20to%20book%20a%20room%20at%20Komal%20Garden.', '_blank')}
                    >
                      {room.isAvailable ? 'Book Now' : 'Currently Unavailable'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Rooms
