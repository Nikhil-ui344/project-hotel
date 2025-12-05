# 🏨 Grand Luxe - Luxury Hotel UI

A premium, modern hotel management UI built with React, featuring smooth animations, elegant design, and a luxurious user experience.

## ✨ Features

### 🎨 Design Philosophy
- **Aesthetic**: Premium, warm, and welcoming design suitable for luxury hotel guests
- **Color Palette**: 
  - Primary Brown (#5A3B2E) - Main luxury anchor
  - Golden Yellow (#D4A846) - Highlight color
  - Accent Gold (#C68F2D) - Logo and accents
  - Cream (#F4F1EB) - Soft backgrounds
  - Soft Grey (#E5E2DD) - Secondary backgrounds

### 📱 Screens
1. **Splash Screen** - Breathing logo animation with radial glow effect
2. **Landing Page** - Hero section with elegant hotel imagery and call-to-action
3. **Service Booking** - Grid of available services with interactive booking
4. **Customer Profile** - Comprehensive guest information and preferences

### 🎭 Animations
- Smooth page transitions (slide + fade)
- Button scale and glow effects on hover
- Micro hover rotations on icons (5-8 degrees)
- Card elevation animations
- Breathing glow effect on splash screen
- Floating decorative elements

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

### Build for Production
```bash
npm run build
```

## 🛠️ Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Navigation and routing
- **Lucide React** - Icon library

## 📂 Project Structure

```
luxury-hotel-ui/
├── src/
│   ├── components/
│   │   ├── SplashScreen.jsx      # Loading screen with logo animation
│   │   ├── LandingPage.jsx       # Hero section and get started
│   │   ├── ServiceBooking.jsx    # Service request interface
│   │   ├── CustomerProfile.jsx   # Guest profile and preferences
│   │   └── Navbar.jsx           # Navigation component
│   ├── App.jsx                  # Main app with routing
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles and utilities
├── tailwind.config.js           # Tailwind configuration
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies and scripts
```

## 🎨 Custom Animations

The project includes several custom animations defined in Tailwind config:

- **fade-in**: Smooth opacity transition
- **slide-up**: Upward motion with fade
- **breathing**: Pulsing scale and opacity effect
- **float**: Gentle vertical floating motion

## 🌟 Key Features

### Interactive Elements
- Hover effects on all interactive components
- Scale animations on buttons
- Smooth color transitions
- Elevated shadows on card hover
- Gold glow effects

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Flexible grid layouts
- Adaptive navigation

### User Experience
- Intuitive navigation flow
- Quick access to services
- Profile customization
- Booking confirmation feedback
- Loading states and animations

## 🎯 Color System

```css
Primary Brown:    #5A3B2E
Golden Yellow:    #D4A846
Accent Gold:      #C68F2D
Cream:            #F4F1EB
Soft Grey:        #E5E2DD
Text Grey:        #333333
Highlight Gold:   #D4A846
```

## 📝 Typography

- **Headings**: Playfair Display (Serif)
- **Body Text**: Inter (Sans-serif)

## 🔧 Customization

### Changing Colors
Edit `tailwind.config.js` to modify the color palette:

```javascript
theme: {
  extend: {
    colors: {
      'primary-brown': '#5A3B2E',
      'golden-yellow': '#D4A846',
      // ... add your colors
    }
  }
}
```

### Adding New Services
Edit the `services` array in `ServiceBooking.jsx`:

```javascript
const services = [
  {
    icon: YourIcon,
    title: 'Your Service',
    description: 'Service description',
    // ... other properties
  }
]
```

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💎 Premium Features

- **Membership Tiers**: Gold Elite status with loyalty points
- **Booking History**: Track past reservations
- **Guest Preferences**: Personalized room settings
- **24/7 Concierge**: Always-available assistance
- **Service Tracking**: Real-time booking confirmations

---

Built with ❤️ for luxury hospitality experiences
