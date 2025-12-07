import { motion } from 'framer-motion';
import { Users, Calendar, Music, Utensils, Camera, CheckCircle, Heart, Briefcase, Cake, PartyPopper, Presentation, Sparkles, MessageCircle } from 'lucide-react';
import PublicNavbar from './PublicNavbar';
import Footer from './Footer';

const PartyHall = () => {
  const features = [
    { icon: Users, title: 'Capacity', description: 'Up to 200 guests' },
    { icon: Music, title: 'Sound System', description: 'Professional audio & DJ setup' },
    { icon: Utensils, title: 'Catering', description: 'In-house & external options' },
    { icon: Camera, title: 'Photography', description: 'Scenic photo opportunities' },
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
    const phoneNumber = '919742856923';
    const message = encodeURIComponent('Hi, I would like to inquire about booking the Party Hall at Komal Garden for an event.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

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
          Elegant Party Hall
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="page-subtitle"
        >
          Where Celebrations Come to Life - A sophisticated and versatile space for all your special occasions
        </motion.p>
      </div>

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
