import Image from 'next/image';
import React from 'react';
import background from "@/images/login-register-bg.jpg"
import Signin from '@/components/templates/login-register/Signin';
import Signup from '@/components/templates/login-register/Signup';
const Page = ({ searchParams }) => {
    return (
        <div className='w-full min-h-screen relative p-4'>
            <Image className='-z-10 brightness-75' src={background} fill alt='background' />
            <div className='absolute w-full h-full top-0 left-0 bg-gradient-to-r from-zinc-950 from-40% opacity-0 -z-10'></div>
            <div className='w-full flex items-center justify-center mt-20'>
                {
                    searchParams.method === "signin" ? <Signin /> : <Signup />
                }
            </div>
        </div>
    );
}

export default Page;
