import React from 'react';
// Import Swiper React components
import { Swiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


export default function SliderBox({children , slidesPerView,spaceBetween}) {
  return (
    <>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {children}
      </Swiper>
    </>
  );
}
