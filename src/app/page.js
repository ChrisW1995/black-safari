'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Volume2, VolumeX } from 'lucide-react';

const VideoIntro = ({ onClose }) => {
  const videoRef = React.useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [videoSource, setVideoSource] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileScreen = window.innerWidth < 768;
      setIsMobile(isMobileScreen);
      const mobileVideo = "https://i.imgur.com/V0qPywB.mp4";
      const desktopVideo = "https://i.imgur.com/VNK3tIV.mp4";
      setVideoSource(isMobileScreen ? mobileVideo : desktopVideo);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current && videoSource) {
        try {
          videoRef.current.load();
          await videoRef.current.play();
        } catch (error) {
          if (error.name === "NotAllowedError") {
            videoRef.current.muted = true;
            setIsMuted(true);
            await videoRef.current.play();
          }
        }
      }
    };

    if (videoSource) {
      playVideo();
    }
  }, [videoSource]);

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

      {videoSource && (
        <video 
          ref={videoRef}
          autoPlay 
          onEnded={onClose}
          className="w-screen h-screen object-cover"
          playsInline
        >
          <source src={videoSource} type="video/mp4" />
        </video>
      )}
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
          ...
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4"></h2>
            <p className="text-gray-600 mb-6">
              ...
            </p>
            <button 
              onClick={() => router.push('/activities/events')}
              className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300"
            >
              ---
            </button>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4"></h2>
            <p className="text-gray-600 mb-6">
              ...
            </p>
            <button 
              onClick={() => router.push('/activities/intro')}
              className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300"
            >
              ---
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}