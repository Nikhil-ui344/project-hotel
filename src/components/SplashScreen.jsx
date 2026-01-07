import { motion } from 'framer-motion'

const SplashScreen = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="splash-screen">
      <div className="splash-overlay"></div>
      
      <motion.div 
        className="splash-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo Animation */}
        <motion.div className="splash-logo-wrapper" variants={itemVariants}>
          <motion.img 
            src="/logo-main-1.jpg" 
            alt="Komal Garden Logo"
            className="splash-logo-image"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </motion.div>

        {/* Text Animation */}
        <div className="splash-text-container">
          <motion.h1 className="splash-title" variants={itemVariants}>
            <span className="text-gradient">Komal Garden</span>
          </motion.h1>
          <motion.div 
            className="splash-divider"
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 1, duration: 1 }}
          />
          <motion.p className="splash-subtitle" variants={itemVariants}>
            Where Luxury Meets Perfection
          </motion.p>
        </div>

        {/* Loading Bar */}
        <motion.div 
          className="splash-loader"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  )
}

export default SplashScreen
