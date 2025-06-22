"use client"
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { bannerSlidesLg } from '@/utils/constants';
import { bannerSlidesSm } from '@/utils/constants';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
//swiper modules
import { Pagination, Autoplay } from 'swiper/modules';

const Banner = () => {
    return (
        <section className={`mx-auto w-11/12 relative text-slate-200 mt-20 rounded-md overflow-hidden`}>
            <div className='hidden sm:block'>
                <Swiper
                    pagination={true}
                    centeredSlides={true}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    loop={true}>
                    {
                        bannerSlidesLg.map((slide, index) => <SwiperSlide key={index}>
                            <div className='w-full h-[85vh] relative'>
                                <Link href="/shop">
                                    <Image className='' src={slide} fill quality={100} alt='slide'/>
                                </Link>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
            <div className='block sm:hidden'>
                <Swiper
                    pagination={true}
                    centeredSlides={true}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    loop={true}>
                    {
                        bannerSlidesSm.map((slide , index) => <SwiperSlide key={index}>
                            <div className='w-full h-[85vh] relative'>
                                <Link href="/shop">
                                    <Image alt='slide' src={slide} fill quality={100} />
                                </Link>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </section>
    );
}

export default Banner;
