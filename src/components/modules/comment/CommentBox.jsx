import React from 'react';
import Image from 'next/image';
import { FaRegStar, FaStar } from 'react-icons/fa';

const CommetnBox = ({ comment }) => {
    return (
        <div className='border border-zinc-400 rounded-lg p-3 my-6 w-full min-w-64 max-w-md lg:max-w-lg'>
            <div className='p-2 flex item'>
                <div className='w-16 h-16 relative'>
                    <Image className='rounded-full' fill src={decodeURIComponent(comment.userID.img)} alt='profile' />
                </div>
                <div className='ml-4 sm:ml-10'>
                    <h2 className='mb-4 text-lg text-zinc-900 font-semibold'>{comment.name}</h2>
                    <p className='text-zinc-700'>{new Date(comment.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <div>
                <span className='flex items-center text-orange-500 mb-1 ml-2 mt-6'>
                    {
                        new Array(comment.score).fill("").map((item , index) => <FaStar key={index}/>)
                    }
                    {
                        new Array(5 - comment.score).fill("").map((item , index) => <FaRegStar key={index}/>)
                    }
                </span>

                <p className='p-2 text-zinc-800 text-lg '>
                    {
                        comment.message
                    }
                </p>
            </div>
        </div>
    );
}

export default CommetnBox;
