'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Volume2, VolumeX } from 'lucide-react';

const VideoIntro = ({ onClose }) => {
  const videoRef = React.useRef(null);

  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          // 嘗試直接播放（有聲音）
          await videoRef.current.play();
        } catch (error) {
          // 如果失敗，設置為靜音並再次嘗試
          if (error.name === "NotAllowedError") {
            videoRef.current.muted = true;
            setIsMuted(true);
            await videoRef.current.play();
          }
        }
      }
    };

    playVideo();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-[100]">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white p-2 hover:bg-gray-800 rounded-full z-[101]"
      >
        <X size={24} />
      </button>

      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 text-white p-2 hover:bg-gray-800 rounded-full z-[101]"
        title={isMuted ? "開啟聲音" : "靜音"}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      <video 
        ref={videoRef}
        autoPlay 
        onEnded={onClose}
        className="w-screen h-screen object-cover"
        playsInline
      >
        <source src="https://i.imgur.com/V0qPywB.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default function HomePage() {
  const [showVideo, setShowVideo] = useState(true);
  const router = useRouter();

  const handleVideoEnd = () => {
    setShowVideo(false);
  };

  return (
    <div className="min-h-screen">
      {showVideo && <VideoIntro onClose={handleVideoEnd} />}
      
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">BLACK SAFARI</h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          探索運動與社交的無限可能。我們提供專業的運動課程、社交活動和品牌合作機會，
          讓每位參與者都能在這裡找到屬於自己的精彩時刻。
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">最新活動</h2>
            <p className="text-gray-600 mb-6">
              即將舉辦的精彩活動和課程資訊，不容錯過的運動社交體驗。
            </p>
            <button 
              onClick={() => router.push('/activities/events')}
              className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300"
            >
              查看更多
            </button>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">課程報名</h2>
            <p className="text-gray-600 mb-6">
              立即加入我們的專業運動課程，開啟您的健康生活方式。
            </p>
            <button 
              onClick={() => router.push('/activities/intro')}
              className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300"
            >
              立即報名
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}