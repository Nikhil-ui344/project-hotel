import { motion } from 'framer-motion'
import { Award, Users, Heart, Utensils } from 'lucide-react'
import PublicNavbar from './PublicNavbar'
import Footer from './Footer'

const About = () => {
  return (
    <div className="landing-page">
      <PublicNavbar />
      
      {/* Header */}
      <div className="page-header">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '1rem' }}
        >
          <img 
            src="/logo-main-1.jpg" 
            alt="Komal Garden" 
            style={{ 
              maxWidth: '150px', 
              height: 'auto',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }} 
          />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="page-title"
        >
          About Us
        </motion.h1>
        <p className="page-subtitle">
          Where authentic flavors meet warm hospitality in the heart of Karnataka.
        </p>
      </div>

      {/* Story Section */}
      <section className="section">
        <div className="container about-container">
          <motion.div 
            initial={{ opacity: 0, x: -50, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="about-image-wrapper"
          >
            <div className="about-frame"></div>
            <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80" alt="Our Story" className="about-img" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="about-content"
          >
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Welcome to Komal Garden
            </h2>
            <p className="about-text">
              Nestled on the scenic Bangalore-Hyderabad Road near Bagepalli in Chikkaballapura District, Komal Garden stands as a premier destination for authentic dining experiences and comfortable accommodations. Located at Chenduru (Thattihalli Cross), we proudly serve guests seeking quality food, warm hospitality, and memorable celebrations.
            </p>
            <p className="about-text">
              Our establishment features a renowned multi-cuisine restaurant offering Indian, Chinese, Continental, and South Indian specialties, complemented by comfortable guest rooms and the elegant Samskruti Party Hall for your special occasions. Whether you're a traveler seeking respite, a food enthusiast exploring Karnataka's culinary landscape, or planning a celebration, Komal Garden provides the perfect setting.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section section-white">
        <div className="container">
          <motion.div 
            className="values-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
          >
            {[
              { icon: Utensils, title: 'Culinary Excellence', desc: 'Authentic multi-cuisine dining with fresh ingredients and expert chefs.' },
              { icon: Heart, title: 'Warm Hospitality', desc: 'Creating memorable experiences for every guest with personalized care.' },
              { icon: Award, title: 'Quality Service', desc: 'Commitment to excellence in food, accommodations, and events.' },
              { icon: Users, title: 'Family Friendly', desc: 'A welcoming atmosphere perfect for families, travelers, and celebrations.' },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                  className="value-card"
                >
                  <div className="value-icon-wrapper">
                    <Icon className="value-icon" />
                  </div>
                  <h3 className="value-title">{item.title}</h3>
                  <p className="value-desc">{item.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About
