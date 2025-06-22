"use client"
import { authUser } from '@/utils/actions';
import { loginRegisterMethods } from '@/utils/constants';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';

const WishBox = ({ name, img, price, off, _id, getWishlist }) => {  
    const router = useRouter();
    const removeFromWishlist = async () => {
        const user = await authUser();
        if (!user) {
            Swal.fire({
                title: "Operation Failed",
                icon: "error",
                text: "Your Token has expired. Please login again.",
                confirmButtonColor: "#8a8"
            }).then(() => {
                router.push(`/login-register?method=${loginRegisterMethods.signin}`);
            })
            return
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
                text: `${name} has been Successfully removed from Wishlist `,
                confirmButtonText: "Ok",
                confirmButtonColor: "#353"
            });
            getWishlist()
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
    }

    return (
        <div className='w-64 h-96 flex flex-col items-center border border-zinc-400 rounded-lg m-3 relative p-2 mx-auto'>
            <div className='w-full h-3/6 flex items-center justify-center'>
                <Link href={`/product/${_id}`}>
                    <Image className='w-32 h-32' src={decodeURIComponent(img)} width={150} height={150} alt='product' />
                </Link>
            </div>
            <Link href={`/product/${_id}`} className='text-center flex items-center justify-center mt-3 font-semibold h-12'>
                {
                    name?.length > 50 ? `${name?.substring(0, 47)}...` : name
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
            <button onClick={removeFromWishlist} className='border flex items-center mt-3 border-inc-400 p-2 rounded-md font-semibold text-lg bg-red-500 border-red-500 text-slate-200 hover:text-red-500 hover:bg-slate-200 transition-all duration-300'>Remove <FaTrashAlt className='ml-2' /></button>
        </div>
    );
}

export default WishBox;
