"use client"
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddToCart = ({ id, name, price, img, isExist }) => {
    const [quantity, setQuantity] = useState(1);
    
    const decreaseHandler = () => {
        if (quantity <= 1) {
            return false
        }
        setQuantity(prevState => prevState - 1);
    }
    const increaseHandler = () => {
        setQuantity(prevState => prevState + 1);
    }


    const addToCart = async () => {
        if (isExist) {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            if (cart.length) {
                const isIsCart = cart.some(item => item.id === id);
                if (isIsCart) {
                    cart.forEach(item => {
                        if (item.id === id) {
                            item.count = item.count + quantity
                            localStorage.setItem("cart", JSON.stringify(cart));
                            Swal.fire({
                                title: "Done",
                                text: `${item.name} successfully added to your Cart`,
                                icon: "success"
                            });
                        }
                    });
                } else {
                    const cartItem = {
                        id,
                        name,
                        price,
                        img,
                        count: quantity
                    };
                    cart.push(cartItem);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    Swal.fire({
                        title: "Done",
                        text: `${cartItem.name} successfully added to your Cart`,
                        icon: "success"
                    });
                }

            } else {
                const cartItem = {
                    id,
                    name,
                    price,
                    img,
                    count: quantity
                };
                cart.push(cartItem);
                localStorage.setItem("cart", JSON.stringify(cart));
                Swal.fire({
                    title: "Done",
                    text: `${cartItem.name} successfully added to your Cart`,
                    icon: "success"
                });
            }
        }
    }

    return (
        <div className='flex my-6'>
            <div className='border-zinc-500 overflow-hidden w-32 text-3xl border rounded-md flex items-center justify-center'>
                <button className='border-zinc-400 border-r w-10 transition-all hover:text-custom-dark-blue' onClick={decreaseHandler}>-</button>
                <span className='w-12 text-center overflow-hidden'>{quantity}</span>
                <button className='border-zinc-400 border-l w-10 transition-all hover:text-custom-dark-blue' onClick={increaseHandler}>+</button>
            </div>
            <button
                disabled={!isExist}
                onClick={addToCart}
                className={`p-3 rounded-md ${isExist ? "bg-custom-dark-blue border-custom-dark-blue hover:bg-slate-200 hover:text-custom-dark-blue" : " bg-zinc-500"}  border text-slate-200 ml-4 font-semibold transition-all `}
            >Add to Cart</button>
        </div>
    );
}

export default AddToCart;
