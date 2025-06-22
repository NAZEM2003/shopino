"use client"
import React, { useEffect, useState } from 'react';
import WishBox from './WishBox';
import styles from "@/styles/p-user/wishlist/style.module.css";
import { useRouter } from 'next/navigation';
import { loginRegisterMethods } from '@/utils/constants';
import Swal from 'sweetalert2';

const WishlistContainer = () => {
    const [wishlist, setWishlist] = useState([]);
    const router = useRouter();
    const getWishlist = async () => {
        const res = await fetch("/api/wishlist");
        if (res.ok) {
            const data = await res.json();
            setWishlist(data);
        } else if (res.status === 401) {
            Swal.fire({
                title: "Failed to retrieve Wishlist",
                text: "Your Token has Expired , Please log in again",
                icon: "error"
            }).then(() => {
                router.forward(`/login-register?method=${loginRegisterMethods.signin}`);
            });
        } else {
            Swal.fire({
                title: "Failed to retrieve Wishlist",
                text: "Something went wrong , Please Reload the Page!",
                icon: "error"
            });
        }
    }
    useEffect(() => {
        getWishlist();
    }, []);

    return (
        <>
            {
                wishlist.length ?
                    <div className={styles.wishlist_container}>
                        {
                            wishlist.map(wish => <WishBox getWishlist={getWishlist} key={wish._id} {...wish.product} />)
                        }
                    </div>
                    : <h1 className='text-center font-semibold mx-auto mt-36 w-max text-3xl text-zinc-500'>There is no Wish!</h1>
            }
        </>
    );
}

export default WishlistContainer;
