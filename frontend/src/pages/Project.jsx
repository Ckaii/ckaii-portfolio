import { useMemo, useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const projects = [
  {
    slug: 'stayfur-web',
    title: 'Stayfur Web App',
    role: 'Full-Stack Developer',
    stack: ['MERN Stack', 'TailwindCSS', 'Zustand', 'Cloudinary', 'Socket.IO'],
    year: 'Nov 2024 — Present',
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
  {
    slug: 'stayfur-mobile',
    title: 'Stayfur Mobile App',
    role: 'React Native Developer',
    stack: ['React Native', 'Expo', 'MongoDB', 'Push Notifications', 'n8n RAG'],
    year: 'June 2025 — Present',
    images: [
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940864/Screenshot_20250811_210608_lf6dgs.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940861/Screenshot_20250811_210615_jdv0ou.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940860/Screenshot_20250811_210726_tphqqk.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940858/Screenshot_20250811_210450_iz2dnl.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940857/Screenshot_20250811_210637_wgh2s6.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940856/Screenshot_20250811_210650_zbtytn.png',
    ],
  },
  {
    slug: 'deepfake-detection',
    title: 'Deepfake Detection Web App',
    role: 'Full-Stack Developer',
    stack: ['NextJS', 'FastAPI', 'PyTorch', 'Docker'],
    year: 'Feb 2025 — Present',
    website: 'https://deepfake-detection-7bdt.onrender.com/',
    images: [
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940844/Screenshot_2025-08-11_at_21-14-11_Deepfake_Detection_v7ybsc.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940841/Screenshot_2025-08-11_at_21-14-19_Deepfake_Detection_ghzkvn.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754940841/Screenshot_2025-08-11_at_21-14-25_Deepfake_Detection_ygiwi3.png',
    ],
  },
  {
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    role: 'Full-Stack Developer',
    stack: ['React', 'Vite', 'TailwindCSS', 'Framer Motion', 'Three.js', 'Nginx', 'Docker', 'Cloudflare'],
    year: 'Jan 2025 — Present',
    images: [
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754936718/Screenshot_2025-08-12_at_01-34-21_CKAII_xrawpp.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754936717/Screenshot_2025-08-12_at_01-33-15_CKAII_yzjz1z.png',
      'https://res.cloudinary.com/dlrowvdgw/image/upload/v1754936716/Screenshot_2025-08-12_at_01-33-56_CKAII_loenyk.png',
    ],
  },
];

const PixelImage = ({ src, alt, to }) => {
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
        pixelatedCanvas.width = 200;
        pixelatedCanvas.height = 150;

        // Use nearest neighbor scaling for true pixelation
        pixelatedCtx.imageSmoothingEnabled = false;
        pixelatedCtx.drawImage(canvas, 0, 0, 200, 150);

        setImageSrc(pixelatedCanvas.toDataURL());
      };
      img.src = src;
    }
  }, [isInView, src, imageSrc]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <Link to={to} className="block group">
      <div ref={containerRef} className="relative overflow-hidden bg-neutral-900 aspect-[4/3]">
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
    </Link>
  );
};

const ProjectCard = ({ p }) => {
  const thumbs = useMemo(() => p.images.slice(0, 6), [p.images]);
  return (
    <article className="space-y-3">
      <header className="flex items-end justify-between">
        <div>
          <Link to={`/projects/${p.slug}`} className="font-medium hover-underline">{p.title}</Link>
          <div className="text-sm text-neutral-400">{p.role}</div>
        </div>
        <div className="text-xs text-neutral-500">{p.year}</div>
      </header>

      <div className="grid grid-cols-3 gap-3">
        {thumbs.map((src) => (
          <PixelImage key={src} src={src} alt={p.title} to={`/projects/${p.slug}`} />
        ))}
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-neutral-300">
        {p.stack.map((s) => (
          <span key={s} className="px-2 py-0.5 border border-neutral-700">{s}</span>
        ))}
      </div>

      <div className="flex gap-4 text-sm">
        <Link to={`/projects/${p.slug}`} className="hover-underline">View More →</Link>
        {p.website && (
          <a href={p.website} target="_blank" rel="noopener noreferrer" className="hover-underline text-blue-400">
            Live Site ↗
          </a>
        )}
        {p.github && (
          <a href={p.github} target="_blank" rel="noopener noreferrer" className="hover-underline text-neutral-400">
            GitHub ↗
          </a>
        )}
      </div>
    </article>
  );
};

const Project = () => {
  return (
    <div className="space-y-10 fade-in">
      <header className="space-y-2">
        <h2 className="text-xl font-medium">Projects</h2>
        <p className="text-neutral-300">A collection of projects showcasing my skills in full‑stack development, mobile app development, and machine learning integration.</p>
      </header>

      <div className="space-y-16">
        {projects.map((p) => (
          <ProjectCard key={p.slug} p={p} />
        ))}
      </div>
    </div>
  );
};

export default Project;
