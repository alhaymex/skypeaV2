"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarouselImage {
  id: string;
  src: string;
  alt: string;
}

interface CarouselProps {
  carouselState: {
    images: CarouselImage[];
    autoplay: boolean;
    interval: number;
    showArrows: boolean;
    showDots: boolean;
  };
}

export function Carousel({ carouselState }: CarouselProps) {
  const { images, autoplay, interval, showArrows, showDots } = carouselState;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (autoplay && images.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, interval * 1000);

      return () => clearInterval(timer);
    }
  }, [autoplay, interval, images.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-[60vh] bg-gray-100 text-gray-500 text-2xl font-semibold">
        No images to display
      </div>
    );
  }

  return (
    <div className="relative w-full h-[60vh] overflow-hidden bg-black">
      <div
        className="flex h-full transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image) => (
          <div key={image.id} className="w-full h-full flex-shrink-0">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {showArrows && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-amber-600/50 text-white hover:bg-amber-700/70 transition-colors"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-amber-600/50 text-white hover:bg-amber-700/70 transition-colors"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}
      {showDots && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-amber-600"
                  : "bg-gray-400 hover:bg-amber-500"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
