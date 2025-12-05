import { motion } from 'framer-motion'
import { Award, Users, History, Heart } from 'lucide-react'
import PublicNavbar from './PublicNavbar'
import Footer from './Footer'

const About = () => {
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
          About Us
        </motion.h1>
        <p className="page-subtitle">
          A legacy of luxury, hospitality, and timeless elegance.
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
              Our Heritage
            </h2>
            <p className="about-text">
              Founded in 1920, Grand Luxe has stood as a beacon of luxury and refinement for over a century. What began as a boutique establishment has grown into an icon of world-class hospitality, hosting dignitaries, celebrities, and discerning travelers from around the globe.
            </p>
            <p className="about-text">
              Our philosophy is simple: to provide an experience that transcends the ordinary. Every detail, from our handcrafted furniture to our personalized service, is curated to ensure your stay is nothing short of perfection.
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
              { icon: History, title: 'Legacy', desc: 'Over 100 years of excellence in hospitality.' },
              { icon: Heart, title: 'Passion', desc: 'Dedicated to creating unforgettable moments.' },
              { icon: Award, title: 'Quality', desc: 'Uncompromising standards in every detail.' },
              { icon: Users, title: 'Service', desc: 'Personalized care for every guest.' },
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
