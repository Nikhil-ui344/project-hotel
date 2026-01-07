import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Music, Utensils, Camera, CheckCircle, Heart, Briefcase, Cake, PartyPopper, Presentation, Sparkles, MessageCircle } from 'lucide-react';
import PublicNavbar from './PublicNavbar';
import Footer from './Footer';
import API_URL from '../config/api';

const PartyHall = () => {
  const [partyHallImages, setPartyHallImages] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(true);

  useEffect(() => {
    // Fetch party hall images from gallery
    fetch(`${API_URL}/api/gallery`)
      .then(res => res.json())
      .then(data => {
        const hallPhotos = data.filter(img => img.category === 'Party Hall');
        setPartyHallImages(hallPhotos);
        setImagesLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch party hall images', err);
        setImagesLoading(false);
      });
  }, []);

  const features = [
    { icon: Users, title: 'Custom Event Setup', description: 'Flexible venue configuration' },
    { icon: Music, title: 'Audio-Visual Equipment', description: 'Professional sound & visual systems' },
    { icon: Users, title: 'On-Site Support Staff', description: 'Dedicated event assistance' },
    { icon: Utensils, title: 'Catering Coordination', description: 'Full-service catering support' },
  ];

  const amenities = [
    'Air Conditioned Hall',
    'Stage & Podium',
    'LED Projector & Screen',
    'High-Speed WiFi',
    'Ample Parking Space',
    'Changing Rooms',
    'Professional Lighting',
    'Decorations Available'
  ];

  const eventTypes = [
    { name: 'Weddings', icon: Heart },
    { name: 'Corporate Events', icon: Briefcase },
    { name: 'Birthday Parties', icon: Cake },
    { name: 'Anniversaries', icon: Sparkles },
    { name: 'Conferences', icon: Presentation },
    { name: 'Social Gatherings', icon: PartyPopper }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

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
  };

  const handleBookNow = () => {
    const phoneNumber = '919739122444';
    const message = encodeURIComponent('Hi, I would like to inquire about booking the Party Hall at Komal Garden for an event.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="page-title"
        >
          Samskruti Party Hall
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="page-subtitle"
        >
          Host unforgettable events in our stylish, flexible venue—perfect for weddings, parties, and meetings
        </motion.p>
      </div>

      {/* Party Hall Photo Gallery */}
      {partyHallImages.length > 0 && (
        <div className="section">
          <div className="container">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-heading"
            >
              Samskruti Party Hall
            </motion.h2>
            <motion.div 
              className="rooms-grid"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.15 }}
            >
              {partyHallImages.map((image, index) => (
                <motion.div
                  key={image._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="room-card"
                >
                  <div className="room-image-container">
                    <img 
                      src={image.imageUrl} 
                      alt={image.description || 'Party Hall'} 
                      className="room-image"
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                  </div>
                  {image.description && (
                    <div className="room-content" style={{ padding: '1rem' }}>
                      <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>{image.description}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="section">
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading"
          >
            Premium Features
          </motion.h2>
          <motion.div 
            className="rooms-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="feature-card"
              >
                <div className="feature-icon">
                  <feature.icon size={40} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Event Types Section */}
      <div className="section" style={{ background: 'transparent' }}>
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading"
          >
            Perfect For Every Occasion
          </motion.h2>
          <motion.div 
            className="event-types-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {eventTypes.map((event, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -3 }}
                className="event-type-card"
              >
                <div className="event-icon">
                  <event.icon size={40} />
                </div>
                <h4>{event.name}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Amenities Section */}
      <div className="section">
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading"
          >
            World-Class Amenities
          </motion.h2>
          <motion.div 
            className="amenities-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.05 }}
          >
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                className="amenity-item"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <CheckCircle className="amenity-icon" size={20} />
                <span>{amenity}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Booking Form Section */}
      <div className="section" id="booking">
        <div className="container">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <h2 className="section-heading">Ready to Book Your Event?</h2>
            <p className="page-subtitle" style={{ marginBottom: '3rem', color: '#333' }}>
              Contact us directly via WhatsApp for instant booking and inquiries
            </p>

            <motion.button
              onClick={handleBookNow}
              className="whatsapp-book-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={24} />
              <span>Book Now via WhatsApp</span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PartyHall;
