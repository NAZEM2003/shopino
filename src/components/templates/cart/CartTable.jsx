"use client"
import React, { useEffect, useState } from 'react';
import CartItemBox from './CartItemBox';
import Total from './Total';

const CartTable = () => {
    const [cart, setCart] = useState([]);
    const getCartItems = () => {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(localCart);
    }
    useEffect(() => {
        getCartItems();
    }, []);

    return (
        <div className='lg:flex justify-between xl:justify-between lg:px-5'>
            <section className='mt-20 lg:min-w-[500px] lg:w-6/12'>
                {
                    cart.length ?
                    cart.map(item => <CartItemBox key={item.id} getCartItems={getCartItems} {...item} />)
                    : <h1 className='text-center my-36 text-xl sm:text-3xl text-zinc-800 font-semibold'>There are no Products in Your Cart.</h1>
                }
            </section>
            <section className='lg:w-[400px]'>
                <Total getCartItems={getCartItems} cart={cart} />
            </section>
        </div>
    );
}

export default CartTable;
