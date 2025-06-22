import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import bgImage from "@/images/not-found.png";
import smBgImage from "@/images/not-found-sm.png";
import donutImage from "@/images/donut.svg";


export const metadata = {
    title: "Shopino | 404",
};

const NotFound = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center sm:inline-block relative p-2 sm:p-20'>
            <Image className='absolute -z-20 hidden sm:inline-block' fill quality={100} src={bgImage} alt='background' />
            <Image className='absolute inline-block sm:hidden brightness-50 -z-20' fill quality={100} src={smBgImage} alt='background' />

            <div className='w-max text-slate-100 z-10 flex flex-col items-center text-center mt-14'>
                <div className='text-7xl sm:text-8xl font-bold relative flex items-center justify-center'>
                    4
                    <Image className='mx-2' src={donutImage} alt='donut' width={70} />
                    4
                </div>
                <h2 className='my-6 text-3xl sm:text-5xl font-semibold'>Page not Found ! </h2>
                <p className='text-xl w-72 mt-10'>The Page you were Looking for was not Found!!!</p>
                <Link className='w-max inline-block mt-16 bg-custom-dark-blue p-2 rounded-md text-xl text-slate-200' href="/">Back to Home</Link>
            </div>
        </div>
    );
}

export default NotFound;
