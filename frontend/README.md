# CKAII Portfolio Website

A modern, responsive portfolio website built with React and Vite, featuring interactive 3D moon visualization, smooth animations, and smart caching for optimal user experience.

## ✨ Features

- **Interactive 3D Moon**: Three.js powered moon visualization with mouse interaction
- **Smart Loading**: Intelligent loading system that waits for moon assets before allowing user entry
- **Smart Caching**: User preferences (theme, font, font size) are cached in localStorage
- **Staggered Animations**: Beautiful navigation animations with individual item timing
- **Responsive Design**: Optimized for all device sizes
- **Theme Switching**: Light/Dark theme support
- **Font Options**: Sans, Serif, and Monospace font choices
- **Font Size Control**: Small, Medium, and Large text size options

## 🚀 Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS
- **3D Graphics**: Three.js, React Three Fiber
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Deployment**: Nginx, Docker, Cloudflare

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── MoonCorner.jsx  # 3D moon visualization
│   └── MotionUtils.jsx # Animation utilities
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── About.jsx       # About page
│   ├── Project.jsx     # Projects listing
│   ├── ProjectDetail.jsx # Individual project view
│   └── Contact.jsx     # Contact page
├── assets/             # Static assets
└── App.jsx             # Main application component
```

## 🎨 Design Features

- **Moon Corner**: Interactive 3D moon that responds to mouse movement
- **Staggered Navigation**: Navigation items animate in sequence for smooth UX
- **Content Positioning**: Middle content positioned lower than menu for better hierarchy
- **Pixel Art Loading**: Images load with pixelated effect before revealing full quality
- **Smooth Transitions**: Page transitions and state changes with easing functions

## 🚀 Deployment

This website is self-hosted using:

- **Nginx**: Reverse proxy and static file serving
- **Docker**: Containerized deployment
- **Cloudflare**: CDN, SSL, and performance optimization
- **Docker Compose**: Multi-container orchestration

### Deployment Commands

```bash
# Build the production bundle
npm run build

# Deploy using Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (bottom moon layout)
- **Tablet**: 768px - 1024px (bottom moon layout)
- **Desktop**: > 1024px (right moon layout)

## 🎯 Performance Optimizations

- **Smart Asset Loading**: Moon assets load in parallel with text animation
- **Lazy Loading**: Images load with progressive enhancement
- **Efficient Animations**: Hardware-accelerated transforms and opacity changes
- **Minimal Re-renders**: Optimized state management and memoization

## 🌙 Moon Visualization

The 3D moon features:
- **Interactive Rotation**: Responds to mouse movement
- **Dynamic Lighting**: Realistic lighting with ambient, directional, and hemisphere lights
- **Fallback Support**: Graceful degradation to sphere geometry if GLB files fail
- **Responsive Layout**: Adapts positioning based on screen size
- **Performance Optimized**: Uses React Three Fiber for efficient rendering

## 📊 Analytics & Monitoring

- **Performance Metrics**: Core Web Vitals tracking
- **Error Boundaries**: Graceful error handling
- **Loading States**: User feedback during asset loading
- **Navigation Tracking**: Smooth page transition animations

## 🔒 Security Features

- **Content Security Policy**: XSS protection
- **HTTPS Enforcement**: SSL/TLS encryption
- **Secure Headers**: Security-focused HTTP headers
- **Input Validation**: Sanitized user inputs

## 📈 Future Enhancements

- [ ] Blog section with MDX support
- [ ] Dark mode preference detection
- [ ] PWA capabilities
- [ ] Internationalization (i18n)
- [ ] Advanced 3D effects
- [ ] Performance monitoring dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🌟 Acknowledgments

- **Three.js Community**: For 3D graphics inspiration
- **Framer Motion**: For smooth animation capabilities
- **TailwindCSS**: For utility-first CSS framework
- **React Community**: For the amazing ecosystem

---

Built with ❤️ by CKAII
