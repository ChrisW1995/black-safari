import React from 'react';

const GridGallery = () => {
  // 假设已有一个图片数组
  const images = [
    '/images/logo/logo-1.jpg',
    '/images/logo/logo-2.jpg',
    '/images/logo/logo-3.jpg',
    '/images/logo/logo-4.jpg',
    '/images/logo/logo-5.jpg',
    '/images/logo/logo-6.jpg',
    '/images/logo/logo-7.jpg',
    '/images/logo/logo-8.jpg',
    '/images/logo/logo-9.jpg',
    '/images/logo/logo-10.jpg',
    '/images/logo/logo-11.jpg',
    '/images/logo/logo-12.jpg'
  ];
  return (
    <div className="pt-8 px-4 md:px-8 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {images.map((image, index) => (
        <div key={index} className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
          <img
            src={image}
            alt={`Image ${index}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default GridGallery;