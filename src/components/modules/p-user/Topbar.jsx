"use client"
import React, { useState } from 'react';
import Logo from "@/images/logo.svg";
import Link from 'next/link';
import Image from 'next/image';
import { IoMenu, IoClose } from "react-icons/io5";
import Sidebar from './Sidebar';
import { FcSearch } from 'react-icons/fc';

const Topbar = ({user}) => {
    const [isSidebarShown, setIsSidebarShown] = useState(false);

    return (
        <div className='z-10  px-3 sm:p-2 border-b border-zinc-100 bg-slate-50 flex items-center justify-between fixed w-full shadow shadow-zinc-400'>

            <div className='items-center hidden sm:flex'>
                <div className='w-16 h-16 relative rounded-full overflow-hidden'>
                    <Image src={decodeURIComponent(user?.img)} alt='logo' sizes='' fill />
                </div>
                <div className='ml-5 '>
                    <h2 title={user?.name} className='text-xl cursor-pointer text-zinc-800 font-semibold'>{user?.name}</h2>
                    <p className='mt-1 text-sm text-zinc-700'>{user?.role}</p>
                </div>
            </div>
            <Link href="/" className='inline-block z-20 relative w-24 h-16 overflow-hidden rounded-lg lg:w-32'>
                <Image src={Logo} fill alt='logo' priority />
            </Link>

            <div className='lg:hidden z-20'>
                <button className='text-4xl text-zinc-800 transition-all hover:text-custom-light-blue' onClick={() => setIsSidebarShown(prevState => !prevState)}>
                    {
                        isSidebarShown ? <IoClose /> : <IoMenu />
                    }
                </button>
                <Sidebar user={user} isShown={isSidebarShown} />
            </div>

            <div className='relative hidden h-10 lg:flex items-center'>
                <input className='outline-none border border-r-0 h-full border-zinc-400 rounded-l-md p-1 text-lg w-9/12' type="text" placeholder='Search...' />
                <button className='text-2xl w-3/12 h-full bg-slate-200 rounded-r-md p-1 border border-zinc-400 flex items-center justify-center'><FcSearch /></button>
            </div>

            {
                <div onClick={() => setIsSidebarShown(prevState => !prevState)} className={`w-full h-screen ${isSidebarShown ? "left-0" :"left-full"} transition-all duration-300 z- bg-zinc-600 opacity-20 absolute top-0 left-0 lg:hidden`}></div>
            }

        </div>
    );
}

export default Topbar;
