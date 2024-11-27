'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react';

// 更新 GridContainer 元件，添加響應式設計
const GridContainer = ({ children }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 w-full">
    {children}
  </div>
);

const useVideoThumbnail = (videoUrl, seekTime = 1) => {
  const [thumbnail, setThumbnail] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }

    const generateThumbnail = async () => {
      try {
        const video = videoRef.current;
        video.src = videoUrl;
        video.playsInline = true;  // 添加 playsInline
        video.preload = "metadata"; // 添加 preload
        
        await new Promise((resolve) => {
          video.onloadeddata = () => {
            video.currentTime = seekTime;
          };
          video.onseeked = resolve;
        });

        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const thumbnailUrl = canvas.toDataURL();
        setThumbnail(thumbnailUrl);
      } catch (error) {
        console.error('Error generating thumbnail:', error);
      }
    };

    if (!videoRef.current) {
      videoRef.current = document.createElement('video');
    }
    generateThumbnail();

    return () => {
      if (videoRef.current) {
        videoRef.current.src = '';
      }
    };
  }, [videoUrl, seekTime]);

  return thumbnail;
};

// 實際的媒體數據
const photos = Array.from({ length: 102 }, (_, i) => ({
  id: i + 1,
  title: `2024.5.5 BLACK SAFARI IN ORIGIN`,
  description: `2024.5.5 BLACK SAFARI IN ORIGIN`,
  uploadDate: new Date(2024, 5, 5),
  src: `/images/origin-20240505/${i + 1}.jpeg`, // 單一圖片路徑
}));

const videos = [
  {
    id: 1,
    title: "2024.5.5 BLACK SAFARI IN ORIGIN",
    description: "2024.5.5 BLACK SAFARI IN ORIGIN",
    duration: "1:51",
    src: "/videos/origin-20240505/1.mp4",
    poster: "/videos/origin-20240505/1-thumbnail.jpg"
  },
  {
    id: 2,
    title: "2024.5.5 BLACK SAFARI IN ORIGIN",
    description: "2024.5.5 BLACK SAFARI IN ORIGIN",
    duration: "0:47",
    src: "/videos/origin-20240505/2.mp4",
    poster: "/videos/origin-20240505/1-thumbnail.jpg"
  },
  {
    id: 3,
    title: "2024.5.5 BLACK SAFARI IN ORIGIN",
    description: "2024.5.5 BLACK SAFARI IN ORIGIN",
    duration: "1:23",
    src: "/videos/origin-20240505/3.mp4",
    poster: "/videos/origin-20240505/3-thumbnail.jpg"
  },
  {
    id: 4,
    title: "2024.5.5 BLACK SAFARI IN ORIGIN",
    description: "2024.5.5 BLACK SAFARI IN ORIGIN",
    duration: "2:05",
    src: "/videos/origin-20240505/4.mp4",
    poster: "/videos/origin-20240505/4-thumbnail.jpg"
  }
];

const GRID_SIZE = 16;

// 視頻卡片元件
const VideoCard = ({ video, onClick }) => {
  return (
    <div
      className="group relative cursor-pointer aspect-square"
      onClick={onClick}
    >
      <div className="w-full h-full rounded-md overflow-hidden">
        <img
          src={video.poster || '/default-video-thumbnail.jpg'} // 使用預設的縮圖
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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

const VideoPlayer = ({ src, onLoadStart, onLoadedData }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 處理播放錯誤
    const handleError = (error) => {
      console.error('Video playback error:', error);
      video.load(); // 重新加載視頻
    };

    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="w-full h-full"
      playsInline
      controls
      preload="metadata"
      controlsList="nodownload"
      onLoadStart={onLoadStart}
      onLoadedData={onLoadedData}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default function PhotoGallery() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [currentPhotoPage, setCurrentPhotoPage] = useState(1);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentVideoPage, setCurrentVideoPage] = useState(1);
  const [isMobile, setIsMobile] = useState(true); // 預設為 mobile 視圖

  const totalPhotoPages = Math.ceil(photos.length / GRID_SIZE);

  const VIDEO_ITEMS_PER_PAGE = {
    mobile: 1,    // 手機版一次顯示1個
    desktop: 2    // 桌面版一次顯示2個
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // 初始檢查
    checkMobile();

    // 監聽視窗大小變化
    window.addEventListener('resize', checkMobile);
    
    // 清理函數
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
 // 獲取當前頁面要顯示的影片
 const getCurrentVideos = (page) => {
  const itemsPerPage = isMobile ? VIDEO_ITEMS_PER_PAGE.mobile : VIDEO_ITEMS_PER_PAGE.desktop;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return videos.slice(start, end);
};

// 計算影片總頁數
const getTotalVideoPages = () => {
  const itemsPerPage = isMobile ? VIDEO_ITEMS_PER_PAGE.mobile : VIDEO_ITEMS_PER_PAGE.desktop;
  return Math.ceil(videos.length / itemsPerPage);
};
  // 監聽視窗大小變化，重新計算頁數
  useEffect(() => {
    const totalPages = getTotalVideoPages();
    if (currentVideoPage > totalPages) {
      setCurrentVideoPage(1);
    }
  }, [isMobile, currentVideoPage]);

  const VideoPaginationControls = ({ currentPage, setPage }) => {
    const totalPages = getTotalVideoPages();
    
    return (
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          className="p-2 text-white bg-gray-800/50 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm text-gray-300">
          {currentPage} / {totalPages}
        </span>
        <button
          className="p-2 text-white bg-gray-800/50 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

// 添加鍵盤導航功能
useEffect(() => {
  const handleKeyPress = (e) => {
    if (!selectedMedia || mediaType !== 'photo') return;
    
    if (e.key === 'ArrowLeft') {
      navigateMedia('prev');
    } else if (e.key === 'ArrowRight') {
      navigateMedia('next');
    } else if (e.key === 'Escape') {
      setSelectedMedia(null);
      setMediaType(null);
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, [selectedMedia, mediaType]);



// 導航函數
const navigateMedia = useCallback((direction) => {
  if (!selectedMedia || mediaType !== 'photo' || isNavigating) return;

  setIsNavigating(true);
  const currentIndex = photos.findIndex(photo => photo.id === selectedMedia.id);
  let newIndex;

  if (direction === 'next') {
    newIndex = currentIndex + 1 >= photos.length ? 0 : currentIndex + 1;
  } else {
    newIndex = currentIndex - 1 < 0 ? photos.length - 1 : currentIndex - 1;
  }

  setSelectedMedia(photos[newIndex]);
  
  // 防止快速連點
  setTimeout(() => {
    setIsNavigating(false);
  }, 300);
}, [selectedMedia, mediaType, isNavigating]);


  const getCurrentPhotos = (page) => {
    const start = (page - 1) * GRID_SIZE;
    const end = start + GRID_SIZE;
    const pageItems = photos.slice(start, end);
    const padding = Array(GRID_SIZE - pageItems.length).fill(null);
    return [...pageItems, ...padding];
  };

  const MediaCard = ({ item, type }) => {
    if (!item) return <div className="aspect-square bg-gray-800/30 rounded-md" />;

    if (type === 'video') {
      return (
        <VideoCard
          video={item}
          onClick={() => {
            setSelectedMedia(item);
            setMediaType('video');
          }}
        />
      );
    }

    return (
      <div
        className="group relative cursor-pointer aspect-square"
        onClick={() => {
          setSelectedMedia(item);
          setMediaType('photo');
        }}
      >
        <div className="w-full h-full rounded-md overflow-hidden">
          <img
            src={item.src}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-end p-2">
          <div>
            <h3 className="text-xs font-semibold text-white truncate">{item.title}</h3>
          </div>
        </div>
      </div>
    );
  };

  const PaginationControls = ({ currentPage, totalPages, setPage }) => (
    <div className="flex items-center justify-center gap-4 mt-4">
      <button
        className="p-2 text-white bg-gray-800/50 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <span className="text-sm text-gray-300">
        {currentPage} / {totalPages}
      </span>
      <button
        className="p-2 text-white bg-gray-800/50 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen px-4 md:px-6 py-12">
      <div className="w-full max-w-4xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <div className="text-center py-6 md:py-12">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            2024.5.5 BLACK SAFARI IN ORIGIN
          </h1>
        </div>

        {/* Videos Section */}
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-white flex items-center gap-2">
            <Play className="w-5 h-5" /> Event Videos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-900/0 backdrop-blur-sm p-4 rounded-lg">
            {getCurrentVideos(currentVideoPage).map((video) => (
              <MediaCard key={video.id} item={video} type="video" />
            ))}
          </div>
          <VideoPaginationControls 
            currentPage={currentVideoPage}
            setPage={setCurrentVideoPage}
          />
        </div>

        {/* Photos Section */}
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            Event Photos ({photos.length})
          </h2>
          <GridContainer>
            {getCurrentPhotos(currentPhotoPage).map((photo, index) => (
              <MediaCard key={photo?.id || index} item={photo} type="photo" />
            ))}
          </GridContainer>
          <PaginationControls
            currentPage={currentPhotoPage}
            totalPages={totalPhotoPages}
            setPage={setCurrentPhotoPage}
          />
        </div>

        {/* Modal for enlarged view */}
        {selectedMedia && (
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
      {mediaType === 'photo' && (
        <>
          <button
            onClick={() => navigateMedia('prev')}
            className="absolute left-2 z-50 h-12 w-12 flex items-center justify-center text-white rounded-full bg-black/50 hover:bg-black/70 transition-colors touch-manipulation"
            aria-label="Previous photo"
            disabled={isNavigating}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => navigateMedia('next')}
            className="absolute right-2 z-50 h-12 w-12 flex items-center justify-center text-white rounded-full bg-black/50 hover:bg-black/70 transition-colors touch-manipulation"
            aria-label="Next photo"
            disabled={isNavigating}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div className="w-full h-full max-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-4xl flex flex-col items-center space-y-4">
          {mediaType === 'video' ? (
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
          ) : (
            <>
              <div className="relative bg-black rounded-lg overflow-hidden">
                <img
                  src={selectedMedia.src}
                  alt={selectedMedia.title}
                  className="w-full h-auto max-h-[75vh] object-contain mx-auto"
                  loading="eager"
                />
              </div>
              {/* 計數器移到圖片下方 */}
              <div className="text-white text-sm">
                {`${photos.findIndex(p => p.id === selectedMedia.id) + 1} / ${photos.length}`}
              </div>
            </>
          )}
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