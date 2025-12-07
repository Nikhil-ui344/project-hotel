import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import PublicNavbar from './PublicNavbar'
import Footer from './Footer'
import API_URL from '../config/api'

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/api/gallery`)
      .then(res => res.json())
      .then(data => {
        // Transform backend data to match component structure if needed
        // Backend returns: { _id, imageUrl, category, description }
        // Component expects: { src, category }
        const formattedImages = data.map(img => ({
          src: img.imageUrl,
          category: img.category,
          description: img.description
        }))
        setImages(formattedImages)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch gallery images", err)
        setLoading(false)
      })
  }, [])

  const getRelatedPhotos = (category) => {
    return images
      .filter(img => img.category === category)
      .map(img => img.src)
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
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-brown"></div>
            </div>
          ) : (
            <div className="rooms-grid">
              {/* Group images by category to show one card per category */}
              {Array.from(new Set(images.map(img => img.category))).map((category, index) => {
                const categoryImage = images.find(img => img.category === category);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: 2,
                      delay: index * 0.2 + 1, // Staggered start after initial load
                      ease: "easeInOut"
                    }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="gallery-card"
                    onClick={() => setSelectedCategory(category)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="gallery-card-overlay"></div>
                    <img src={categoryImage.src} alt={category} className="gallery-card-img" />
                    <div className="gallery-card-info" style={{ opacity: 1 }}>
                      <span className="gallery-card-category">{category}</span>
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 0.5 }}
                        style={{ display: 'block', fontSize: '0.75rem', marginTop: '0.25rem', color: 'var(--golden-yellow)' }}
                      >
                        Click to view collection
                      </motion.span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
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
