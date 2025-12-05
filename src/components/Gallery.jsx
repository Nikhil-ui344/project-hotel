import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import PublicNavbar from './PublicNavbar'
import Footer from './Footer'

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const images = [
    { src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80', category: 'Exterior' },
    { src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', category: 'Rooms' },
    { src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80', category: 'Dining' },
    { src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80', category: 'Lobby' },
    { src: 'https://images.unsplash.com/photo-1571896349842-6e53ce41e887?w=800&q=80', category: 'Pool' },
    { src: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80', category: 'Spa' },
    { src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80', category: 'Garden' },
  ]

  // Simulated related photos for each category
  const categoryPhotos = {
    'Exterior': [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
      'https://images.unsplash.com/photo-1512918760383-56199323c0c5?w=800&q=80'
    ],
    'Rooms': [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80'
    ],
    'Dining': [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?w=800&q=80',
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80'
    ],
    'Lobby': [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80'
    ],
    'Pool': [
      'https://images.unsplash.com/photo-1571896349842-6e53ce41e887?w=800&q=80',
      'https://images.unsplash.com/photo-1572331165267-854da2b00ca1?w=800&q=80',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80'
    ],
    'Spa': [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
      'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80'
    ],
    'Garden': [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
      'https://images.unsplash.com/photo-1558293842-c0fd3db84500?w=800&q=80'
    ]
  }

  const getRelatedPhotos = (category) => {
    return categoryPhotos[category] || [images.find(img => img.category === category)?.src]
  }

  return (
    <div className="landing-page">
      <PublicNavbar />
      
      {/* Header */}
      <div className="page-header">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-title"
        >
          Gallery
        </motion.h1>
        <p className="page-subtitle">
          Take a visual journey through the elegance and beauty of Grand Luxe.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="section">
        <div className="container">
          <div className="rooms-grid">
            {images.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="gallery-card"
                onClick={() => setSelectedCategory(img.category)}
                style={{ cursor: 'pointer' }}
              >
                <div className="gallery-card-overlay"></div>
                <img src={img.src} alt={img.category} className="gallery-card-img" />
                <div className="gallery-card-info">
                  <span className="gallery-card-category">{img.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="gallery-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="gallery-modal-header">
                <h2>{selectedCategory} Collection</h2>
                <button 
                  className="gallery-modal-close"
                  onClick={() => setSelectedCategory(null)}
                >
                  <X size={32} />
                </button>
              </div>
              
              <div className="gallery-modal-grid">
                {getRelatedPhotos(selectedCategory).map((src, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="gallery-modal-item"
                  >
                    <img src={src} alt={`${selectedCategory} ${idx + 1}`} className="gallery-modal-img" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default Gallery
