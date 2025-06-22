"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FcLike } from 'react-icons/fc';
import { FaRegHeart } from "react-icons/fa";
import Link from 'next/link';
import { authUser, getUserWish } from '@/utils/actions';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { loginRegisterMethods } from '@/utils/constants';
import { FaTrashCan } from "react-icons/fa6";

const ProductCard = ({ img, name, price, off, _id, isExist }) => {
    const router = useRouter();
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isIncart, setIsInCart] = useState(false);
    const [cartItem, setCartItem] = useState(false);

    const checkIsInCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.map(item => {
            if (item.id == _id) {
                setIsInCart(true);
                setCartItem(item);
            }
        })
    };
    const checkIsInWishlist = async () => {
        const user = await authUser();
        if (user) {
            const isInWish = await getUserWish(user._id, _id);
            setIsInWishlist(!!isInWish);
        }
    };
    useEffect(() => {
        checkIsInWishlist();
        checkIsInCart();

    }, [_id]);
    const removeFromWishlist = async () => {
        const user = await authUser();
        if (!user) {
           return false
        }
        const data = {
            user: user._id,
            product: _id
        };
        const res = await fetch("/api/wishlist", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (res.status === 200) {
            Swal.fire({
                title: "Operation was Successful",
                icon: "success",
                text: "the Product has been Successfully removed from Wishlist ",
                confirmButtonText: "Ok",
                confirmButtonColor: "#353"
            });
            checkIsInWishlist();
            return
        } else if (res.status === 400) {
            Swal.fire({
                title: "Operation failed",
                icon: "error",
                text: "User or Product Not found!",
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return
        }
        else {
            Swal.fire({
                title: "Operation failed",
                icon: "error",
                text: "Somthing went wrong Please try again later!",
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return
        }
    };
    const addToWishlist = async () => {
        const user = await authUser();
        if (!user) {
            Swal.fire({
                title: "Operation failed",
                icon: "error",
                text: "Please Log in to your Account first!",
                showDenyButton: true,
                denyButtonText: "cancel",
                confirmButtonText: "Login",
                confirmButtonColor: "#333"
            }).then((response) => {
                if (response.value) {
                    router.push(`/login-register/?method=${loginRegisterMethods.signin}`);
                    return false
                }
            });
            return false;
        };

        const data = {
            user: user._id,
            product: _id
        }
        const res = await fetch("/api/wishlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (res.status === 201) {
            Swal.fire({
                title: "Operation was Successful",
                icon: "success",
                text: "the Product added to your wishlist Successfully",
                confirmButtonText: "Ok",
                confirmButtonColor: "#353"
            });
            checkIsInWishlist();
            return
        }
        else if (res.status === 400) {
            Swal.fire({
                title: "Operation failed",
                icon: "error",
                text: "Invalid ID format!",
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return
        }
        else if (res.status === 404) {
            Swal.fire({
                title: "Operation failed",
                icon: "error",
                text: "User or Product Not found!",
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return
        }
        else {
            Swal.fire({
                title: "Operation failed",
                icon: "error",
                text: "Somthing went wrong Please try again later!",
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return
        }
    };


    const addToCart = () => {
        if (isExist) {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const cartItem = {
                id: _id,
                name,
                price,
                img,
                count: 1
            };
            cart.push(cartItem);
            localStorage.setItem("cart", JSON.stringify(cart));
            checkIsInCart();
            Swal.fire({
                title: "Done",
                text: `${cartItem.name} successfully added to your Cart`,
                icon: "success"
            });
        }
    };
    const decreaseHandler = () => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        if (cartItem.count > 1) {
            cart.forEach(item => {
                if (item.id === cartItem.id) {
                    item.count = item.count - 1
                    localStorage.setItem("cart", JSON.stringify(cart));
                    checkIsInCart();
                }
            })
        }
        else {
            const newCart = cart.filter(item => item.id !== cartItem.id);
            localStorage.setItem("cart", JSON.stringify(newCart));
            setIsInCart(false);
            setCartItem({});
            checkIsInCart();
        }
    };
    const increaseHandler = () => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        cart.forEach(item => {
            if (item.id === cartItem.id) {
                item.count = item.count + 1
                localStorage.setItem("cart", JSON.stringify(cart));
                checkIsInCart();
            }
        })
    };

    return (
        <div className={`w-64 h-96 flex flex-col items-center border border-zinc-400 rounded-lg m-3 relative p-2 mx-auto`}>
            <div className='w-full h-3/6 flex items-center justify-center'>
                <Link href={`/product/${_id}`}>
                    <Image className='w-32 h-32' src={decodeURIComponent(img)} width={150} height={150} alt='product' />
                </Link>

                <button onClick={isInWishlist ? removeFromWishlist : addToWishlist} title={isInWishlist ? "remove from Wishlist" : "Add to Wishlist"} className='absolute top-3 text-red-500 left-3 text-3xl'>
                    {
                        isInWishlist ? <FcLike /> : <FaRegHeart />
                    }
                </button>
            </div>
            <Link href={`/product/${_id}`} className='text-center text-xl flex items-center justify-center mt-3 font-semibold h-12'>
                {
                    name.length > 50 ? `${name.substring(0, 47)}...` : name
                }
            </Link>
            <div className='text-center mt-4 h-14 flex flex-col items-center justify-center'>
                <p className='text-lg font-semibold'>
                    {
                        off ? `${(price - (price * off / 100)).toFixed(2)} $`
                            : `${price} $`
                    }
                </p>
                <del className={`${!off && "hidden"} text-zinc-600`}>
                    {
                        price
                    }
                    $
                </del>
            </div>
            <p className={`text-red-600 text-lg font-medium ${isExist ? "hidden" : "inline-block"}`}>Not Available</p>
            {
                isIncart ? <div className='overflow-hidden w-32 text-3xl flex items-center justify-center'>
                    <button onClick={decreaseHandler} className={`border border-custom-dark-blue bg-custom-dark-blue rounded-md text-slate-200 w-10 h-10 transition-all ${cartItem.count > 1 ? "hover:text-custom-dark-blue" : "hover:text-red-600"} hover:bg-slate-200 flex items-center justify-center`}>
                        {
                            cartItem.count > 1 ? "-" : <FaTrashCan className='text-xl' />
                        }
                    </button>

                    <span className='w-12 h-10 text-center overflow-hidden'>{cartItem.count}</span>

                    <button onClick={increaseHandler} className='border border-custom-dark-blue bg-custom-dark-blue rounded-md text-slate-200 w-10 h-10 transition-all hover:text-custom-dark-blue hover:bg-slate-200 flex items-center justify-center'>+</button>

                </div>
                    : <button disabled={!isExist} onClick={addToCart} className={`border mt-3 border-inc-400 p-2 rounded-md font-semibold text-lg bg-custom-dark-blue border-custom-dark-blue text-slate-200 hover:text-custom-dark-blue hover:bg-slate-200 transition-all duration-300 ${isExist ? "opacity-100" : "opacity-50"}`}>Add to Cart</button>
            }

        </div>
    );
}
export default ProductCard;
