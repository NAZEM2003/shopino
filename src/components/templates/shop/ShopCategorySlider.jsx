"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from '@/components/modules/product/ProductCard';
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa";

const ShopCategorySlider = ({ products, categoryID }) => {
    return (
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
                products.map((product) => (
                    <SwiperSlide key={product._id}>
                        <ProductCard {...JSON.parse(JSON.stringify(product))} />
                    </SwiperSlide>
                ))
            }
            <SwiperSlide>
                <div className='w-64 h-96 flex items-center justify-center border border-zinc-400 rounded-lg m-3 relative p-2 mx-auto'>

                    <Link
                        className='w-32 h-32 flex items-center justify-center border-2 border-custom-dark-blue rounded-full text-lg font-semibold text-custom-dark-blue hover:bg-custom-dark-blue hover:text-slate-200 transition-all duration-200'
                        href={`/categories/${categoryID}`}
                    >
                        See more <FaArrowRight className='ml-1' />
                    </Link>

                </div>
            </SwiperSlide>
        </Swiper>
    );
}

export default ShopCategorySlider;
