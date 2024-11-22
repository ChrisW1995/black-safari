'use client';
import { useState, useEffect } from 'react';

export default function DateEvolutionPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div className={`
      min-h-screen
      ${isMobile ? 'w-screen px-4' : 'max-w-[calc(100vw-280px)] ml-4 p-4'}
    `}>
      <div className="bg-black/90 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg">
        {/* 主要海報圖片 */}
        <div className="mb-8">
          <div className={`
            aspect-[3/4] rounded-lg overflow-hidden mx-auto
            ${isMobile ? 'w-full' : 'max-w-[600px]'}
          `}>
            <img
              src="/images/1221_poster.jpg"
              alt="BLACK SAFARI IN EVOLUTION OFFICIAL POSTER"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Cast 圖片橫向滾動區域 */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Cast Gallery</h2>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div 
                  key={index} 
                  style={{
                    width: isMobile ? 'calc(100vw - 32px)' : '260px'
                  }}
                  className="flex-shrink-0"
                >
                  <div className="aspect-[3/4] rounded-lg overflow-hidden">
                    <img
                      src={`/images/evolution-${index}.jpg`}
                      alt={`Event Image ${index}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 活動介紹 */}
        <div className="space-y-6 text-white">
          {/* Event Description */}
          <div className="bg-white/10 p-4 md:p-6 rounded-lg space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">2024.12.21(SAT) BLACK SAFARI IN EVOLUTION</h2>
            <p className="text-gray-200">For the last show of 2024, we have the best show yet! This time, there will be 6 shows!</p>
            
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold">DJ Red and White Battle SHOW</h3>
                <p className="text-gray-200">Six top DJs will be divided into red and white groups to battle it out with three different sounds!</p>
                <p className="text-gray-300">[Theme] Vocal Circuit House, Tribal Circuit House, Dark Circuit House</p>
              </div>

              <div className="space-y-4">
                {['☆ GOGO has evolved! A new GOGO SHOW is here! On the enchanted floor, GOGOs will fuse their souls into spirit and phantom Beasts, and appear in the form of transformed warriors!',
                  '☆ GOGO vs. GOGO Dance Battle SHOW!',
                  '☆ Erotic Bed SHOW!',
                  '☆ Taipei Pride Parade (Taipei Ximending International Cultural Festival) GOGO Dance SHOW!',
                  '☆ Erotic GOGO SHOW! From Underwear to stripping them completely: Flag SHOW!'
                ].map((show, index) => (
                  <div key={index} className="border-l-2 border-gray-500 pl-4">
                    <p className="text-gray-200">{show}</p>
                  </div>
                ))}
              </div>

              {/* Cast Information */}
              <div className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-3">DJs</h3>
                  <div className="space-y-2">
                    <p className="text-gray-200">Red group: SHINKAWA, DAI, KAZbou</p>
                    <p className="text-gray-200">White group: CHU*, YUME, TOMO</p>
                    <p className="text-gray-200">TAIWAN SPECIAL DJ: KAI</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-3">GOGO BOY CAST</h3>
                  <div className="space-y-2">
                    <p className="text-gray-200">Spirit Beast Team:</p>
                    <p className="text-gray-300">Nine Tails/GLAY, Kirin/KO, Blue Dragon/SUSUMU, White Tiger/SHINTARO, Phoenix/DD, Black Tortoise/KO-SK</p>
                    <p className="text-gray-200 mt-2">Phantom Beast Team:</p>
                    <p className="text-gray-300">Dragon Bahamut/TEN, Flaming Bull APIS/SAI, Unicorn/YUHI, Deer of Keruneia/RICO, Sheep/HIROYA, Mountain Goat/TEZRO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 時間地點 */}
          <div className="bg-white/10 p-4 md:p-6 rounded-lg">
            <h2 className="text-lg md:text-xl font-semibold mb-3">Time</h2>
            <div className="space-y-2">
              <p>Date&Time: 2024.12.21（SAT）21:00</p>
            </div>
          </div>

          {/* 票務資訊 */}
          <div className="bg-white/10 p-4 md:p-6 rounded-lg">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Ticket Information</h2>
            
            {/* Sales Period */}
            <div className="mb-6">
              <h3 className="text-base md:text-lg font-medium mb-2">Sales Period</h3>
              <p className="text-gray-200">11/22 (FRI) - 12/14 (SAT)</p>
            </div>

            {/* Pre-sale Tickets */}
            <div className="space-y-4">
              <div className="border-l-2 border-blue-500 pl-4">
                <h4 className="font-medium">Early Bird Ticket</h4>
                <p className="text-gray-200">3,000 yen/1D [Priority Admission]</p>
              </div>

              <div className="border-l-2 border-blue-500 pl-4">
                <h4 className="font-medium">BLACK SAFARI & NIKE collaboration costumes</h4>
                <p className="text-gray-200">3,000 yen/1D</p>
              </div>

              <div className="border-l-2 border-green-500 pl-4">
                <h4 className="font-medium">VIP ticket</h4>
                <p className="text-gray-200">6,500 yen/1D [Priority admission, includes Christmas dinner box with your favorite cast member]</p>
              </div>
            </div>

            {/* Door Tickets */}
            <div className="mt-6">
              <h3 className="text-base md:text-lg font-medium mb-3">Ticket prices on the day of the event</h3>
              <div className="space-y-3">
                <p>Out-of-prefecture & overseas discount: 3,200 yen/1D (*Proof of current address)</p>
                <p>AiiRO CAFE&ALAMAS CAFE Discount: 3,200 yen/1D</p>
                <p>9monsters: 3,500 yen/1D</p>
                <p>DOOR: 4,000 yen/1D</p>
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

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}