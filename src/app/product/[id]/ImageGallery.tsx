"use client";

import { useState } from "react";

type ImageGalleryProps = {
  images: string[];
};

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center bg-gray-200 text-gray-500">
        No Image
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentIndex(
      (currentIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative">
      <img
        src={images[currentIndex]}
        alt={`商品画像 ${currentIndex + 1}`}
        className="h-96 w-full object-contain bg-gray-100"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={previousImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-2 text-2xl text-white hover:bg-black/70"
          >
            ←
          </button>

          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-2 text-2xl text-white hover:bg-black/70"
          >
            →
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}