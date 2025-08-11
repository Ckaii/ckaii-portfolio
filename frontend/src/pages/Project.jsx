import { useState, useEffect } from 'react';

const Project = () => {
  const [loadedImages, setLoadedImages] = useState({});

  const projects = [
    {
      id: 1,
      title: "Stayfur Web App",
      role: "Full-Stack Developer",
      period: "Nov 2024 — Present",
      description: "A real-world company project for pet hotel booking with live users and production deployment. Built comprehensive admin and owner dashboards to manage listings, bookings, and availability.",
      technologies: ["MERN Stack", "TailwindCSS", "Zustand", "Cloudinary", "Socket.IO"],
      mainImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      gridImages: [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        "view-more"
      ],
      link: "#"
    },
    {
      id: 2,
      title: "Stayfur Mobile App",
      role: "React Native Developer",
      period: "June 2025 — Present",
      description: "Cross-platform mobile application supporting Android and iOS devices with push notifications and AI-powered chat support.",
      technologies: ["React Native", "MongoDB", "Expo", "Push Notification", "React Navigation", "n8n AI Agent (RAG)"],
      mainImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      gridImages: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
        "view-more"
      ],
      link: "#"
    },
    {
      id: 3,
      title: "Deepfake Detection Web App",
      role: "Full-Stack Developer",
      period: "Feb 2025 — Present",
      description: "Web platform to detect deepfake images using machine learning models with a trained convolutional neural network.",
      technologies: ["NextJS", "FastAPI", "OpenCV", "PyTorch", "Docker", "Docker Compose"],
      mainImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      gridImages: [
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
        "view-more"
      ],
      link: "#"
    }
  ];

  const handleImageLoad = (projectId, imageIndex) => {
    setLoadedImages(prev => ({
      ...prev,
      [`${projectId}-${imageIndex}`]: true
    }));
  };

  const PixelLoadImage = ({ src, alt, className, projectId, imageIndex, delay = 0 }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showPixel, setShowPixel] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowPixel(true);
      }, delay);

      return () => clearTimeout(timer);
    }, [delay]);

    const handleLoad = () => {
      setIsLoaded(true);
      handleImageLoad(projectId, imageIndex);
    };

    return (
      <div className={`relative overflow-hidden ${className}`}>
        {/* Pixel loading effect */}
        {showPixel && !isLoaded && (
          <div className="absolute inset-0 bg-neutral-800 animate-pulse">
            <div className="w-full h-full bg-gradient-to-br from-neutral-700 to-neutral-800 opacity-50"></div>
          </div>
        )}
        
        {/* Actual image */}
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
      </div>
    );
  };

  return (
    <div className="space-y-16 animate-fade-in">
      {/* Header */}
      <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-lg font-medium">Projects</h2>
        <p className="text-neutral-300 max-w-2xl">
          A collection of projects showcasing my skills in full-stack development, 
          mobile app development, and machine learning integration.
        </p>
      </div>

      {/* Projects Showcase */}
      <div className="space-y-20">
        {projects.map((project, index) => (
          <div key={project.id} className="space-y-6 animate-slide-up" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
            {/* Project Header */}
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium mb-1">{project.title}</h3>
                  <div className="text-neutral-400 text-sm">{project.role}</div>
                </div>
                <span className="text-neutral-400 text-sm">{project.period}</span>
              </div>
              
              <p className="text-neutral-300 leading-relaxed max-w-2xl">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex} 
                    className="text-xs px-3 py-1 border border-neutral-600 text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Main Project Image */}
            <div className="relative">
              <div className="bg-neutral-900 rounded-lg overflow-hidden">
                <PixelLoadImage
                  src={project.mainImage}
                  alt={project.title}
                  className="w-full h-96"
                  projectId={project.id}
                  imageIndex="main"
                  delay={index * 200}
                />
              </div>
            </div>
            
            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-4">
              {project.gridImages.map((image, gridIndex) => (
                <div key={gridIndex} className="relative">
                  {image === "view-more" ? (
                    <button className="w-full h-32 bg-neutral-800 border border-neutral-600 text-white hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center">
                      View More
                    </button>
                  ) : (
                    <div className="bg-neutral-900 rounded-lg overflow-hidden h-32">
                      <PixelLoadImage
                        src={image}
                        alt={`${project.title} ${gridIndex + 1}`}
                        className="w-full h-full"
                        projectId={project.id}
                        imageIndex={gridIndex}
                        delay={index * 200 + gridIndex * 100}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Projects */}
      <div className="space-y-6 pt-12 border-t border-neutral-800 animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <h3 className="text-lg font-medium">Additional</h3>
        <div className="space-y-4">
          <div>
            <div className="font-medium mb-1">Self-Hosted Resume Website</div>
            <div className="text-neutral-300 text-sm">
              Deployed personal portfolio using Nginx and Docker on home server
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
