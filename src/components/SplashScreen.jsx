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
          <svg 
            className="splash-logo-svg" 
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <motion.path 
              d="M12 3L2 9v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V9l-10-6zm0 2.18l8 4.8v4.98c0 4.51-3.08 8.72-8 9.92-4.92-1.2-8-5.41-8-9.92V9.98l8-4.8z" 
              variants={pathVariants}
            />
            <motion.path 
              d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" 
              variants={pathVariants}
            />
          </svg>
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
