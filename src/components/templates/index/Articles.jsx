"use client"
import React from 'react';
import Article from '@/modules/articles/Article';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


const Articles = () => {
  const arr = new Array(4).fill("");
  return (
    <section className='my-16 p-2'>
      <h2 className='sm:text-2xl text-xl text-zinc-800 font-semibold p-2 my-10'>Articles</h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className='p-52'
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          940: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
      >
        {
          arr.map((item , index) => (
            <SwiperSlide key={index}>
              <Article />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </section>
  );
}

export default Articles;