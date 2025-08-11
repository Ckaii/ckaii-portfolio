// components/MoonCorner.jsx
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

// -------- asset URL resolver --------
const getAssetUrl = (path) => {
  if (import.meta.env.DEV) {
    return path.startsWith('/') ? path.substring(1) : path;
  } else {
    return path.startsWith('/') ? path : `/${path}`;
  }
};

// -------- optimized texture loader (for fallback sphere) --------
function useOptimizedTexture(urls) {
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
          tex.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          tex.magFilter = THREE.LinearFilter;
          tex.generateMipmaps = true;
          tex.needsUpdate = true;
          setTexture(tex);
          break;
        } catch { }
      }
    })();

    return () => { isActive = false; };
  }, [urls, gl]);

  return texture;
}

// -------- fallback sphere (when GLB not found) --------
function FallbackSphere({ scale = 2.8, isMobile = false }) {
  const actualScale = isMobile ? scale * 0.8 : scale;
  const albedo = useOptimizedTexture(
    useMemo(
      () => [
        getAssetUrl('moon_albedo.jpg'),
        getAssetUrl('moon.jpg'),
        getAssetUrl('textures/moon/albedo.jpg'),
        'https://www.solarsystemscope.com/textures/download/2k_moon.jpg',
        'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/moon_1024.jpg',
      ],
      []
    )
  );

  return (
    <mesh scale={actualScale} castShadow receiveShadow>
      <sphereGeometry args={[1, 64, 64]} />
      {albedo ? (
        <meshStandardMaterial
          map={albedo}
          bumpMap={albedo}
          bumpScale={0.085}
          roughness={0.94}
          metalness={0}
          transparent={false}
          depthTest
          depthWrite
        />
      ) : (
        <meshStandardMaterial color="#d9d9d9" roughness={0.95} metalness={0} depthTest depthWrite />
      )}
    </mesh>
  );
}

// -------- GLTF moon (auto-fit) --------
function GLTFMoonMesh({ url, isMobile = false }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = o.receiveShadow = true;
        if (o.material) {
          if ('roughness' in o.material) o.material.roughness = 0.94;
          if ('metalness' in o.material) o.material.metalness = 0.0;
          o.material.transparent = false;
          o.material.depthTest = true;
          o.material.depthWrite = true;
          o.material.needsUpdate = true;
        }
      }
    });

    // auto-fit to a nice size
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const target = isMobile ? 1.6 : 1.8; // tweak to taste
    scene.scale.setScalar((1 / maxDim) * target);
    scene.position.set(0, 0, 0);
  }, [scene, isMobile]);

  return <primitive object={scene} />;
}

// -------- tiny components to signal "ready" --------
function ModelReadySignal({ url, onReady }) {
  useGLTF(url);                     // suspends until parsed + cached
  const fired = useRef(false);
  useEffect(() => {
    if (!fired.current) { fired.current = true; onReady?.(); }
  }, [onReady]);
  return null;                      // renders nothing
}

function FallbackReadySignal({ onReady }) {
  useEffect(() => { onReady?.(); }, [onReady]);
  return null;
}

// -------- interactive wrapper (rotation from mouse) --------
function InteractiveMoon({ hasGlb, hasAltGlb, mouse, isMobile = false }) {
  const groupRef = useRef(null);
  const lastUpdate = useRef(0);

  useFrame((state) => {
    if (!groupRef.current) return;
    if (state.clock.elapsedTime - lastUpdate.current < 1 / 60) return;
    lastUpdate.current = state.clock.elapsedTime;

    const targetX = -mouse.current.y * 0.35;
    const targetY = mouse.current.x * 0.45;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.08;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {hasAltGlb ? (
        <GLTFMoonMesh url={getAssetUrl('moon(2).glb')} isMobile={isMobile} />
      ) : hasGlb ? (
        <GLTFMoonMesh url={getAssetUrl('moon.glb')} isMobile={isMobile} />
      ) : (
        <FallbackSphere isMobile={isMobile} />
      )}
    </group>
  );
}

// -------- main component --------
export default function MoonCorner({ onLoad }) {
  const [hasGlb, setHasGlb] = useState(false);
  const [hasAltGlb, setHasAltGlb] = useState(false);

  const mouse = useRef({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: window.innerWidth - 140, y: window.innerHeight - 140 });
  const [layout, setLayout] = useState(() => (window.innerWidth < 1024 ? 'bottom' : 'right'));
  const [isSmallMobile, setIsSmallMobile] = useState(() => window.innerWidth < 480);

  // pointer tracking (throttled)
  useEffect(() => {
    let raf = 0;
    let lastMove = 0;
    const onMove = (e) => {
      const now = performance.now();
      if (now - lastMove < 16) return;
      lastMove = now;

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

  // responsive layout
  useEffect(() => {
    let resizeTimeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setLayout(window.innerWidth < 1024 ? 'bottom' : 'right');
        setIsSmallMobile(window.innerWidth < 480);
      }, 100);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // probe which GLB exists (no onLoad here!)
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [a, b] = await Promise.allSettled([
          fetch(getAssetUrl('/moon.glb'), { method: 'HEAD' }),
          fetch(getAssetUrl('/moon(2).glb'), { method: 'HEAD' }),
        ]);
        if (!active) return;
        const okA = a.status === 'fulfilled' && a.value.ok;
        const okB = b.status === 'fulfilled' && b.value.ok;
        setHasGlb(!!okA);
        setHasAltGlb(!!okB);
      } catch {
        if (!active) return;
        setHasGlb(false);
        setHasAltGlb(false);
      }
    })();
    return () => { active = false; };
  }, []);

  // container style (mask for both layouts to avoid a visible square)
  const containerStyle = useMemo(() => {
    if (layout === 'bottom') {
      return {
        left: '50%',
        bottom: isSmallMobile ? '-250px' : '-200px', // Restored original positioning
        transform: 'translateX(-50%)',
        width: isSmallMobile ? '500px' : '600px', // Restored original size
        height: isSmallMobile ? '500px' : '600px', // Restored original size
        WebkitMaskImage: 'radial-gradient(60% 50% at 50% 100%, #fff 60%, rgba(255,255,255,0) 100%)',
        maskImage: 'radial-gradient(60% 50% at 50% 100%, #fff 60%, rgba(255,255,255,0) 100%)',
      };
    } else {
      return {
        right: '-120px',
        bottom: '-120px',
        width: '520px',
        height: '520px',
      };
    }
  }, [layout, isSmallMobile]);

  const cornerGlow = useMemo(() => {
    if (layout === 'bottom') {
      return `radial-gradient(100vw 80vh at 50% calc(100% - 150px), rgba(160,180,255,0.10) 0%, rgba(0,0,0,0) 80%)`;
    }
    return `radial-gradient(100vw 95vh at calc(100% - 110px) calc(100% - 110px), rgba(160,180,255,0.12) 0%, rgba(0,0,0,0) 72%)`;
  }, [layout, isSmallMobile]);

  return (
    <>
      {/* global glow */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background:
            `radial-gradient(1400px 1400px at ${glowPos.x}px ${glowPos.y}px, rgba(190,205,255,0.18) 0%, rgba(176,195,255,0.10) 28%, rgba(176,195,255,0.04) 55%, rgba(0,0,0,0) 75%),` +
            cornerGlow,
          filter: 'blur(58px)',
          mixBlendMode: 'screen',
          opacity: isSmallMobile ? 0.6 : 0.9,
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'background 120ms ease-out',
        }}
      />

      {/* canvas */}
      <div
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 1,
          background: 'transparent',
          touchAction: 'none',
          ...containerStyle,
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 3.1], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            premultipliedAlpha: false,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
            logarithmicDepthBuffer: false,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.0;
            gl.outputColorSpace = THREE.SRGBColorSpace;
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
          }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            {/* fire onLoad ONLY when the chosen asset is actually parsed */}
            {hasAltGlb ? (
              <ModelReadySignal url={getAssetUrl('moon(2).glb')} onReady={onLoad} />
            ) : hasGlb ? (
              <ModelReadySignal url={getAssetUrl('moon.glb')} onReady={onLoad} />
            ) : (
              <FallbackReadySignal onReady={onLoad} />
            )}

            <ambientLight intensity={0.36} />
            <directionalLight position={[4.6, -3.6, 2.6]} intensity={1.35} />
            <hemisphereLight skyColor={0xbfd3ff} groundColor={0x0a0a0a} intensity={0.14} />

            <InteractiveMoon
              hasGlb={hasGlb}
              hasAltGlb={hasAltGlb}
              mouse={mouse}
              isMobile={isSmallMobile}
            />

            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}

// Optional warmup to shorten the splash:
useGLTF.preload('/moon.glb');
useGLTF.preload('/moon(2).glb');

