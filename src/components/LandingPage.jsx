import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Star, ChevronLeft, Quote, X } from 'lucide-react'
import { useState, useRef } from 'react'
import PublicNavbar from './PublicNavbar'
import Footer from './Footer'

const LandingPage = () => {
  const navigate = useNavigate()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80', category: 'Exterior' },
    { src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', category: 'Rooms' },
    { src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80', category: 'Dining' },
    { src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80', category: 'Lobby' },
    { src: 'https://images.unsplash.com/photo-1571896349842-6e53ce41e887?w=800&q=80', category: 'Pool' }
  ]

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
    ]
  }

  const getRelatedPhotos = (category) => {
    return categoryPhotos[category] || []
  }

  const testimonials = [
    { name: "Sarah Jenkins", text: "An absolutely unforgettable stay. The attention to detail is unmatched." },
    { name: "Michael Chen", text: "The perfect blend of modern luxury and classic hospitality." },
    { name: "Emma Thompson", text: "Dining at Grand Luxe was a culinary journey I'll never forget." },
    { name: "James Wilson", text: "The presidential suite exceeded all my expectations. Truly world-class." },
    { name: "Sofia Rodriguez", text: "A sanctuary in the city. The spa treatments were divine." }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="landing-page">
      <PublicNavbar />

      {/* Hero Section */}
      <div className="hero-section" ref={heroRef}>
        {/* Background Image with Overlay */}
        <motion.div 
          className="hero-bg"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y,
            opacity
          }}
        >
          <div className="hero-overlay"></div>
        </motion.div>

        {/* Hero Content */}
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="hero-title">
              Experience Timeless Luxury
            </h1>
            <p className="hero-subtitle">
              Where elegance meets exceptional hospitality
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: '#D4A846',
              boxShadow: '0 0 30px rgba(212, 168, 70, 0.6)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/rooms')}
            className="btn-primary"
          >
            <span>Book Now</span>
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="floating-circle circle-1"
        >
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="floating-circle circle-2"
        >
        </motion.div>
      </div>

      {/* Rooms Section */}
      <section id="rooms" className="section section-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              Exquisite Accommodations
            </h2>
            <p className="section-subtitle">
              Discover our collection of meticulously designed rooms and suites, offering the perfect blend of comfort and sophistication.
            </p>
          </motion.div>
          
          <div className="rooms-grid">
            {[
              { title: 'Deluxe King', price: '$350/night', img: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80' },
              { title: 'Executive Suite', price: '$550/night', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80' },
              { title: 'Presidential Penthouse', price: '$1,200/night', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80' },
            ].map((room, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                onClick={() => navigate('/rooms')}
                className="room-card"
              >
                <div className="room-image-container">
                  <img src={room.img} alt={room.title} className="room-image" />
                </div>
                <div className="room-content">
                  <h3 className="room-title">{room.title}</h3>
                  <div className="room-footer">
                    <p className="room-price">{room.price}</p>
                    <button className="btn-text">
                      View Details <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">
              A Glimpse of Luxury
            </h2>
            <p className="section-subtitle">Immerse yourself in the Grand Luxe experience</p>
          </motion.div>

          <div className="gallery-grid">
             {galleryImages.map((img, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: i * 0.1 }}
                 whileHover={{ scale: 1.02 }}
                 onClick={() => setSelectedCategory(img.category)}
                 className={`gallery-item ${
                   i === 0 ? 'large' : 
                   i === 3 ? 'wide' : ''
                 }`}
               >
                 <div className="gallery-overlay"></div>
                 <img src={img.src} alt={img.category} className="gallery-img" />
                 <div className="gallery-card-info">
                    <span className="gallery-card-category">{img.category}</span>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

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

      {/* About Us */}
      <section id="about" className="section section-white">
        <div className="container about-container">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="about-image-wrapper"
          >
            <div className="about-frame"></div>
            <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80" alt="About Us" className="about-img" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="about-content"
          >
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Our Story
            </h2>
            <p className="about-text">
              Founded in 1920, Grand Luxe has been the epitome of elegance and hospitality for over a century. Nestled in the heart of the city, we offer an escape into a world of refined luxury and timeless charm. Our commitment to excellence ensures that every guest experiences the royal treatment they deserve.
            </p>
            <button className="btn-text">
              Read More <ChevronRight size={16} className="ml-1" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="testimonials-bg">
          <div className="floating-circle circle-1" style={{ top: '10px', left: '10px', width: '16rem', height: '16rem' }}></div>
          <div className="floating-circle circle-2" style={{ bottom: '10px', right: '10px', width: '16rem', height: '16rem' }}></div>
        </div>
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title" 
            style={{ color: 'var(--white)' }}
          >
            Guest Experiences
          </motion.h2>
          
          <div className="testimonial-slider-container">
            <button className="slider-btn prev" onClick={prevTestimonial}>
              <ChevronLeft size={24} />
            </button>
            
            <div style={{ overflow: 'hidden', minHeight: '300px', display: 'flex', alignItems: 'center' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="testimonial-slide"
                  style={{ width: '100%' }}
                >
                  <Quote size={48} className="testimonial-quote-icon mx-auto" />
                  <div className="testimonial-stars mb-6 flex justify-center gap-1">
                    {[...Array(5)].map((_, star) => <Star key={star} size={20} fill="#D4A846" color="#D4A846" />)}
                  </div>
                  <p className="testimonial-text-large">"{testimonials[currentTestimonial].text}"</p>
                  <h4 className="testimonial-author-large">{testimonials[currentTestimonial].name}</h4>
                </motion.div>
              </AnimatePresence>
            </div>

            <button className="slider-btn next" onClick={nextTestimonial}>
              <ChevronRight size={24} />
            </button>

            <div className="slider-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`slider-dot ${index === currentTestimonial ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LandingPage
