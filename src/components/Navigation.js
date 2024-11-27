'use client';

import React, { useState, useEffect } from 'react';
import { Menu, ExternalLink } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/content';

const Navigation = () => {
  const { language } = useLanguage();
  const t = translations[language].nav; // 取得當前語言的導航翻譯

  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedMenuId, setExpandedMenuId] = useState(null);

  // 監聽視窗大小變化
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    if (typeof window !== 'undefined') {
      checkIfMobile();
      window.addEventListener('resize', checkIfMobile);
      return () => window.removeEventListener('resize', checkIfMobile);
    }
  }, []);

  const menuItems = [
    {
      id: 1,
      title: t.activities,
      subItems: [
        { id: 'intro-1', title: 'Introduction', path: '/activities/intro/content' }
      ]
    },
    {
      id: 2,
      title: t.ticketing,
      externalLink: 'https://bit.ly/BS1221'
    },
    {
      id: 3,
      title: t.eventDates,
      subItems: [
        { id: 'date-1', title: '2024.12.21（SAT）BLACK SAFARI in EVOLUTION', path: '/activities/dates/evolution' }
      ]
    },
    {
      id: 4,
      title: t.eventReview,
      subItems: [
        { id: 'event-1', title: '2024.5.5 BLACK SAFARI IN ORIGIN', path: '/activities/events/origin' },
        { id: 'event-2', title: '2024.10.25 台北無心戒酒會的合作活動', path: '/activities/events/collaboration1' },
        { id: 'event-3', title: '2024.10.26 TAIWANIZE 台北國際彩虹文化節', path: '/activities/events/rainbow' },
        { id: 'event-4', title: '2024.10.26 Only Friends合作活動', path: '/activities/events/collaboration2' }
      ]
    },
    {
      id: 5,
      title: t.logoIntro,
      subItems: [
        { id: 'logo-1', title: '2024.5.5 BLACK SAFARI IN ORIGIN', path: '/activities/logo/origin' },
        { id: 'logo-2', title: '2024.12.21（SAT）BLACK SAFARI in EVOLUTION', path: '/activities/logo/evolution' }
      ]
    },
    {
      id: 6,
      title: t.partners,
      subItems: [
        { 
          id: 'partner-1', 
          title: 'TAIWANIZE UNDERWEAR', 
          externalLink: 'https://www.taiwanize.com/pages/taiwanize-underwear'
        },
        { 
          id: 'partner-2', 
          title: '9monsters', 
          externalLink: 'https://ninemonsters.com/'
        },
        { 
          id: 'partner-3', 
          title: 'RainbowEvents', 
          externalLink: 'https://www.rbwevents.com/'
        },
        {
          id: 'partner-6',
          title: 'AiSOTOPE',
          externalLink: 'https://aisotope-lounge.net/'
        },
        {
          id: 'partner-7',  
          title: 'AiiRO CAFE',
          externalLink: 'https://aliving.net/'
        },
        {
          id: 'partner-8',
          title: 'ALAMAS CAFE',  
          externalLink: 'https://alamas-cafe.net/'
        },
        {
            id: 'partner-9',
            title: 'absorb',  
            externalLink: 'https://absorb.tokyo/'
          },
        { 
          id: 'partner-4', 
          title: 'BLACK SAFARI & NIKE Collaborative gym wear', 
          path: '/activities/partners/nike' 
        },
        { 
          id: 'partner-5', 
          title: 'BLACK SAFARI & Under Armour Collaborative gym wear', 
          path: '/activities/partners/ua' 
        }
      ]
    },
    {
      id: 7,
      title: t.customerService,
      path: '/activities/service'
    }
  ];

  // 處理選單點擊
  const handleMenuClick = (item) => {
    if (item.externalLink) {
      // 對於外部連結，使用 window.location.href
      window.location.href = item.externalLink;
      if (isMobile) {
        setIsMobileMenuOpen(false);
      }
    } else if (item.subItems?.length > 0) {
      // 展開/收合子選單
      setExpandedMenuId(expandedMenuId === item.id ? null : item.id);
    } else if (item.path) {
      // 內部頁面導航
      router.push(item.path);
      if (isMobile) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  // 處理子選單項目點擊
  const handleSubItemClick = (item) => {
    if (item.externalLink) {
      window.location.href = item.externalLink;
    } else if (item.path) {
      router.push(item.path);
    }
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* 手機版選單按鈕 */}
      {isMobile && (
        <button
          className="fixed top-4 right-4 z-40 p-2 bg-gray-800 text-white rounded hover:bg-gray-700 flex items-center gap-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="text-sm">Menu</span>
          <Menu size={20} />
        </button>
      )}

      {/* 側邊選單 */}
      <aside className={`
        ${isMobile ? 'fixed' : 'relative'} 
        w-64 h-screen z-30 flex flex-col
        ${isMobile ? 'bg-black' : 'backdrop-blur-sm'}
        ${isMobile ? (isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
        transition-transform duration-200 ease-in-out
      `}>
        {/* 主選單區域 */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          <div className="p-4 border-b border-white/20">
            <h1 className="text-xl font-bold text-white">BLACK SAFARI</h1>
          </div>
          <nav className="flex-1 overflow-y-auto px-2">
            {menuItems.map(item => (
              <div key={item.id}>
                {/* 主選單項目 */}
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`w-full text-left py-2 pl-4 hover:bg-white/10 text-white/90
                    ${pathname.includes(item.path) ? 'bg-white/20 font-bold' : ''}
                    ${item.externalLink ? 'hover:text-yellow-200' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    {item.title}
                    {item.externalLink && (
                      <ExternalLink size={16} className="ml-2 opacity-70" />
                    )}
                  </div>
                </button>

                {/* 子選單項目 */}
                {expandedMenuId === item.id && item.subItems && (
                  <div className={isMobile ? 'bg-gray-900' : 'bg-black/20'}>
                    {item.subItems.map(subItem => (
                      <button
                        key={subItem.id}
                        onClick={() => handleSubItemClick(subItem)}
                        className={`w-full text-left py-2 pl-8 text-white/90 text-sm
                          ${isMobile ? 'hover:bg-gray-800' : 'hover:bg-white/10'}
                          ${subItem.externalLink ? 'hover:text-yellow-200' : ''}
                          ${pathname === subItem.path ? (isMobile ? 'bg-gray-800' : 'bg-white/20') : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          {subItem.title}
                          {subItem.externalLink && (
                            <ExternalLink size={14} className="ml-2 opacity-70" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* QR Code 區域 */}
        <div className={`
          p-4 border-t border-white/20
          ${isMobile ? 'mb-[100px]' : ''} // 在手機版時增加底部間距，避免被工具列遮擋
        `}>
          <div className="text-white text-sm mb-3">Follow us:</div>
          <div className="grid grid-cols-2 gap-4">
            {/* X（Twitter）QR Code */}
            <a 
              href="https://x.com/blacksafari2024" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-center hover:opacity-80 transition duration-300"
            >
              <div className="bg-white p-2 rounded-lg mb-1">
                <img 
                  src="/images/x-qr.png" 
                  alt="Follow us on X" 
                  className="w-full h-auto"
                />
              </div>
              <span className="text-white text-xs">X</span>
            </a>
            {/* Instagram QR Code */}
            <a 
              href="https://instagram.com/blacksafari_tokyo" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-center hover:opacity-80 transition duration-300"
            >
              <div className="bg-white p-2 rounded-lg mb-1">
                <img 
                  src="/images/instagram-qr.jpg" 
                  alt="Follow us on Instagram" 
                  className="w-full h-auto"
                />
              </div>
              <span className="text-white text-xs">Instagram</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navigation;