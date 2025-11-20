import { useState, useEffect } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const totalDuration = 2500; // Total loading time in ms
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progressPercent = Math.min((elapsed / totalDuration) * 100, 100);

      setProgress(progressPercent);

      if (progressPercent < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // Loading complete
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 500); // Wait for fade out animation
        }, 300);
      }
    };

    // Start the smooth progress animation
    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center">
        {/* Logo Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <img
              src="/logo.avif"
              alt="SMAN 13 DEPOK Logo"
              className="w-full h-full object-contain animate-bounce-subtle"
            />
            {/* Rotating border */}
            <div className="absolute inset-0 border-4 border-orange-200 rounded-full animate-spin opacity-20"></div>
            <div className="absolute inset-2 border-2 border-orange-400 rounded-full animate-spin opacity-40" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>

          {/* School Name with staggered animation */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight animate-fade-in">
              SMAN 13 DEPOK
            </h1>
            <p className="text-lg text-slate-600 font-medium animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Student Council
            </p>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-slate-500 text-lg mb-2">Memuat...</p>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-slate-500 mt-2">{Math.round(progress)}%</p>
        </div>

        {/* Welcome Message */}
        <div className="mt-8 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <p className="text-slate-400 text-sm">Selamat Datang di Website OSIS</p>
        </div>
      </div>
    </div>
  );
}
