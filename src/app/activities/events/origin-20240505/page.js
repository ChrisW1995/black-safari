'use client';
import React, { useState, useEffect, useRef } from 'react';
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react';

// 自定義 Hook 用於產生影片縮圖
const useVideoThumbnail = (videoUrl, seekTime = 1) => {
  const [thumbnail, setThumbnail] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(document.createElement('canvas'));

  useEffect(() => {
    const generateThumbnail = async () => {
      try {
        const video = videoRef.current;
        video.src = videoUrl;
        
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

    const video = document.createElement('video');
    videoRef.current = video;
    generateThumbnail();

    return () => {
      video.src = '';
    };
  }, [videoUrl, seekTime]);

  return thumbnail;
};

// 實際的媒體數據
const photos = Array.from({ length: 74 }, (_, i) => ({
  id: i + 1,
  title: `2024.5.5 BLACK SAFARI IN ORIGIN ${i + 1}`,
  description: `2024.5.5 BLACK SAFARI IN ORIGIN ${i + 1}`,
  uploadDate: new Date(2024, 5, 5),
  src: `/images/origin-20240505/${i + 1}.jpeg`, // 單一圖片路徑
}));

const videos = [
  {
    id: 1,
    title: "2024.5.5 BLACK SAFARI IN ORIGIN",
    description: "2024.5.5 BLACK SAFARI IN ORIGIN",
    duration: "3:45",
    src: "/videos/origin-20240505/1.mp4"
  },
  {
    id: 2,
    title: "2024.5.5 BLACK SAFARI IN ORIGIN",
    description: "2024.5.5 BLACK SAFARI IN ORIGIN",
    duration: "5:20",
    src: "/videos/origin-20240505/2.mp4"
  }
];

const GRID_SIZE = 16;

const GridContainer = ({ children }) => (
  <div className="grid grid-cols-4 gap-2 w-full aspect-square">
    {children}
  </div>
);

// 視頻卡片元件
const VideoCard = ({ video, onClick }) => {
  const thumbnail = useVideoThumbnail(video.src);

  return (
    <div
      className="group relative cursor-pointer aspect-square"
      onClick={onClick}
    >
      <div className="w-full h-full rounded-md overflow-hidden">
        <img
          src={thumbnail || '/placeholder.jpg'} // 在縮圖生成前顯示預設圖片
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


export default function PhotoGallery() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [currentPhotoPage, setCurrentPhotoPage] = useState(1);
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  const totalPhotoPages = Math.ceil(photos.length / GRID_SIZE);

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
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 py-12">2024.5.5 BLACK SAFARI IN ORIGIN</h1>
        </div>

        {/* Videos Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Play className="w-5 h-5" /> Event Videos
          </h2>
          <div className="grid grid-cols-2 gap-4 bg-gray-900/0 backdrop-blur-sm p-4 rounded-lg">
            {videos.map((video) => (
              <MediaCard key={video.id} item={video} type="video" />
            ))}
          </div>
        </div>

        {/* Photos Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Event Photos ({photos.length})</h2>
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
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <button
              onClick={() => {
                setSelectedMedia(null);
                setMediaType(null);
              }}
              className="absolute top-2 right-2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="w-full max-w-4xl">
              {mediaType === 'video' ? (
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  <video
                    src={selectedMedia.src}
                    controls
                    className="w-full h-full"
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
                <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div className="mt-2">
                <h3 className="text-sm font-bold text-white">{selectedMedia.title}</h3>
                <p className="text-xs text-gray-300">{selectedMedia.description}</p>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
}