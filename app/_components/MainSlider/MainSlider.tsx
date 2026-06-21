"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Keyboard, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  "/screens/slider/slider-image-1.jpeg",
  "/screens/slider/slider-image-2.jpeg",
  "/screens/slider/slider-image-3.jpeg",
];

export default function MainSlider() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-12 gap-4 h-[400px]">
        {/* Left Section */}
        <div className="col-span-9 h-full">
          <Swiper
            modules={[Autoplay, Pagination, Keyboard, Navigation]}
            grabCursor={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
            keyboard={{
              enabled: true,
            }}
            loop
            className="h-full rounded-lg overflow-hidden "
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full w-full">
                  <Image
                    src={slide}
                    alt={`slide-${index}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Section (Static) */}
        <div className="col-span-3 flex flex-col gap-4 h-full">
          <div className="relative flex-1 overflow-hidden rounded-lg">
            <Image
              src="/screens/slider/grocery-banner.png"
              alt="banner-1"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>

          <div className="relative flex-1 overflow-hidden rounded-lg">
            <Image
              src="/screens/slider/grocery-banner-2.jpeg"
              alt="banner-2"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
