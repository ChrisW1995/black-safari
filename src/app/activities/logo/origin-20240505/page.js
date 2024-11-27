import React from 'react';

const GridGallery = () => {
  // 建立從76到102的圖片陣列
  const images = Array.from({ length: 27 }, (_, i) => `/images/origin-20240505/${i + 76}.jpeg`);
  
  return (
    <div className="pt-8 px-4 md:px-8 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative w-full pt-[100%]">
          <div className="absolute inset-0">
            <img
              src={image}
              alt={`Image ${index + 76}`}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridGallery;