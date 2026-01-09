import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Coffee, Wine, ChefHat, Clock, Star, MessageCircle } from 'lucide-react';
import PublicNavbar from './PublicNavbar';
import Footer from './Footer';
import API_URL from '../config/api';

const Restaurant = () => {
  const [restaurantImages, setRestaurantImages] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(true);

  useEffect(() => {
    // Fetch restaurant images from gallery
    fetch(`${API_URL}/api/gallery`)
      .then(res => res.json())
      .then(data => {
        const restaurantPhotos = data.filter(img => img.category === 'Restaurant');
        setRestaurantImages(restaurantPhotos);
        setImagesLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch restaurant images', err);
        setImagesLoading(false);
      });
  }, []);

  const features = [
    { icon: Utensils, title: 'Multi-Cuisine', description: 'Indian, Chinese, Continental & More' },
    { icon: ChefHat, title: 'Expert Chefs', description: 'Experienced culinary professionals' },
    { icon: Coffee, title: 'All Day Dining', description: 'Breakfast, Lunch & Dinner' },
    { icon: Wine, title: 'Beverages', description: 'Fresh juices & hot beverages' },
  ];

  const specialties = [
    'Traditional Indian Cuisine',
    'Chinese Delicacies',
    'Continental Favorites',
    'South Indian Specialties',
    'North Indian Dishes',
    'Tandoori Items',
    'Fresh Salads & Soups',
    'Desserts & Sweets'
  ];

  const menuCategories = [
    {
      category: 'Starters & Appetizers',
      items: [
        { name: 'Paneer Tikka', description: 'Marinated cottage cheese grilled to perfection' },
        { name: 'Veg Manchurian', description: 'Crispy vegetable balls in tangy sauce' },
        { name: 'Spring Rolls', description: 'Crispy rolls with fresh vegetables' },
        { name: 'Corn Cheese Balls', description: 'Golden fried corn and cheese delights' }
      ]
    },
    {
      category: 'Main Course',
      items: [
        { name: 'Butter Paneer Masala', description: 'Creamy tomato gravy with soft paneer' },
        { name: 'Dal Tadka', description: 'Yellow lentils tempered with aromatic spices' },
        { name: 'Veg Biryani', description: 'Fragrant basmati rice with mixed vegetables' },
        { name: 'Hakka Noodles', description: 'Stir-fried noodles with vegetables' }
      ]
    },
    {
      category: 'Tandoori Specials',
      items: [
        { name: 'Tandoori Roti', description: 'Traditional clay oven bread' },
        { name: 'Butter Naan', description: 'Soft leavened bread with butter' },
        { name: 'Stuffed Kulcha', description: 'Bread stuffed with your choice of filling' },
        { name: 'Tandoori Veg Platter', description: 'Assorted grilled vegetables' }
      ]
    },
    {
      category: 'South Indian',
      items: [
        { name: 'Masala Dosa', description: 'Crispy crepe with spiced potato filling' },
        { name: 'Idli Sambar', description: 'Steamed rice cakes with lentil soup' },
        { name: 'Vada Sambar', description: 'Crispy lentil donuts with sambar' },
        { name: 'Uttapam', description: 'Thick pancake with vegetable toppings' }
      ]
    },
    {
      category: 'Beverages',
      items: [
        { name: 'Fresh Lime Soda', description: 'Refreshing citrus drink' },
        { name: 'Mango Lassi', description: 'Sweet yogurt drink with mango' },
        { name: 'Masala Chai', description: 'Traditional spiced tea' },
        { name: 'Cold Coffee', description: 'Chilled coffee with ice cream' }
      ]
    },
    {
      category: 'Desserts',
      items: [
        { name: 'Gulab Jamun', description: 'Sweet milk dumplings in syrup' },
        { name: 'Kulfi', description: 'Traditional Indian ice cream' },
        { name: 'Brownie with Ice Cream', description: 'Warm chocolate brownie with vanilla ice cream' },
        { name: 'Fruit Salad', description: 'Fresh seasonal fruits' }
      ]
    }
  ];

  const timings = [
    { meal: 'Breakfast', time: '7:30 AM - 10:30 AM', icon: Coffee },
    { meal: 'Lunch', time: '12:30 PM - 3:30 PM', icon: Utensils },
    { meal: 'Dinner', time: '7:30 PM - 10:30 PM', icon: ChefHat }
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

  const handleReserveTable = () => {
    const phoneNumber = '919739122444';
    const message = encodeURIComponent('Hi, I would like to reserve a table at Komal Garden Restaurant.');
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
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="restaurant-logo-container"
          style={{ textAlign: 'center', marginBottom: '1rem' }}
        >
          <img 
            src="/logo-restaurant.jpg" 
            alt="Komal Garden Restaurant" 
            style={{ 
              maxWidth: '200px', 
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
          Restaurant
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="page-subtitle"
        >
          Experience culinary excellence with a diverse menu crafted by expert chefs
        </motion.p>
      </div>

      {/* Restaurant Photo Gallery */}
      {restaurantImages.length > 0 && (
        <div className="section">
          <div className="container">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-heading"
            >
              Our Restaurant
            </motion.h2>
            <motion.div 
              className="rooms-grid"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.15 }}
            >
              {restaurantImages.map((image, index) => (
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
                      alt={image.description || 'Restaurant'} 
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
            Why Dine With Us
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

      {/* Dining Timings */}
      <div className="section" style={{ background: 'transparent' }}>
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading"
          >
            Dining Hours
          </motion.h2>
          <motion.div 
            className="event-types-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {timings.map((timing, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -3 }}
                className="event-type-card"
              >
                <div className="event-icon">
                  <timing.icon size={40} />
                </div>
                <h4>{timing.meal}</h4>
                <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '0.95rem' }}>
                  {timing.time}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Specialties Section */}
      <div className="section">
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading"
          >
            Our Specialties
          </motion.h2>
          <motion.div 
            className="amenities-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.05 }}
          >
            {specialties.map((specialty, index) => (
              <motion.div
                key={index}
                className="amenity-item"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <Star className="amenity-icon" size={20} />
                <span>{specialty}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="section menu-section" style={{ background: 'linear-gradient(135deg, #F4F1EB 0%, #E5E2DD 100%)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-heading">Our Menu</h2>
            <p className="section-subtitle">Delicious dishes crafted with love and authentic flavors</p>
          </motion.div>

          <div className="menu-grid">
            {menuCategories.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIndex * 0.1 }}
                className="menu-category-card"
              >
                <h3 className="menu-category-title">{category.category}</h3>
                <div className="menu-items">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: itemIndex * 0.05, duration: 0.4 }}
                      className="menu-item"
                    >
                      <div className="menu-item-content">
                        <h4 className="menu-item-name">{item.name}</h4>
                        <p className="menu-item-description">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="menu-note"
          >
            <p>* Please contact us for menu pricing and availability.</p>
          </motion.div>
        </div>
      </div>

      {/* Reservation Section */}
      <div className="section" id="reservation">
        <div className="container">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <h2 className="section-heading">Reserve Your Table</h2>
            <p className="page-subtitle" style={{ marginBottom: '3rem', color: '#333' }}>
              Contact us via WhatsApp for table reservations and menu inquiries
            </p>

            <motion.button
              onClick={handleReserveTable}
              className="whatsapp-book-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={24} />
              <span>Reserve via WhatsApp</span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Restaurant;
