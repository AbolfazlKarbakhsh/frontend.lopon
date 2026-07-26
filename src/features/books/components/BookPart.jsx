import React from 'react'
import SliderBox from "@components/global/slider/SliderBox";
import { SwiperSlide } from "swiper/react";
function BookPart({ data }) {
  return (
    <div className="my-4 mb-6">
      <SliderBox slidesPerView={1.1} spaceBetween={10}>

        {data?.map((e, index) => (
          <SwiperSlide key={e?.id || index}>
            <div className='flex flex-col justify-center bg-white items-center space-y-2 
              p-4 rounded-lg font-kal-2 text-md text-justify py-4 shadow-sm  '>
              <h3 className=' font-kal-3 mb-3'> {e?.title} </h3>
              {e?.description}
            </div>
          </SwiperSlide>
        ))}
      </SliderBox>
    </div>
  )
}

export default BookPart