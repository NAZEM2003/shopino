import Image from 'next/image';
import React from 'react';
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import AddToCart from './AddToCart';
import AddToWishlist from './AddToWishlist';
import { FaTelegram, FaWhatsappSquare, FaLinkedin, FaCheckCircle, FaTimes } from "react-icons/fa";
import ShortDesc from './ShortDesc';
import Link from 'next/link';


const Details = ({product}) => {
    return (
        <main className='mt-20 flex flex-col p-3 lg:flex-row'>
            <div className='h-72 relative flex items-center justify-center'>
                <Image className='lg:mt-14' width={300} height={300} src={decodeURIComponent(product.img)} alt='product image' />
            </div>
            <div className='mt-5 max-w-2xl sm:p-3 lg:mx-auto'>
                <h1 className='text-2xl sm:text-3xl text-zinc-800 font-semibold'>{product.name}</h1>
                <div className='flex items-center text-orange-500 my-5'>
                    {
                        new Array(product.score).fill("").map((item , index)=> <FaStar key={index}/>)
                    }
                    {
                        new Array(5 - product.score).fill("").map((item, index) => <FaRegStar key={index}/>)
                    }
                </div>
                <p className='text-xl text-zinc-800 font-semibold'>{product.price} $</p>
                <p className='mt-3 text-lg'>{product.quantity}</p>
                <ShortDesc desc={product.description} />
                <p className={`${product.isExist ? "text-green-700" : "text-red-700"} flex items-center font-semibold my-5`}>
                    {
                        product.isExist ? "Available" : "not Available"
                    }
                    {
                        product.isExist ? <FaCheckCircle className='ml-2 text-lg' /> : <FaTimes className='ml-2 text-lg' />
                    }
                </p>

                <AddToCart isExist={product.isExist} id={product._id} name={product.name} price={product.price} img={product.img}/>
                <AddToWishlist productID={product._id}/>
                <div className='border-y border-zinc-400'>
                    <p className='my-4 text-zinc-800'><span className='font-semibold'>Category</span> : {product.category.title}</p>
                    <div className='flex items-center text-lg'>
                        Share :
                        <Link className='p-2 text-3xl ml-2 text-sky-500' href="#">
                            <FaTelegram />
                        </Link>

                        <Link className='p-2 text-3xl text-green-500' href="#">
                            <FaWhatsappSquare />
                        </Link>

                        <Link className='p-2 text-3xl text-custom-dark-blue' href="#">
                            <FaLinkedin />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Details;
