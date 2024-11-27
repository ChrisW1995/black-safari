'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [position, setPosition] = useState('right-8');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPosition('left-4');
      } else {
        setPosition('right-8');
      }
    };

    handleResize(); // 初始檢查
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`fixed top-4 ${position} z-50 flex gap-2`}>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded text-sm ${
          language === 'en'
            ? 'bg-white text-black'
            : 'bg-black/50 text-white hover:bg-black/70'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ja')}
        className={`px-3 py-1 rounded text-sm ${
          language === 'ja'
            ? 'bg-white text-black'
            : 'bg-black/50 text-white hover:bg-black/70'
        }`}
      >
        JP
      </button>
    </div>
  );
}