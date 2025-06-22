import React from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import ViewCommentBtn from './ViewCommentBtn';
import Link from 'next/link';

const CommentBox = ({ comment, index }) => {
    return (
        <div className='w-full max-w-lg my-5 p-2 border border-zinc-300 rounded-md shadow-lg shadow-zinc-500 lg:w-9/12 lg:max-w-3xl sm:pt-4'>

            <div className='sm:flex items-center'>
                <p className='rounded-full w-10 h-10 border border-zinc-400 flex items-center justify-center text-lg font-semibold sm:mr-5'>
                    {index + 1}
                </p>
                <Link href={`/product/${comment.productID._id}`} className='my-4 text-lg font-semibold text-zinc-800'>
                    {comment.productID.name}
                </Link>
            </div>

            <p className='text-lg font-semibold text-zinc-600 sm:mt-4'>
                {
                    new Date(comment.createdAt).toLocaleDateString()
                }
            </p>
            <p className='flex items-center text-orange-500 my-4 text-lg'>
                {
                    new Array(comment.score).fill("").map((item, index) => <FaStar key={index} />)
                }
                {
                    new Array(5 - comment.score).fill("").map((item, index) => <FaRegStar key={index} />)
                }

            </p>


            <p className={`text-lg font-semibold ${comment.isAccepted ? "text-green-500" : "text-slate-600"}`}>
                {
                    comment.isAccepted ? `Accepted` : "Waiting to Accept ..."
                }
            </p>
            <ViewCommentBtn message={comment.message}/>
        </div>
    );
}

export default CommentBox;
