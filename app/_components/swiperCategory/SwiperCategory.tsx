"use client";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import type { Category } from "@/types/category.type";
export default function SwiperCategory({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Keyboard, Navigation]}
      grabCursor={true}
      slidesPerView={6}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      loop
      className="h-full rounded-lg overflow-hidden "
    >
      {categories.map((category: Category, index: number) => (
        <SwiperSlide key={index}>
          <div className="relative h-full w-full">
            <img
              src={category.image}
              alt={`slide-${index}`}
              className="object-cover w-full h-[250px] "
            />
            <h3 className="absolute bottom-0 left-0 right-0 bg-white/80 text-center p-2">
              {category.name}
            </h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
