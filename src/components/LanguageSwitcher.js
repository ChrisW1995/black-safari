'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // 初始檢查
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`
      fixed z-50 flex gap-1
      ${isMobile ? 'top-4 right-[105px] top-[20px]' : 'top-4 right-8'}
    `}>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded text-sm ${
          language === 'en'
            ? 'bg-white text-black'
            : 'bg-black/50 text-white hover:bg-black/70'
        } transition-colors`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ja')}
        className={`px-2 py-1 rounded text-sm ${
          language === 'ja'
            ? 'bg-white text-black'
            : 'bg-black/50 text-white hover:bg-black/70'
        } transition-colors`}
      >
        JP
      </button>
    </div>
  );
}