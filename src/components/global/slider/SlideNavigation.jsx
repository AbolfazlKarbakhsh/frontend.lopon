import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


function SlideNavigation({slides}) {
  return (
    <div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper bg-gray-300 h-[59vw] flex-center w-full mt-4"
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
      >
        {slides.map((e) => (
          <SwiperSlide className="wh-full flex-center" key={Math.random()}>
            <img src={`${e.imageUrl}`} className="wh-full" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SlideNavigation;
