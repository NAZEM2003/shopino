import React from 'react';
import img from "@/images/articles/healthy-food.jpg"
import Image from 'next/image';
import { CgProfile } from "react-icons/cg";
import Link from 'next/link';
const Article = () => {
    return (
        <Link href="/articles/id" className='w-72 h-96 rounded-md relative overflow-hidden border border-zinc-300 flex flex-col justify-end items-center  text-zinc-200'>
            <div className='absolute top-0 w-full h-4/6'>
                <Image className='brightness-75 -z-10' src={img} fill alt='Article image'/>
            </div>
            <div className='z-10 bg-zinc-700 w-full p-2 rounded-xl' >
                <h3 className='mb-8 text-xl'>Healthy body with healthy food.</h3>
                <div className='flex items-center justify-between p-2 mb-2'>
                    <p className='flex items-center'><CgProfile className='mr-1'/> nazem</p>
                    <p>12/6/20024</p>
                </div>
            </div>
        </Link>
    );
}

export default Article;
