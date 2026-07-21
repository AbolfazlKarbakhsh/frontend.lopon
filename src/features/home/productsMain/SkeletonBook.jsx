import React from 'react'
import SliderBox from "@components/global/slider/SliderBox";
import { SwiperSlide } from "swiper/react";
function SkeletonBook() {
  return (

    <div className=' '>
      {/* <div className="flex justify-between px-4 items-center">
        <div className="skeleton  h-8 w-[25%]  rounded-lg"></div>
        <div className="skeleton  h-3 w-[20%] me-2 rounded-lg"></div>

      </div> */}
      <div className='my-4 mt-0'>
        <SliderBox slidesPerView={2.2} spaceBetween={10} >

          <SwiperSlide className="pr-4">
            <div className="skeleton  h-[240px]  rounded-lg"></div>
          </SwiperSlide>
          <SwiperSlide className="pr-4">
            <div className="skeleton  h-[240px]  rounded-lg"></div>
          </SwiperSlide>
          <SwiperSlide className="pr-4">
            <div className="skeleton  h-[240px]  rounded-lg"></div>
          </SwiperSlide>
          <SwiperSlide className="pr-4">
            <div className="skeleton  h-[240px]  rounded-lg"></div>
          </SwiperSlide>

        </SliderBox>
      </div>
    </div>
  )
}




export default SkeletonBook