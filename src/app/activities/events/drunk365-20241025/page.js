'use client';

import React, { useState, useRef } from 'react';
import { X, Play } from 'lucide-react';

// 視頻播放器元件
const VideoPlayer = ({ src, onLoadStart, onLoadedData }) => {
  const videoRef = useRef(null);

  useEffect(() => {
      // 嘗試在 iOS 上自動載入 metadata
      if (videoRef.current) {
        videoRef.current.load();
      }
    }, [src]);

  return (
    <video
      ref={videoRef}
      className="w-full h-full"
      controls
      playsInline
      muted // 初始靜音，有助於在某些移動瀏覽器上自動播放
      preload="metadata"
      controlsList="nodownload" // 防止下載
      onLoadStart={onLoadStart}
      onLoadedData={onLoadedData}
      // 添加多個視頻源以提高兼容性
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

// 視頻卡片元件
const VideoCard = ({ video, onClick }) => {
  return (
    <div
      className="group relative cursor-pointer aspect-video"
      onClick={onClick}
    >
      <div className="w-full h-full rounded-md overflow-hidden">
        <img
          src={video.poster || '/default-video-thumbnail.jpg'}
          alt={video.title}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
            <Play className="text-white w-4 h-4" />
          </div>
          <span className="text-white text-xs mt-1">{video.duration}</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-end p-2">
        <div>
          <h3 className="text-xs font-semibold text-white truncate">{video.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default function PhotoGallery() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  
  // 單一視頻資料
  const video = {
    id: 1,
    title: "2024.10.25 台北無心戒酒會的合作活動",
    description: "2024.10.25 台北無心戒酒會的合作活動",
    duration: "0:38",
    src: "/videos/drunk365-20241025/drunk365-20241025.mp4",
    poster: "/videos/drunk365-20241025/drunk365.jpg"
  };

  return (
    <div className="min-h-screen px-4 md:px-6 py-12">
      <div className="w-full max-w-4xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <div className="text-center py-6 md:py-12">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
          2024.10.25 台北無心戒酒會的合作活動
          </h1>
        </div>

        {/* Video Section */}
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-white flex items-center gap-2">
            <Play className="w-5 h-5" /> Event Video
          </h2>
          <div className="grid grid-cols-1 gap-4 bg-gray-900/0 backdrop-blur-sm p-4 rounded-lg">
            <VideoCard
              video={video}
              onClick={() => {
                setSelectedMedia(video);
                setMediaType('video');
              }}
            />
          </div>
        </div>

        {/* Modal for video player */}
        {selectedMedia && mediaType === 'video' && (
          <div className="fixed inset-0 bg-black/95 z-50">
            <button
              onClick={() => {
                setSelectedMedia(null);
                setMediaType(null);
              }}
              className="absolute top-7 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-50"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full max-h-screen flex flex-col items-center justify-center px-4 py-16">
                <div className="w-full max-w-4xl flex flex-col items-center space-y-4">
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden w-full">
                    <VideoPlayer
                      src={selectedMedia.src}
                      onLoadStart={() => setIsVideoLoading(true)}
                      onLoadedData={() => setIsVideoLoading(false)}
                    />
                    {isVideoLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
                      </div>
                    )}
                  </div>
                  <div className="w-full text-center">
                    <h3 className="text-sm font-bold text-white">{selectedMedia.title}</h3>
                    <p className="text-xs text-gray-300">{selectedMedia.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}