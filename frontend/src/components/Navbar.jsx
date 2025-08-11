import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const navigationItems = [
    { path: '/', label: '01. Info' },
    { path: '/about', label: '02. Work' },
    { path: '/projects', label: '03. Ventures' },
    { path: '/contact', label: '04. Playground' },
    { path: '/thoughts', label: '05. Thoughts' }
  ];

  return (
    <div>
      <h2 className={`text-lg-mono font-medium mb-6 transition-all duration-500 ease-out ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        Navigation
      </h2>
      <nav className="space-y-4">
        {navigationItems.map((item, index) => (
          <NavLink 
            key={item.path}
            to={item.path} 
            className={({ isActive }) => 
              `block text-base-mono hover-underline transition-all duration-500 ease-out transform hover:translate-x-2 ${
                isActive ? 'nav-active' : ''
              } ${
                isLoaded 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-4'
              }`
            }
            style={{ 
              transitionDelay: `${(index + 1) * 0.1}s`,
              animationDelay: `${(index + 1) * 0.1}s`
            }}
          >
            {item.label}
      </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;

