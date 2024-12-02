'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Volume2, VolumeX } from 'lucide-react';
import ContactForm from '../components/ContactForm';



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
    <div className="min-h-screen text-white">
      {showVideo && <VideoIntro onClose={handleVideoEnd} />}
      
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-white-800 mb-6 text-center">BLACK SAFARI EVENTS</h1>
        <div className="mb-12">
          <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden">
            <img 
              src="/images/1221_poster.jpg" 
              alt="BLACK SAFARI Event" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden mt-6">
            <img 
              src="/images/1221_poster-2.jpg" 
              alt="BLACK SAFARI Event" 
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </div>
  );
}