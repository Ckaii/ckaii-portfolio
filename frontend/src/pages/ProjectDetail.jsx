import { useParams, Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';

const DB = {
  'stayfur-web': {
    title: 'Stayfur Web App',
    role: 'Full-Stack Developer',
    stack: ['MERN Stack', 'TailwindCSS', 'Zustand', 'Cloudinary', 'Socket.IO'],
    year: 'Nov 2024 — Present',
    intro: 'A real-world company project for pet hotel booking with live users and production deployment. Built comprehensive admin and owner dashboards to manage listings, bookings, and availability.',
    website: 'https://stayfur.com',
    images: [
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940892/Screenshot_2025-08-11_at_20-49-53_Stayfur_Instant_Booking_for_Pet_Hotels_in_Malaysia_qxvrwc.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940891/Screenshot_2025-08-11_at_20-50-56_QQ_PawPals_Hotel_Pet_Hotel_in_Seri_Kembangan_Selangor_Stayfur_lxhcvn.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940891/Screenshot_2025-08-11_at_20-51-47_Stayfur_Instant_Booking_for_Pet_Hotels_in_Malaysia_dw4qgw.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940890/Screenshot_2025-08-11_at_20-52-02_Stayfur_Instant_Booking_for_Pet_Hotels_in_Malaysia_d4xett.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940890/Screenshot_2025-08-11_at_20-55-15_Stayfur_Instant_Booking_for_Pet_Hotels_in_Malaysia_er84q9.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940890/Screenshot_2025-08-11_at_21-02-18_Stayfur_Instant_Booking_for_Pet_Hotels_in_Malaysia_ep0mv2.png',
    ],
  },
  'stayfur-mobile': {
    title: 'Stayfur Mobile App',
    role: 'React Native Developer',
    stack: ['React Native', 'Expo', 'MongoDB', 'Push Notifications', 'n8n RAG'],
    year: 'June 2025 — Present',
    intro: 'Cross‑platform mobile app built with React Native and Expo, featuring push notifications, chat, and booking workflows integrated with the web platform.',
    images: [
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940864/Screenshot_20250811_210608_lf6dgs.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940861/Screenshot_20250811_210615_jdv0ou.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940860/Screenshot_20250811_210726_tphqqk.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940858/Screenshot_20250811_210450_iz2dnl.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940857/Screenshot_20250811_210637_wgh2s6.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940856/Screenshot_20250811_210650_zbtytn.png',
    ],
  },
  'deepfake-detection': {
    title: 'Deepfake Detection Web App',
    role: 'Full-Stack Developer',
    stack: ['NextJS', 'FastAPI', 'PyTorch', 'Docker'],
    year: 'Feb 2025 — Present',
    intro: 'An ML‑powered web platform to detect deepfake images. Next.js frontend with FastAPI backend hosting the inference pipeline using PyTorch models.',
    website: 'https://deepfake-detection.ckaiii.dev',
    images: [
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940844/Screenshot_2025-08-11_at_21-14-11_Deepfake_Detection_v7ybsc.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940841/Screenshot_2025-08-11_at_21-14-19_Deepfake_Detection_ghzkvn.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940841/Screenshot_2025-08-11_at_21-14-25_Deepfake_Detection_ygiwi3.png',
    ],
  },
  'portfolio-website': {
    title: 'Portfolio Website',
    role: 'Full-Stack Developer',
    stack: ['React', 'Vite', 'TailwindCSS', 'Framer Motion', 'Three.js', 'Nginx', 'Docker', 'Cloudflare'],
    year: 'Jan 2025 — Present',
    intro: 'A modern, responsive portfolio website built with React and Vite. Features include interactive 3D moon visualization, smooth animations, and smart caching for optimal user experience. Self-hosted using Nginx, Docker Compose, and Cloudflare for performance and security.',
    images: [
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754936718/Screenshot_2025-08-12_at_01-34-21_CKAII_xrawpp.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754936717/Screenshot_2025-08-12_at_01-33-15_CKAII_yzjz1z.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754936716/Screenshot_2025-08-12_at_01-33-56_CKAII_loenyk.png',
    ],
  },
};

const PixelImage = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && !imageSrc) {
      // Create a tiny version for pixelated effect
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Create a larger version (32x32) for smaller pixels
        canvas.width = 32;
        canvas.height = 32;
        ctx.drawImage(img, 0, 0, 32, 32);

        // Scale it back up to create pixelated effect
        const pixelatedCanvas = document.createElement('canvas');
        const pixelatedCtx = pixelatedCanvas.getContext('2d');
        pixelatedCanvas.width = 800;
        pixelatedCanvas.height = 600;

        // Use nearest neighbor scaling for true pixelation
        pixelatedCtx.imageSmoothingEnabled = false;
        pixelatedCtx.drawImage(canvas, 0, 0, 800, 600);

        setImageSrc(pixelatedCanvas.toDataURL());
      };
      img.src = src;
    }
  }, [isInView, src, imageSrc]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-neutral-900">
      {imageSrc && (
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover"
          style={{
            imageRendering: 'pixelated',
            filter: 'blur(0px)',
            transform: 'scale(1.05)',
            transition: 'filter 2000ms ease-out, transform 2000ms ease-out'
          }}
        />
      )}

      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-2000ms ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          onLoad={handleImageLoad}
          style={{ imageRendering: 'auto' }}
        />
      )}
    </div>
  );
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const data = DB[slug];

  if (!data) return (
    <div className="space-y-6">
      <p>Project not found.</p>
      <Link to="/projects" className="hover-underline">← Back to projects</Link>
    </div>
  );

  return (
    <div className="space-y-8">
      <Link to="/projects" className="hover-underline text-sm">← Back to projects</Link>
      <header className="space-y-2">
        <h1 className="text-xl font-medium">{data.title}</h1>
        <div className="text-sm text-neutral-400">{data.role} • {data.year}</div>
        <div className="flex flex-wrap gap-2 text-xs text-neutral-300">
          {data.stack.map((s) => (
            <span key={s} className="px-2 py-0.5 border border-neutral-700">{s}</span>
          ))}
        </div>
        {data.intro && <p className="text-neutral-300 pt-2 max-w-prose">{data.intro}</p>}

        {/* Project Links */}
        <div className="flex gap-4 pt-4">
          {data.website && (
            <a
              href={data.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 underline text-white text-sm rounded-md transition-colors duration-200"
            >
              Visit Live Site ↗
            </a>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {data.images.map((src) => (
          <div key={src} className="bg-neutral-900">
            <PixelImage src={src} alt={data.title} />
          </div>
        ))}
      </div>
    </div>
  );
} 
