import React from "react";
import CategoryBox from "@components/global/box/CategoryBox";
import SliderBox from "@components/global/slider/SliderBox";
// Import Swiper React components
import { SwiperSlide } from "swiper/react";
function Catgorys({ cateGorys, loadCateGorys }) {
  return (
    <div className="mt-9 pr-4">
      <SliderBox slidesPerView={3.5} spaceBetween={10}>
        {
          cateGorys?.data?.map((e) => {
            return (
              <SwiperSlide>
                <CategoryBox data={e} />
              </SwiperSlide>
            )
          })
        }

      </SliderBox>
      {(loadCateGorys || !cateGorys) && <SliderBox slidesPerView={3.5} spaceBetween={10}>
        <SwiperSlide>
        <div className="skeleton  h-24  rounded-lg"></div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="skeleton  h-24  rounded-lg"></div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="skeleton  h-24  rounded-lg"></div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="skeleton  h-24  rounded-lg"></div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="skeleton  h-24  rounded-lg"></div>
        </SwiperSlide>
      </SliderBox>}
    </div>
  );
}

export default Catgorys;
