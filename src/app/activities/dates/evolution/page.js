'use client';
import { useState, useEffect } from 'react';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/content';

export default function DateEvolutionPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);

  const { language } = useLanguage();
  const t = translations[language].dateEvolution; // 取得當前語言的導航翻譯


  // 處理觸控滑動 - 通用函數
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // 通用的觸控結束處理函數
  const handleTouchEnd = (currentIndex, setIndex, totalImages) => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) {
        setIndex((prev) => (prev + 1) % totalImages);
      } else {
        setIndex((prev) => (prev - 1 + totalImages) % totalImages);
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // 監聽視窗大小
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // 海報自動輪播（所有裝置）
  useEffect(() => {
    const posterTimer = setInterval(() => {
      setCurrentPosterIndex((prev) => (prev + 1) % 2);
    }, 4000);

    return () => clearInterval(posterTimer);
  }, []);

  // Cast Gallery 自動輪播（僅在手機版）
  useEffect(() => {
    if (isMobile) {
      const castTimer = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % 6);
      }, 3000);

      return () => clearInterval(castTimer);
    }
  }, [isMobile]);

  const images = [1, 2, 3, 4, 5, 6];
  const posters = [
    '/images/1221_poster.jpg',
    '/images/1221_poster-2.jpg'
  ];

  return (
    <div className="min-h-screen w-full">
      <div className={`mx-auto ${isMobile ? 'w-screen px-4' : 'max-w-[calc(100vw-280px)] ml-4 p-4'}`}>
        <div className="bg-black/90 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg">
          {/* 主要海報圖片區域 */}
          <div className="mb-8 mt-12">
            <div className={`
              relative aspect-[3/4] rounded-lg overflow-hidden mx-auto
              ${isMobile ? 'w-full' : 'max-w-[600px]'}
            `}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => handleTouchEnd(currentPosterIndex, setCurrentPosterIndex, 2)}
            >
              {posters.map((poster, index) => (
                <div
                  key={index}
                  className={`
                    absolute inset-0 transition-opacity duration-500
                    ${currentPosterIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                  `}
                >
                  <img
                    src={poster}
                    alt={`BLACK SAFARI IN EVOLUTION OFFICIAL POSTER ${index + 1}`}
                    className="w-full h-full object-contain bg-black"
                  />
                </div>
              ))}
              
              {/* 海報輪播控制按鈕 */}
              <button
                onClick={() => setCurrentPosterIndex((prev) => (prev - 1 + 2) % 2)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() => setCurrentPosterIndex((prev) => (prev + 1) % 2)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* 海報輪播指示點 */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {[0, 1].map((index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 
                      ${currentPosterIndex === index ? 'bg-white w-4' : 'bg-white/50'}`}
                    onClick={() => setCurrentPosterIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Cast Gallery 區域 */}
          <div className="mb-8">
            <h2 className="text-xl md:text-3xl font-semibold text-white mb-4 text-center">Cast Gallery</h2>
            {isMobile ? (
              // 手機版 - 自動輪播
              <div className="relative">
                <div 
                  className="aspect-[3/4] rounded-lg overflow-hidden"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={() => handleTouchEnd(currentImageIndex, setCurrentImageIndex, 6)}
                >
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`
                        absolute inset-0 transition-opacity duration-500
                        ${currentImageIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                      `}
                    >
                      <img
                        src={`/images/evolution-${index + 1}.jpg`}
                        alt={`Cast Image ${index + 1}`}
                        className="w-full h-full object-contain bg-black"
                      />
                    </div>
                  ))}
                </div>

                {/* 左箭頭 */}
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev - 1 + 6) % 6)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* 右箭頭 */}
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % 6)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* 輪播指示點 */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 
                        ${currentImageIndex === index ? 'bg-white w-4' : 'bg-white/50'}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              // 電腦版 - 自適應顯示
              <div className="w-full overflow-x-auto">
                <div className="min-w-max flex justify-center">
                  <div className="flex gap-4 px-4 pb-4">
                    {images.map((index) => (
                      <div 
                        key={index}
                        className="w-[260px]"
                      >
                        <div className="relative rounded-lg overflow-hidden aspect-[3/4] bg-black">
                          <img
                            src={`/images/evolution-${index}.jpg`}
                            alt={`Cast Image ${index}`}
                            className="absolute inset-0 w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 活動介紹 */}
          <div className="space-y-6 text-white">
            {/* Event Description */}
            <div className="bg-white/10 p-4 md:p-6 rounded-lg space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold">2024.12.21(SAT) BLACK SAFARI IN EVOLUTION</h2>
              <p className="text-gray-200">{t.phase1}</p>
              
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold">{t.DJTitle}</h3>
                  <p className="text-gray-200">{t.DJContent}</p>
                  <p className="text-gray-300">[{t.theme}] Vocal Circuit House, Tribal Circuit House, Dark Circuit House</p>
                </div>

                <div className="space-y-4">
                  {[t.starPhase1,
                    t.starPhase2,
                    t.starPhase3,
                    t.starPhase4,
                    t.starPhase5,
                  ].map((show, index) => (
                    <div key={index} className="border-l-2 border-gray-500 pl-4">
                      <p className="text-gray-200">{show}</p>
                    </div>
                  ))}
                </div>

                {/* Cast Information */}
                <div className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-3">{t.DJInfoTitle}</h3>
                    <div className="space-y-2">
                      <p className="text-gray-200">{t.redGroup} SHINKAWA, DAI, KAZbou</p>
                      <p className="text-gray-200">{t.whiteGroup} CHU*, YUME, TOMO</p>
                      <p className="text-gray-200">TAIWAN SPECIAL DJ: KAI</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-3">GOGO BOY CAST</h3>
                    <div className="space-y-2">
                      <p className="text-gray-200">{t.spiritBeastTitle}</p>
                      <p className="text-gray-300">{t.spiritBeastContent}</p>
                      <p className="text-gray-200 mt-2">{t.phantomBeastTitle}</p>
                      <p className="text-gray-300">{t.phantomBeastContent}</p>
                      <p className="text-gray-200 mt-2">VJ: INASE</p>
                      <p className="text-gray-200 mt-2">BLACK SAFARI BOYS: OKUTO, NARIO</p>
                      <p className="text-gray-200 mt-2">PHOTOGRAPHER: CHAN</p>
                      <p className="text-gray-200 mt-2">VIDEOGRAPHPHER: Megumi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 時間地點 */}
            <div className="bg-white/10 p-4 md:p-6 rounded-lg">
              <h2 className="text-lg md:text-xl font-semibold mb-3">{t.timeTitle}</h2>
              <div className="space-y-2">
                <p>{t.timeContent}</p>
              </div>
            </div>

            {/* 票務資訊 */}
            <div className="bg-white/10 p-4 md:p-6 rounded-lg">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Ticket Information</h2>

              {/* Pre-sale Tickets */}
              <div className="space-y-4">
                <div className="border-l-2 border-blue-500 pl-4">
                  <h4 className="font-medium">{t.earlyBirdTitle}</h4>
                  <p className="text-gray-200">{t.earlyBirdContent}</p>
                </div>

                <div className="border-l-2 border-blue-500 pl-4">
                  <h4 className="font-medium">{t.collabCostumesTitle}</h4>
                  <p className="text-gray-200">{t.collabCostumesContent}</p>
                </div>

                <div className="border-l-2 border-green-500 pl-4">
                  <h4 className="font-medium">{t.VIPTitle}</h4>
                  <p className="text-gray-200">{t.VIPContent}</p>
                </div>
              </div>

              {/* Door Tickets */}
              <div className="mt-6">
                <h3 className="text-base md:text-lg font-medium mb-3">{t.ticketDayTitle}</h3>
                <div className="space-y-3">
                  <p>{t.ticketDayContent1}</p>
                  <p>{t.ticketDayContent2}</p>
                  <p>{t.ticketDayContent3}</p>
                  <p>{t.ticketDayContent4}</p>
                </div>
              </div>

              <button 
                onClick={() => window.location.href = 'https://bit.ly/BS1221'}
                className="mt-6 bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full transition duration-300 w-full"
              >
                Purchase Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}