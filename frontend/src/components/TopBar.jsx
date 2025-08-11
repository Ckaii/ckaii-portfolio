import { useState, useEffect, useRef } from 'react';

const TopBar = ({ 
  focusMode, 
  setFocusMode, 
  theme, 
  setTheme, 
  fontSize, 
  setFontSize, 
  font, 
  setFont
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef(null);

  // Close settings when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="h-15 border-b border-gray-800 px-4 md:px-8 py-4 flex justify-between items-center">
      {/* Left side - Logo */}
      <div className="text-xl-mono font-medium">
        CKAI
      </div>

      {/* Center - Empty space for balance */}
      <div></div>

      {/* Right side - Settings and Focus Mode */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Settings */}
        <div className="relative" ref={settingsRef}>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="text-base-mono hover-underline"
          >
            Settings
          </button>
          {showSettings && (
            <div className="absolute top-full right-0 mt-2 bg-black border border-gray-800 p-4 min-w-48 z-50 animate-fadeIn">
              <div className="space-y-4">
                {/* Theme */}
                <div>
                  <div className="text-sm-mono mb-2">Theme</div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setTheme('light')}
                      className={`text-xs-mono px-2 py-1 border transition-all duration-200 ${
                        theme === 'light' ? 'border-white bg-white text-black' : 'border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      Light
                    </button>
                    <button 
                      onClick={() => setTheme('dark')}
                      className={`text-xs-mono px-2 py-1 border transition-all duration-200 ${
                        theme === 'dark' ? 'border-white bg-white text-black' : 'border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      Dark
                    </button>
                  </div>
                </div>

                {/* Font */}
                <div>
                  <div className="text-sm-mono mb-2">Font</div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setFont('sans')}
                      className={`text-xs-mono px-2 py-1 border transition-all duration-200 ${
                        font === 'sans' ? 'border-white bg-white text-black' : 'border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      Aa
                    </button>
                    <button 
                      onClick={() => setFont('serif')}
                      className={`text-xs-mono px-2 py-1 border transition-all duration-200 ${
                        font === 'serif' ? 'border-white bg-white text-black' : 'border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      Aa
                    </button>
                    <button 
                      onClick={() => setFont('mono')}
                      className={`text-xs-mono px-2 py-1 border transition-all duration-200 ${
                        font === 'mono' ? 'border-white bg-white text-black' : 'border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      Aa
                    </button>
                  </div>
                </div>

                {/* Font Size */}
                <div>
                  <div className="text-sm-mono mb-2">Font Size</div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setFontSize('sm')}
                      className={`text-xs-mono px-2 py-1 border transition-all duration-200 ${
                        fontSize === 'sm' ? 'border-white bg-white text-black' : 'border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      S
                    </button>
                    <button 
                      onClick={() => setFontSize('base')}
                      className={`text-xs-mono px-2 py-1 border transition-all duration-200 ${
                        fontSize === 'base' ? 'border-white bg-white text-black' : 'border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      M
                    </button>
                    <button 
                      onClick={() => setFontSize('lg')}
                      className={`text-xs-mono px-2 py-1 border transition-all duration-200 ${
                        fontSize === 'lg' ? 'border-white bg-white text-black' : 'border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      L
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Focus Mode */}
        <button 
          onClick={() => setFocusMode(!focusMode)}
          className={`text-base-mono hover-underline transition-all duration-200 ${
            focusMode ? 'text-gray-400' : ''
          }`}
        >
          Focus Mode
        </button>
      </div>
    </header>
  );
};

export default TopBar; 