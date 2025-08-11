import { Route, BrowserRouter as Router, Routes, NavLink, useLocation } from "react-router-dom";
import { Home, About, Contact, Project, ProjectDetail } from "./pages/index";
import { useState, useEffect, useCallback } from "react";
import MoonCorner from "./components/MoonCorner";
import { Motion, fadeInUp } from './components/MotionUtils';
import { AnimatePresence, motion } from 'framer-motion';

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [fontSize, setFontSize] = useState("base"); // sm | base | lg
  const [font, setFont] = useState("mono");         // sans | serif | mono
  const [menuOpen, setMenuOpen] = useState(true);   // toggles ONLY nav section

  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const [navLoadingText, setNavLoadingText] = useState("");

  const [isMoonLoaded, setIsMoonLoaded] = useState(false);
  const [textAnimationDone, setTextAnimationDone] = useState(false);

  // Load user prefs once
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedFontSize = localStorage.getItem('fontSize');
    const savedFont = localStorage.getItem('font');
    if (savedTheme) setTheme(savedTheme);
    if (savedFontSize) setFontSize(savedFontSize);
    if (savedFont) setFont(savedFont);
  }, []);

  // Persist prefs
  useEffect(() => { localStorage.setItem('theme', theme); }, [theme]);
  useEffect(() => { localStorage.setItem('fontSize', fontSize); }, [fontSize]);
  useEffect(() => { localStorage.setItem('font', font); }, [font]);

  // Apply theme to root
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.remove("light-theme");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light-theme");
    }
  }, [theme]);

  // Moon loading handler - users can only enter after moon is loaded
  const handleMoonLoad = useCallback(() => {
    setIsMoonLoaded(true);
  }, []);

  // Start text animation ONLY after moon is loaded
  useEffect(() => {
    if (!isMoonLoaded) return;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    const targetText = "CKAII";
    let currentIndex = 0;
    let animationInterval;

    const animateText = () => {
      if (currentIndex < targetText.length) {
        let randomText = "";
        for (let i = 0; i < targetText.length; i++) {
          if (i < currentIndex) randomText += targetText[i];
          else if (i === currentIndex) randomText += characters[Math.floor(Math.random() * characters.length)];
          else randomText += " ";
        }
        setLoadingText(randomText);
      } else {
        setLoadingText(targetText);
        clearInterval(animationInterval);
        setTextAnimationDone(true); // ✅ animation finished
      }
    };

    animationInterval = setInterval(() => {
      animateText();
      currentIndex++;
    }, 150);

    return () => clearInterval(animationInterval);
  }, [isMoonLoaded]);

  // Gate entry: BOTH moon loaded AND text animation done
  useEffect(() => {
    if (isMoonLoaded && textAnimationDone) {
      const t = setTimeout(() => setIsLoading(false), 500); // small grace for smooth fade
      return () => clearTimeout(t);
    }
  }, [isMoonLoaded, textAnimationDone]);

  const fontClass = font === "sans" ? "font-sans" : font === "serif" ? "font-serif" : "font-mono";
  const sizeClass = fontSize === "sm" ? "text-[15px]" : fontSize === "lg" ? "text-[19px]" : "text-[17px]"; // base (M)

  return (
    <Router>
      {/* Blocking loading screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold tracking-widest mb-4 animate-pulse">{loadingText}</div>
            <div className="text-neutral-400 text-sm">
              {isMoonLoaded ? "Loading..." : "Loading Moon Model..."}
            </div>
            {!isMoonLoaded && (
              <div className="mt-4 text-xs text-neutral-500">
                Please wait while the 3D moon model loads...
              </div>
            )}
          </div>
        </div>
      )}

      {/* App content appears only after moon + animation are done */}
      {!isLoading && (
        <AppContent
          theme={theme}
          setTheme={setTheme}
          fontSize={fontSize}
          setFontSize={setFontSize}
          font={font}
          setFont={setFont}
          fontClass={fontClass}
          sizeClass={sizeClass}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          isLoading={isLoading}
          loadingText={loadingText}
          isNavigating={isNavigating}
          navLoadingText={navLoadingText}
          setIsNavigating={setIsNavigating}
          setNavLoadingText={setNavLoadingText}
        />
      )}

      {/* Moon renderer; calls onLoad() when model is ready */}
      <MoonCorner onLoad={handleMoonLoad} />
    </Router>
  );
};

const AppContent = ({
  theme, setTheme, fontSize, setFontSize, font, setFont, fontClass, sizeClass, menuOpen, setMenuOpen,
  isLoading, loadingText, isNavigating, navLoadingText, setIsNavigating, setNavLoadingText
}) => {
  const location = useLocation();

  // Per-route micro loading animation
  useEffect(() => {
    if (!isLoading) {
      setIsNavigating(true);
      setNavLoadingText("");
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
      const targetText = "CKAII";
      let currentIndex = 0;
      let animationInterval;

      const animateNavText = () => {
        if (currentIndex < targetText.length) {
          let randomText = "";
          for (let i = 0; i < targetText.length; i++) {
            if (i < currentIndex) randomText += targetText[i];
            else if (i === currentIndex) randomText += characters[Math.floor(Math.random() * characters.length)];
            else randomText += " ";
          }
          setNavLoadingText(randomText);
        } else {
          setNavLoadingText(targetText);
          clearInterval(animationInterval);
          setTimeout(() => setIsNavigating(false), 300);
        }
      };

      animationInterval = setInterval(() => { animateNavText(); currentIndex++; }, 100);
      return () => clearInterval(animationInterval);
    }
  }, [location.pathname, isLoading, setIsNavigating, setNavLoadingText]);

  // Smooth scroll top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Staggered variants
  const listVariants = {
    hidden: { transition: { staggerChildren: 0.08, staggerDirection: -1, delayChildren: 0.1 } },
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.95 },
    visible: {
      opacity: 1, x: 0, scale: 1,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: {
      opacity: 0, x: -20, scale: 0.95,
      transition: { duration: 0.3, ease: [0.55, 0.055, 0.675, 0.19] }
    },
  };

  return (
    <main className={`${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} ${fontClass} ${sizeClass} min-h-screen`}>
      <div className="mx-auto max-w-[1680px] px-5 md:px-8 pt-24 md:pt-28 lg:pt-32">
        {/* MAIN grid */}
        <div className="grid gap-10 pb-24 grid-cols-1 md:grid-cols-[320px_minmax(0,1fr)] lg:grid-cols-[380px_minmax(0,1fr)_360px]">
          {/* LEFT */}
          <aside className="md:sticky md:top-8 md:self-start md:pl-3 lg:pl-4">
            <div className="grid grid-cols-[140px_1fr] items-center mb-8">
              <Motion.div className="tracking-widest" variants={fadeInUp} initial="initial" animate="animate">
                {isLoading ? loadingText : (isNavigating ? navLoadingText : "CKAII")}
              </Motion.div>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`no-focus-outline inline-flex items-center gap-2 transition-colors duration-300 ${theme === "dark" ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-black"}`}
                aria-expanded={menuOpen}
              >
                <span>Menu</span>
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
                    <motion.span key="down" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}>↓</motion.span>
                  ) : (
                    <motion.span key="left" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}>←</motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* Navigation */}
            <AnimatePresence initial={false} mode="wait">
              {menuOpen && (
                <motion.div
                  key="nav-block"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
                  exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
                >
                  <dl className="grid grid-cols-[140px_1fr] gap-x-6 gap-y-6">
                    <dt className={theme === "dark" ? "text-neutral-400" : "text-neutral-600"}>
                      <span>Navigation</span>
                    </dt>
                    <dd className="space-y-2">
                      <motion.div variants={listVariants} initial="hidden" animate="visible" exit="hidden">
                        {[
                          { to: '/', index: '01', label: 'Info' },
                          { to: '/about', index: '02', label: 'About' },
                          { to: '/projects', index: '03', label: 'Projects' },
                          { to: '/contact', index: '04', label: 'Contacts' },
                        ].map((item, index) => (
                          <motion.div key={item.to} variants={itemVariants} custom={index}>
                            <NavItem to={item.to} index={item.index} label={item.label} current={location.pathname} theme={theme} />
                          </motion.div>
                        ))}
                      </motion.div>
                    </dd>

                    <dt className={theme === "dark" ? "text-neutral-400" : "text-neutral-600"}>Location</dt>
                    <dd>Malaysia</dd>

                    <dt className={theme === "dark" ? "text-neutral-400" : "text-neutral-600"}>Local Time</dt>
                    <dd className="tabular-nums">{new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}</dd>

                    <dt className={theme === "dark" ? "text-neutral-400" : "text-neutral-600"}>Education</dt>
                    <dd>Monash University</dd>

                    <dt className={theme === "dark" ? "text-neutral-400" : "text-neutral-600"}>Contact</dt>
                    <dd>
                      <NavLink to="/contact" className={`hover:underline underline-offset-4 ${theme === "dark" ? "text-neutral-300 hover:text-white" : "text-neutral-700 hover:text-black"}`}>
                        Contact
                      </NavLink>
                    </dd>

                    <dt className="hidden lg:block" />
                    <dd className="lg:hidden mt-12">
                      <SettingsPanel
                        theme={theme}
                        setTheme={setTheme}
                        fontSize={fontSize}
                        setFontSize={setFontSize}
                        font={font}
                        setFont={setFont}
                      />
                    </dd>
                  </dl>
                </motion.div>
              )}
            </AnimatePresence>
          </aside>

          {/* CENTER */}
          <section className="min-w-0 leading-8 flex justify-center">
            <div className="w-full max-w-[550px] mx-auto pt-32 md:pt-36 lg:pt-40">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } }}
                >
                  <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Project />} />
                    <Route path="/projects/:slug" element={<ProjectDetail />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          {/* RIGHT (desktop only) */}
          <aside id="settings" className="hidden lg:block">
            <div className="sticky top-8">
              <SettingsPanel
                theme={theme}
                setTheme={setTheme}
                fontSize={fontSize}
                setFontSize={setFontSize}
                font={font}
                setFont={setFont}
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

/* ---------------- Left panel ---------------- */

const NavItem = ({ to, index, label, current, theme }) => {
  const textColor = theme === "dark" ? "text-neutral-400" : "text-neutral-600";
  const activeColor = theme === "dark" ? "text-white" : "text-black";
  const hoverColor = theme === "dark" ? "text-neutral-300 hover:text-white" : "text-neutral-700 hover:text-black";
  const routeIsActive = current === to;

  return (
    <div className="flex gap-3 items-baseline">
      <span className={`w-10 tabular-nums ${textColor}`}>{index}.</span>
      <div className="inline-flex items-baseline">
        <NavLink
          to={to}
          end
          className={({ isActive: linkActive }) => `no-focus-outline transition-colors duration-300 ${linkActive ? `${activeColor} underline underline-offset-4` : hoverColor}`}
        >
          {label}
        </NavLink>
        <AnimatePresence initial={false}>
          {routeIsActive && (
            <motion.span
              key="active-arrow"
              className="ml-1"
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.4 } }}
              exit={{ opacity: 0, x: -4, transition: { duration: 0.30 } }}
              aria-hidden
            >
              &#8592;
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ---------------- Settings (text-only, grey→white) ---------------- */

const SettingsPanel = ({ theme, setTheme, fontSize, setFontSize, font, setFont }) => {
  const TxtBtn = ({ active, onClick, children }) => {
    const baseColor = theme === "dark" ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-black";
    const activeColor = theme === "dark" ? "text-white" : "text-black";

    return (
      <button
        onClick={onClick}
        className={`text-sm transition-colors duration-300 ${active ? activeColor : baseColor}`}
      >
        {children}
      </button>
    );
  };

  const labelColor = theme === "dark" ? "text-neutral-400" : "text-neutral-600";

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <div className={labelColor}>Settings</div>
      </section>

      <section className="space-y-2">
        <div className={labelColor}>Theme</div>
        <div className="flex gap-4">
          <TxtBtn active={theme === "light"} onClick={() => setTheme("light")}>Light</TxtBtn>
          <TxtBtn active={theme === "dark"} onClick={() => setTheme("dark")}>Dark</TxtBtn>
        </div>
      </section>

      <section className="space-y-2">
        <div className={labelColor}>Font</div>
        <div className="flex gap-4">
          <TxtBtn active={font === "sans"} onClick={() => setFont("sans")}>Aa</TxtBtn>
          <TxtBtn active={font === "serif"} onClick={() => setFont("serif")}>Aa</TxtBtn>
          <TxtBtn active={font === "mono"} onClick={() => setFont("mono")}>Aa</TxtBtn>
        </div>
      </section>

      <section className="space-y-2">
        <div className={labelColor}>Font Size</div>
        <div className="flex gap-4">
          <TxtBtn active={fontSize === "sm"} onClick={() => setFontSize("sm")}>S</TxtBtn>
          <TxtBtn active={fontSize === "base"} onClick={() => setFontSize("base")}>M</TxtBtn>
          <TxtBtn active={fontSize === "lg"} onClick={() => setFontSize("lg")}>L</TxtBtn>
        </div>
      </section>
    </div>
  );
};

export default App;

