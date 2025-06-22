"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FcSearch } from "react-icons/fc";

import { FcPaid, FcAnswers, FcComments, FcLike, FcDocument, FcDownLeft } from 'react-icons/fc';
import styles from "@/styles/p-user/sidebar/style.module.css";
import LogoutBtn from '../buttons/LogoutBtn';


const Sidebar = ({ isShown , user}) => {
    
    return (
        <nav className={`${styles.sidebar_container} ${isShown ? "right-3" : "-right-96"} shadow shadow-zinc-500 lg:h-screen bg-slate-50 `}>


            <h2 className='w-full text-lg hidden sm:inline-block text-center border-b border-b-zinc-300 p-2 mt-5 mx-auto text-zinc-800 font-semibold'>
                Welcome Dear <span>{user?.name}</span>
            </h2>

            <div className='flex items-center w-full sm:hidden'>
                <div className='w-16 h-16 relative rounded-full overflow-hidden'>
                    <Image src={decodeURIComponent(user?.img)} alt='logo' fill />
                </div>
                <div className='ml-5 '>
                    <h2 title={user?.name} className='text-xl cursor-pointer text-zinc-800 font-semibold'>{user.name?.length > 16 ? `${user.name?.slice(0, 10)} ...` : user?.name}</h2>
                    <p className='mt-1 text-sm text-zinc-700'>{user?.role}</p>
                </div>
            </div>

            <div className='relative flex my-8 h-10 lg:hidden items-center'>
                <input className='outline-none border border-r-0 h-full border-zinc-400 rounded-l-md p-1 text-lg w-9/12 text-zinc-700 font-semibold' type="text" placeholder='Search...' />
                <button className='text-2xl w-3/12 h-full bg-slate-200 rounded-r-md p-1 border border-zinc-400 flex items-center justify-center'><FcSearch /></button>
            </div>

            <ul className={`${styles.nav_list_container} lg:pl-2`}>
                <li><Link className='hover:text-custom-light-blue' href="/p-user">Counter <FcDownLeft className='ml-2' /></Link></li>
                <li><Link className='hover:text-custom-light-blue' href="/p-user/orders">Orders <FcPaid className='ml-2' /></Link></li>
                <li><Link className='hover:text-custom-light-blue' href="/p-user/tickets">Tickets <FcAnswers className='ml-2' /></Link></li>
                <li><Link className='hover:text-custom-light-blue' href="/p-user/comments">Comments <FcComments className='ml-2' /></Link></li>
                <li><Link className='hover:text-custom-light-blue' href="/p-user/wishlist">Wishlist <FcLike className='ml-2' /></Link></li>
                <li><Link className='hover:text-custom-light-blue' href="/p-user/account-details">Account Details <FcDocument className='ml-2' /></Link></li>
            </ul>
            <LogoutBtn />
        </nav>
    );
}

export default Sidebar;
