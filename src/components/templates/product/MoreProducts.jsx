"use client"
import ProductCard from '@/components/modules/product/ProductCard';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { getMoreProducts } from '@/utils/actions';


const MoreProducts = ({product}) => {
    const [moreProducts , setMoreProducts] = useState([]);
    useEffect(()=>{
        const fetchProducts = async ()=>{
            const data = await getMoreProducts(product.category._id);
            const products = data.filter((item) => item._id !== product._id);
            setMoreProducts(products);
        }
        fetchProducts();
    },[]);
    
    return (
        <section className='my-16 p-2'>
            <h2 className='sm:text-2xl text-xl text-zinc-800 font-semibold p-2 my-10'>more Products</h2>

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
                    moreProducts.map((product) => (
                        <SwiperSlide key={product._id}>
                            <ProductCard {...product}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>
    );
}

export default MoreProducts;
