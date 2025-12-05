import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  User, Mail, Phone, MapPin, 
  Calendar, Award, CreditCard, Edit2, 
  Star, Crown 
} from 'lucide-react'
import Navbar from './Navbar'

const CustomerProfile = () => {
  const [isEditing, setIsEditing] = useState(false)

  const guestInfo = {
    name: 'Alexandra Bennett',
    email: 'alexandra.bennett@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Park Avenue, New York, NY 10001',
    checkIn: 'Dec 1, 2025',
    checkOut: 'Dec 5, 2025',
    roomNumber: '1205',
    membershipTier: 'Gold Elite',
    loyaltyPoints: 8450
  }

  const bookingHistory = [
    { date: 'Oct 2025', hotel: 'Grand Luxe Paris', nights: 4, amount: '$1,200' },
    { date: 'Aug 2025', hotel: 'Grand Luxe Tokyo', nights: 6, amount: '$2,100' },
    { date: 'May 2025', hotel: 'Grand Luxe London', nights: 3, amount: '$950' }
  ]

  const preferences = [
    { label: 'Room Type', value: 'King Suite with City View' },
    { label: 'Pillow Type', value: 'Memory Foam' },
    { label: 'Temperature', value: '68°F' },
    { label: 'Dietary', value: 'Vegetarian' }
  ]

  return (
    <div className="profile-page">
      <Navbar />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="profile-header"
      >
        <div className="profile-header-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1>
              My Profile
            </h1>
            <p>Manage your account and preferences</p>
          </motion.div>
        </div>
      </motion.div>

      <div className="profile-container">
        <div className="profile-grid">
          {/* Left Column - Profile Info */}
          <div className="profile-sidebar">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="profile-card"
            >
              <div className="profile-avatar-section">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="profile-avatar"
                >
                  AB
                </motion.div>
                <h2 className="profile-name">
                  {guestInfo.name}
                </h2>
                <div className="membership-badge">
                  <Crown size={16} />
                  <span>{guestInfo.membershipTier}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsEditing(!isEditing)}
                className="profile-btn"
              >
                <Edit2 size={16} />
                <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
              </motion.button>
            </motion.div>

            {/* Loyalty Points Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="loyalty-card"
            >
              <div className="loyalty-header">
                <span style={{ opacity: 0.9, fontSize: '0.875rem' }}>Loyalty Points</span>
                <Award size={20} />
              </div>
              <div className="loyalty-points">
                {guestInfo.loyaltyPoints.toLocaleString()}
              </div>
              <div className="loyalty-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Details */}
          <div className="profile-content">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="info-card"
            >
              <h3>
                Contact Information
              </h3>
              <div className="info-list">
                <div className="info-item">
                  <div className="info-icon-box">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="info-label">Email Address</div>
                    <div className="info-value">{guestInfo.email}</div>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon-box">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="info-label">Phone Number</div>
                    <div className="info-value">{guestInfo.phone}</div>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon-box">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div className="info-label">Address</div>
                    <div className="info-value">{guestInfo.address}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Current Stay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="info-card"
            >
              <h3>
                Current Stay
              </h3>
              <div className="stay-grid">
                <div className="stay-item">
                  <Calendar size={24} />
                  <div className="info-label">Check-in</div>
                  <div className="info-value">{guestInfo.checkIn}</div>
                </div>
                <div className="stay-item">
                  <Calendar size={24} />
                  <div className="info-label">Check-out</div>
                  <div className="info-value">{guestInfo.checkOut}</div>
                </div>
                <div className="stay-item">
                  <User size={24} />
                  <div className="info-label">Room Number</div>
                  <div className="info-value">{guestInfo.roomNumber}</div>
                </div>
              </div>
            </motion.div>

            {/* Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="info-card"
            >
              <h3>
                My Preferences
              </h3>
              <div className="preferences-grid">
                {preferences.map((pref, index) => (
                  <div key={index} className="preference-item">
                    <div className="info-label">{pref.label}</div>
                    <div className="info-value">{pref.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Booking History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="info-card"
            >
              <h3>
                Booking History
              </h3>
              <div className="history-list">
                {bookingHistory.map((booking, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 4 }}
                    className="history-item"
                  >
                    <div>
                      <div className="info-value">{booking.hotel}</div>
                      <div className="info-label">{booking.date} • {booking.nights} nights</div>
                    </div>
                    <div className="history-amount">
                      {booking.amount}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerProfile
