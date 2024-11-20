'use client';

import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const Navigation = () => {
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
      title: '活動介紹',
      subItems: [
        { id: 1, title: '介紹內容', path: '/activities/intro/content' }
      ]
    },
    {
      id: 2,
      title: '開辦日期',
      subItems: [
        { id: 1, title: '2024.12.21（SAT）BLACK SAFARI in EVOLUTION', path: '/activities/dates/evolution' }
      ]
    },
    {
      id: 3,
      title: '精彩活動回顧',
      subItems: [
        { id: 1, title: '2024.5.5 BLACK SAFARI IN ORIGIN', path: '/activities/events/origin' },
        { id: 2, title: '2024.10.25 台北無心戒酒會的合作活動', path: '/activities/events/collaboration1' },
        { id: 3, title: '2024.10.26 TAIWANIZE 台北國際彩虹文化節', path: '/activities/events/rainbow' },
        { id: 4, title: '2024.10.26 Only Friends合作活動', path: '/activities/events/collaboration2' }
      ]
    },
    {
      id: 4,
      title: 'BLACK SAFARI 的LOGO介紹',
      subItems: [
        { id: 1, title: '2024.5.5 BLACK SAFARI IN ORIGIN', path: '/activities/logo/origin' },
        { id: 2, title: '2024.12.21（SAT）BLACK SAFARI in EVOLUTION', path: '/activities/logo/evolution' }
      ]
    },
    {
      id: 5,
      title: '合作廠商',
      subItems: [
        { 
          id: 1, 
          title: 'TAIWANIZE UNDERWEAR', 
          externalLink: 'https://www.taiwanize.com/pages/taiwanize-underwear'
        },
        { 
          id: 2, 
          title: '9monsters', 
          externalLink: 'https://ninemonsters.com/'
        },
        { 
          id: 3, 
          title: 'BLACK SAFARI & NIKE Collaborative gym wear', 
          path: '/activities/partners/nike' 
        },
        { 
          id: 4, 
          title: 'BLACK SAFARI & Under Armour Collaborative gym wear', 
          path: '/activities/partners/ua' 
        }
      ]
    },
    {
      id: 6,
      title: 'Customer Service',
      path: '/activities/service',
      subItems: []
    }
  ];

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
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/20">
            <h1 className="text-xl font-bold text-white">BLACK SAFARI</h1>
          </div>
          <nav className="flex-1 overflow-y-auto px-2">
            {menuItems.map(item => (
              <div key={item.id}>
                {/* 主選單項目 */}
                <button
                  onClick={() => {
                    if (item.subItems?.length > 0) {
                      setExpandedMenuId(expandedMenuId === item.id ? null : item.id);
                    } else if (item.path) {
                      router.push(item.path);
                      if (isMobile) {
                        setIsMobileMenuOpen(false);
                      }
                    }
                  }}
                  className={`w-full text-left py-2 pl-4 text-white/90
                    ${isMobile ? 'hover:bg-gray-800' : 'hover:bg-white/10'}
                    ${pathname.includes(item.path) ? (isMobile ? 'bg-gray-800' : 'bg-white/20') : ''} 
                    font-medium`}
                >
                  {item.title}
                </button>

                {/* 子選單項目 */}
                {expandedMenuId === item.id && item.subItems && (
                  <div className={isMobile ? 'bg-gray-900' : 'bg-black/20'}>
                    {item.subItems.map(subItem => (
                      subItem.externalLink ? (
                        // 外部連結
                        <a
                          key={subItem.id}
                          href={subItem.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`block w-full text-left py-2 pl-8 text-white/90 text-sm
                            ${isMobile ? 'hover:bg-gray-800' : 'hover:bg-white/10'}`}
                          onClick={() => {
                            if (isMobile) {
                              setIsMobileMenuOpen(false);
                            }
                          }}
                        >
                          {subItem.title}
                        </a>
                      ) : (
                        // 內部頁面連結
                        <button
                          key={subItem.id}
                          onClick={() => {
                            router.push(subItem.path);
                            if (isMobile) {
                              setIsMobileMenuOpen(false);
                            }
                          }}
                          className={`w-full text-left py-2 pl-8 text-white/90 text-sm
                            ${isMobile ? 'hover:bg-gray-800' : 'hover:bg-white/10'}
                            ${pathname === subItem.path ? (isMobile ? 'bg-gray-800' : 'bg-white/20') : ''}`}
                        >
                          {subItem.title}
                        </button>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* QR Code 區域 */}
        <div className="p-4 border-t border-white/20">
          <div className="text-white text-sm mb-3">關注我們的社群媒體</div>
          <div className="grid grid-cols-2 gap-4">
            {/* X（Twitter）QR Code */}
            <a 
              href="https://twitter.com/your-account" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-center hover:opacity-80 transition duration-300"
            >
              <div className="bg-white p-2 rounded-lg mb-1 hover:shadow-lg transition duration-300">
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
              href="https://instagram.com/your-account" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-center hover:opacity-80 transition duration-300"
            >
              <div className="bg-white p-2 rounded-lg mb-1 hover:shadow-lg transition duration-300">
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