import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import MoonGLTF from './MoonGLTF.jsx';
import moon2Url from '../assets/moon(2).glb?url';

// Load first available texture from list of URLs
function useFallbackTexture(urls) {
  const { gl } = useThree();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    let isActive = true;
    const loader = new THREE.TextureLoader();
    (async () => {
      for (const url of urls) {
        try {
          const tex = await new Promise((resolve, reject) => {
            loader.load(url, resolve, undefined, reject);
          });
          if (!isActive) return;
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = Math.min(16, gl.capabilities.getMaxAnisotropy());
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          tex.magFilter = THREE.LinearFilter;
          tex.generateMipmaps = true;
          tex.needsUpdate = true;
          setTexture(tex);
          break;
        } catch (_e) {
          // try next URL
        }
      }
    })();
    return () => {
      isActive = false;
    };
  }, [urls, gl]);

  return texture;
}

function FallbackSphere({ scale = 2.8 }) {
  const albedo = useFallbackTexture(
    useMemo(
      () => [
        '/moon_albedo.jpg',
        '/moon.jpg',
        '/textures/moon/albedo.jpg',
        'https://www.solarsystemscope.com/textures/download/2k_moon.jpg',
        'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/moon_1024.jpg',
      ],
      []
    )
  );

  return (
    <mesh scale={scale} castShadow receiveShadow>
      <sphereGeometry args={[1, 128, 128]} />
      {albedo ? (
        <meshStandardMaterial map={albedo} bumpMap={albedo} bumpScale={0.085} roughness={0.94} metalness={0} />
      ) : (
        <meshStandardMaterial color="#d9d9d9" roughness={0.95} metalness={0} />
      )}
    </mesh>
  );
}

function GLTFMoonMesh({ url, scale = 2.4 }) {
  const { scene } = useGLTF(url);
  useEffect(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        if (o.material) {
          if ('roughness' in o.material) o.material.roughness = 0.94;
          if ('metalness' in o.material) o.material.metalness = 0.0;
          o.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);
  return <primitive object={scene} scale={scale} />;
}

function InteractiveMoon({ hasGlb, hasAltGlb, mouse }) {
  const groupRef = useRef(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetX = -mouse.current.y * 0.35;
    const targetY = mouse.current.x * 0.45;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.06;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.06;
  });

  return (
    <group ref={groupRef}>
      {hasAltGlb ? (
        <MoonGLTF url={moon2Url} />
      ) : hasGlb ? (
        <GLTFMoonMesh url="/moon.glb" />
      ) : (
        <FallbackSphere />
      )}
    </group>
  );
}

export default function MoonCorner() {
  const [hasGlb, setHasGlb] = useState(false);
  const [hasAltGlb, setHasAltGlb] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: window.innerWidth - 140, y: window.innerHeight - 140 });
  const [layout, setLayout] = useState(() => (window.innerWidth < 1024 ? 'bottom' : 'right'));

  // Pointer tracking for rotation + full-screen glow
  useEffect(() => {
    let raf = 0;
    const onMove = (e) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setGlowPos({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  // Update responsive layout on resize
  useEffect(() => {
    const onResize = () => setLayout(window.innerWidth < 1024 ? 'bottom' : 'right');
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Detect GLBs
  useEffect(() => {
    let active = true;
    Promise.allSettled([
      fetch('/moon.glb', { method: 'HEAD' }),
      fetch(moon2Url, { method: 'HEAD' }),
    ])
      .then(([a, b]) => {
        if (!active) return;
        const okA = a.status === 'fulfilled' && a.value.ok;
        const okB = b.status === 'fulfilled' && b.value.ok;
        setHasGlb(!!okA);
        setHasAltGlb(!!okB);
      })
      .catch(() => {
        if (!active) return;
        setHasGlb(false);
        setHasAltGlb(false);
      });
    return () => {
      active = false;
    };
  }, []);

  // Build styles based on layout
  const containerStyle = layout === 'right'
    ? {
        right: '-120px',
        bottom: '-120px',
        width: '520px',
        height: '520px',
      }
    : {
        left: '50%',
        bottom: '-140px',
        transform: 'translateX(-50%)',
        width: '720px',
        height: '720px',
        WebkitMaskImage: 'radial-gradient(70% 60% at 50% 100%, #fff 70%, rgba(255,255,255,0) 100%)',
        maskImage: 'radial-gradient(70% 60% at 50% 100%, #fff 70%, rgba(255,255,255,0) 100%)',
      };

  const cornerGlow = layout === 'right'
    ? `radial-gradient(100vw 95vh at calc(100% - 110px) calc(100% - 110px), rgba(160,180,255,0.12) 0%, rgba(0,0,0,0) 72%)`
    : `radial-gradient(120vw 100vh at 50% calc(100% - 100px), rgba(160,180,255,0.12) 0%, rgba(0,0,0,0) 72%)`;

  return (
    <>
      {/* Full-screen moonlight that follows the pointer, with layout-aware bias */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background:
            `radial-gradient(1400px 1400px at ${glowPos.x}px ${glowPos.y}px, rgba(190,205,255,0.18) 0%, rgba(176,195,255,0.10) 28%, rgba(176,195,255,0.04) 55%, rgba(0,0,0,0) 75%),` +
            cornerGlow,
          filter: 'blur(58px)',
          mixBlendMode: 'screen',
          opacity: 0.9,
          pointerEvents: 'none',
          zIndex: 0, // keep behind content
          transition: 'background 120ms ease-out',
        }}
      />

      {/* Canvas positioned so moon center is outside viewport edge */}
      <div
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 0, // behind content
          background: 'transparent',
          ...containerStyle,
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 3.1], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, premultipliedAlpha: false, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.0;
            gl.outputColorSpace = THREE.SRGBColorSpace;
          }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.36} />
            {/* Stronger key, softer fill to shape craters */}
            <directionalLight position={[4.6, -3.6, 2.6]} intensity={1.35} />
            <hemisphereLight skyColor={0xbfd3ff} groundColor={0x0a0a0a} intensity={0.14} />
            <InteractiveMoon hasGlb={hasGlb} hasAltGlb={hasAltGlb} mouse={mouse} />
            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
} 