import React from "react";
import SliderBox from "@components/global/slider/SliderBox";
import { SwiperSlide } from "swiper/react";
import BookCard from "@components/UI/BookCard";

function Book({ bookData }) {

  return (
    <div>
      <SliderBox slidesPerView={2.2} spaceBetween={10} >
        {
          bookData?.data?.map(e => (
            <SwiperSlide className="pr-4" key={e._id}>
              <BookCard e={e}/>
            </SwiperSlide>
          )
          )
        }
      </SliderBox>
    </div>
  );
}

export default Book;
