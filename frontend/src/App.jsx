import { Route, BrowserRouter as Router, Routes, NavLink, useLocation } from "react-router-dom";
import { Home, About, Contact, Project, Thoughts } from "./pages/index";
import { useState, useEffect } from "react";
import MoonCorner from "./components/MoonCorner";

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [fontSize, setFontSize] = useState("base"); // sm | base | lg
  const [font, setFont] = useState("mono");         // sans | serif | mono
  const [menuOpen, setMenuOpen] = useState(true);   // toggles ONLY nav section
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const [navLoadingText, setNavLoadingText] = useState("");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.remove("light-theme");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light-theme");
    }
  }, [theme]);

  // Initial loading animation effect
  useEffect(() => {
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
        setTimeout(() => setIsLoading(false), 500);
      }
    };

    animationInterval = setInterval(() => {
      animateText();
      currentIndex++;
    }, 150);

    return () => clearInterval(animationInterval);
  }, []);

  const fontClass =
    font === "sans" ? "font-sans" : font === "serif" ? "font-serif" : "font-mono";

  const sizeClass =
    fontSize === "sm"
      ? "text-[15px]"
      : fontSize === "lg"
      ? "text-[19px]"
      : "text-[17px]"; // base (M)

  return (
    <Router>
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
      <MoonCorner />
    </Router>
  );
};

const AppContent = ({ 
  theme, setTheme, fontSize, setFontSize, font, setFont, fontClass, sizeClass, menuOpen, setMenuOpen,
  isLoading, loadingText, isNavigating, navLoadingText, setIsNavigating, setNavLoadingText 
}) => {
  const location = useLocation();

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

  return (
    <main className={`${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} ${fontClass} ${sizeClass} min-h-screen`}>
      {isLoading && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold tracking-widest mb-4 animate-pulse">{loadingText}</div>
            <div className="text-neutral-400 text-sm">Loading...</div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1680px] px-5 md:px-8 pt-10 md:pt-16">
        {/* MAIN only (no top bar). Left column now hosts CKAI + Menu and navigation */}
        <div className="grid gap-10 pb-24 grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)_320px]">
          {/* LEFT - Sticky, includes brand + menu at top */}
          <aside className="md:sticky md:top-8 md:self-start">
            <div className="grid grid-cols-[110px_1fr] items-center mb-6">
              <div className="text-sm tracking-widest">
                {isLoading ? loadingText : (isNavigating ? navLoadingText : "CKAII")}
              </div>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`text-sm transition-colors duration-300 ${theme === "dark" ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-black"}`}
                aria-expanded={menuOpen}
              >
                {menuOpen ? "Menu ↓" : "Menu ←"}
              </button>
            </div>

            <LeftPanel menuOpen={menuOpen} theme={theme}>
              {menuOpen && (
                <div className="mt-10 lg:hidden">
                  <SettingsPanel
                    theme={theme}
                    setTheme={setTheme}
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    font={font}
                    setFont={setFont}
                  />
                </div>
              )}
            </LeftPanel>
          </aside>

          {/* CENTER */}
          <section className="min-w-0 leading-8 flex justify-center mx-10">
            <div className="w-full max-w-4xl">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Project />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/thoughts" element={<Thoughts />} />
              </Routes>
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

const LeftPanel = ({ menuOpen, children, theme }) => {
  const location = useLocation();
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

  const textColor = theme === "dark" ? "text-neutral-400" : "text-neutral-600";
  const linkColor = theme === "dark" ? "text-neutral-300 hover:text-white" : "text-neutral-700 hover:text-black";

  return (
    <dl className="grid grid-cols-[110px_1fr] gap-x-6 gap-y-6">
      {menuOpen && (
        <>
          <dt className={textColor}>Navigation</dt>
          <dd className="space-y-2">
            <NavItem to="/" index="01" label="Info" current={location.pathname} theme={theme} />
            <NavItem to="/about" index="02" label="Work" current={location.pathname} theme={theme} />
            <NavItem to="/projects" index="03" label="Ventures" current={location.pathname} theme={theme} />
            <NavItem to="/contact" index="04" label="Playground" current={location.pathname} theme={theme} />
            <NavItem to="/thoughts" index="05" label="Thoughts" current={location.pathname} theme={theme} />
          </dd>
        </>
      )}

      <dt className={textColor}>Location</dt>
      <dd>Malaysia</dd>

      <dt className={textColor}>Local Time</dt>
      <dd className="tabular-nums">{timeStr}</dd>

      <dt className={textColor}>Education</dt>
      <dd>Monash University</dd>

      <dt className={textColor}>Social</dt>
      <dd><a href="https://github.com/Ckaii" className={`hover:underline underline-offset-4 ${linkColor}`}>GitHub</a></dd>

      <dt className={textColor}>Contact</dt>
      <dd><NavLink to="/contact" className={`hover:underline underline-offset-4 ${linkColor}`}>Contact</NavLink></dd>

      <dt className="hidden lg:block" />
      <dd className="lg:hidden">{children}</dd>
    </dl>
  );
};

const NavItem = ({ to, index, label, current, theme }) => {
  const textColor = theme === "dark" ? "text-neutral-400" : "text-neutral-600";
  const activeColor = theme === "dark" ? "text-white" : "text-black";
  const hoverColor = theme === "dark" ? "text-neutral-300 hover:text-white" : "text-neutral-700 hover:text-black";
  
  return (
    <div className="flex gap-3">
      <span className={`w-10 tabular-nums ${textColor}`}>{index}.</span>
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          `transition-colors duration-300 ${isActive ? `${activeColor} underline underline-offset-4` : hoverColor}`
        }
      >
        {label}{current === to ? " ←" : ""}
      </NavLink>
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
