"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductSliderProps {
  images: string[];
  title: string;
}

export default function ProductSlider({ images, title }: ProductSliderProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={20}
        slidesPerView={1}
        className="w-full h-auto rounded-lg"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`${title} - image ${index + 1}`}
              className="w-full h-auto object-contain mix-blend-multiply"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
