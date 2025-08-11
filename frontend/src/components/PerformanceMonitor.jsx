import React, { useEffect, useState, useCallback } from 'react';

// Performance monitoring component
export default function PerformanceMonitor({ onMetrics }) {
  const [metrics, setMetrics] = useState({
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
    domLoad: 0,
    windowLoad: 0,
    moonLoad: 0,
    imageLoad: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  // Measure Core Web Vitals
  const measureWebVitals = useCallback(() => {
    // First Contentful Paint
    if ('PerformanceObserver' in window) {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcp = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, fcp: fcp.startTime }));
      });
      fcpObserver.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcp = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, lcp: lcp.startTime }));
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fid = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, fid: fid.processingStart - fid.startTime }));
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let cls = 0;
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        }
        setMetrics(prev => ({ ...prev, cls }));
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }, []);

  // Measure basic performance metrics
  const measureBasicMetrics = useCallback(() => {
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      setMetrics(prev => ({
        ...prev,
        ttfb: navigation.responseStart - navigation.requestStart,
        domLoad: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        windowLoad: navigation.loadEventEnd - navigation.navigationStart,
      }));
    }
  }, []);

  // Measure moon loading time
  const measureMoonLoad = useCallback((startTime) => {
    const loadTime = performance.now() - startTime;
    setMetrics(prev => ({ ...prev, moonLoad: loadTime }));
  }, []);

  // Measure image loading time
  const measureImageLoad = useCallback((startTime) => {
    const loadTime = performance.now() - startTime;
    setMetrics(prev => ({ ...prev, imageLoad: loadTime }));
  }, []);

  // Monitor image loading
  useEffect(() => {
    const images = document.querySelectorAll('img');
    const imageLoadTimes = [];

    images.forEach((img) => {
      const startTime = performance.now();
      
      if (img.complete) {
        imageLoadTimes.push(performance.now() - startTime);
      } else {
        img.addEventListener('load', () => {
          imageLoadTimes.push(performance.now() - startTime);
          if (imageLoadTimes.length === images.length) {
            const avgLoadTime = imageLoadTimes.reduce((a, b) => a + b, 0) / imageLoadTimes.length;
            measureImageLoad(startTime);
          }
        });
      }
    });
  }, [measureImageLoad]);

  // Initialize performance monitoring
  useEffect(() => {
    measureWebVitals();
    measureBasicMetrics();

    // Measure window load time
    if (document.readyState === 'complete') {
      measureBasicMetrics();
    } else {
      window.addEventListener('load', measureBasicMetrics);
      return () => window.removeEventListener('load', measureBasicMetrics);
    }
  }, [measureWebVitals, measureBasicMetrics]);

  // Report metrics to parent component
  useEffect(() => {
    if (onMetrics && Object.values(metrics).some(v => v > 0)) {
      onMetrics(metrics);
    }
  }, [metrics, onMetrics]);

  // Performance score calculation
  const getPerformanceScore = () => {
    let score = 100;
    
    // FCP scoring (0-100)
    if (metrics.fcp > 1800) score -= 20;
    else if (metrics.fcp > 1000) score -= 10;
    
    // LCP scoring (0-100)
    if (metrics.lcp > 4000) score -= 20;
    else if (metrics.lcp > 2500) score -= 10;
    
    // FID scoring (0-100)
    if (metrics.fid > 300) score -= 20;
    else if (metrics.fid > 100) score -= 10;
    
    // CLS scoring (0-100)
    if (metrics.cls > 0.25) score -= 20;
    else if (metrics.cls > 0.1) score -= 10;
    
    return Math.max(0, score);
  };

  const performanceScore = getPerformanceScore();

  // Toggle visibility
  const toggleVisibility = () => setIsVisible(!isVisible);

  if (!isVisible) {
    return (
      <button
        onClick={toggleVisibility}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
      >
        📊 Performance
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Performance Metrics
        </h3>
        <button
          onClick={toggleVisibility}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Performance Score:</span>
          <span className={`font-semibold ${
            performanceScore >= 90 ? 'text-green-600' :
            performanceScore >= 70 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {performanceScore}/100
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">FCP:</span>
          <span className="font-mono">{metrics.fcp.toFixed(0)}ms</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">LCP:</span>
          <span className="font-mono">{metrics.lcp.toFixed(0)}ms</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">FID:</span>
          <span className="font-mono">{metrics.fid.toFixed(0)}ms</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">CLS:</span>
          <span className="font-mono">{metrics.cls.toFixed(3)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">TTFB:</span>
          <span className="font-mono">{metrics.ttfb.toFixed(0)}ms</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Moon Load:</span>
          <span className="font-mono">{metrics.moonLoad.toFixed(0)}ms</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Image Load:</span>
          <span className="font-mono">{metrics.imageLoad.toFixed(0)}ms</span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {performanceScore >= 90 ? '🚀 Excellent performance!' :
           performanceScore >= 70 ? '⚠️ Good performance, room for improvement' :
           '🐌 Performance needs optimization'}
        </div>
      </div>
    </div>
  );
}

// Hook for measuring moon loading performance
export function useMoonPerformance() {
  const [startTime] = useState(performance.now());
  
  const measureLoad = useCallback(() => {
    return performance.now() - startTime;
  }, [startTime]);
  
  return { measureLoad, startTime };
}

// Hook for measuring image loading performance
export function useImagePerformance() {
  const [startTime] = useState(performance.now());
  
  const measureLoad = useCallback(() => {
    return performance.now() - startTime;
  }, [startTime]);
  
  return { measureLoad, startTime };
} 