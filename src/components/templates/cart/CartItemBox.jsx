"use client"
import Image from 'next/image';
import React from 'react';
import { FaTrashCan } from 'react-icons/fa6';

const CartItemBox = ({ name, img, price, count , id,getCartItems }) => {

    const decreaseHandler = () => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        if (count > 1) {
            cart.forEach(item => {
                if (item.id === id) {
                    item.count = item.count - 1
                    localStorage.setItem("cart", JSON.stringify(cart));
                    getCartItems();
                }
            })
        }
        else {
            const newCart = cart.filter(item => item.id !== id);
            localStorage.setItem("cart", JSON.stringify(newCart));
            getCartItems();
        }
    };
    
    const increaseHandler = () => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        cart.forEach(item => {
            if (item.id === id) {
                item.count = item.count + 1
                localStorage.setItem("cart", JSON.stringify(cart));
                getCartItems();
            }
        })
    };


    return (
        <div className='p-2 border border-zinc-500 rounded-lg my-12 max-w-md mx-auto sm:max-w-[600px]'>
            <div className='sm:flex items-center'>
                <div className='flex items-center min-w-52 w-full max-w-80'>
                    <div className='relative w-16 h-16 min-w-14'>
                        <Image src={decodeURIComponent(img)} fill alt={name}/>
                    </div>
                    <h1 className='ml-5 text-xl font-semibold text-zinc-800 max-w-60 text-wrap'>{name}</h1>
                </div>

                <div className='flex items-center mt-5 sm:mt-0 sm:ml-5'>
                    <p className='text-lg font-semibold text-zinc-800'>Price :</p>
                    <p className='ml-10 text-lg font-medium'>{price.toLocaleString()} $</p>
                </div>
            </div>

            <div className='sm:flex items-center sm:mt-7'>
                <div className='overflow-hidden w-32 my-4 sm:mr-48 text-3xl flex items-center justify-center'>
                    <button onClick={decreaseHandler} className={`border border-custom-dark-blue bg-custom-dark-blue rounded-md text-slate-200 w-10 h-10 transition-all ${count > 1 ? "hover:text-custom-dark-blue" : "hover:text-red-600"} hover:bg-slate-200 flex items-center justify-center`}>
                        {
                            count > 1 ? "-" : <FaTrashCan className='text-xl' />
                        }
                    </button>

                    <span className='w-12 h-10 text-center overflow-hidden'>{count}</span>

                    <button onClick={increaseHandler} className='border border-custom-dark-blue bg-custom-dark-blue rounded-md text-slate-200 w-10 h-10 transition-all hover:text-custom-dark-blue hover:bg-slate-200 flex items-center justify-center'>+</button>

                </div>

                <div className='flex items-center sm:ml-5'>
                    <p className='text-lg font-semibold text-zinc-800'>Total :</p>
                    <p className='ml-10 text-lg font-medium'>{(price * count).toFixed(2)} $</p>
                </div>
            </div>
        </div>
    );
}

export default CartItemBox;
