"use client"
import { authUser, getUserWish } from '@/utils/actions';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import Swal from 'sweetalert2';

const AddToWishlist = ({ productID }) => {
    const router = useRouter();
    const [isInWishlist, setIsInWishlist] = useState(false);

    const checkIsInWishlist = async () => {
        const user = await authUser();
        if (user) {
            const isInWish = await getUserWish(user._id, productID);
            setIsInWishlist(!!isInWish);
        }
    }

    useEffect(() => {
        checkIsInWishlist();
    }, [])
    const removeFromWishlist = async () => {
        const user = await authUser();
        const data = {
            user: user._id,
            product: productID
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
    }
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
                }
                return
            });
            return 
        }
        const data = {
            user: user._id,
            product: productID
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
    }

    return (
        <>
            {
                isInWishlist
                    ? <button onClick={removeFromWishlist} className='flex items-center text-lg font-semibold text-zinc-800 my-7'>remove from Wishlist<FaHeart className='ml-3 text-red-700' /></button>
                    : <button onClick={addToWishlist} className='flex items-center text-lg font-semibold text-zinc-800 my-7'>Add to Wishlist <FaRegHeart className='ml-3 text-red-700' /></button>
            }
        </>
    );
}

export default AddToWishlist;
