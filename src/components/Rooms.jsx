import { motion } from 'framer-motion'
import { ChevronRight, Wifi, Coffee, Tv, Wind } from 'lucide-react'
import PublicNavbar from './PublicNavbar'
import Footer from './Footer'

const Rooms = () => {
  const rooms = [
    { 
      id: 1,
      title: 'Deluxe King', 
      price: '$350/night', 
      size: '45m²',
      view: 'City View',
      img: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
      desc: 'Experience ultimate comfort in our Deluxe King room, featuring a plush king-size bed, modern amenities, and stunning city views.'
    },
    { 
      id: 2,
      title: 'Executive Suite', 
      price: '$550/night', 
      size: '65m²',
      view: 'Ocean View',
      img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      desc: 'Perfect for business or leisure, the Executive Suite offers a separate living area, premium workspace, and exclusive lounge access.'
    },
    { 
      id: 3,
      title: 'Presidential Penthouse', 
      price: '$1,200/night', 
      size: '120m²',
      view: 'Panoramic View',
      img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      desc: 'The epitome of luxury living. Our Presidential Penthouse features a private terrace, jacuzzi, butler service, and unmatched elegance.'
    },
    { 
      id: 4,
      title: 'Garden Villa', 
      price: '$850/night', 
      size: '90m²',
      view: 'Garden View',
      img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      desc: 'A private sanctuary surrounded by lush tropical gardens. Features a private pool, outdoor rain shower, and serene atmosphere.'
    },
    { 
      id: 5,
      title: 'Family Suite', 
      price: '$650/night', 
      size: '80m²',
      view: 'Pool View',
      img: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
      desc: 'Spacious accommodation for the whole family. Includes two bedrooms, a large living area, and kid-friendly amenities.'
    },
    { 
      id: 6,
      title: 'Oceanfront King', 
      price: '$450/night', 
      size: '50m²',
      view: 'Ocean Front',
      img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      desc: 'Wake up to the sound of waves. This room offers direct beach access and a private balcony overlooking the ocean.'
    }
  ]

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
                  <button className="btn-full">
                    Book Now
                  </button>
                </div>
            </motion.div>
          ))}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Rooms
