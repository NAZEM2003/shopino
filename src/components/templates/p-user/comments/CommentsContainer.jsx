"use client"
import React, { useEffect, useState } from 'react';
import CommentBox from './CommentBox';
import { getUserComments } from '@/utils/actions';

const CommentsContainer = ({ user }) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const getCommetns = async () => {
            const comments = await getUserComments(user?._id);
            setComments(comments);
        }
        getCommetns();
    }, [user]);
    return (
        <>
            {
                comments.length ?
                    <div className='mt-10'>
                        {
                            comments.map((comment, index) => <CommentBox key={comment._id} comment={comment} index={index} />)
                        }
                    </div>
                    : <h1 className='text-center font-semibold mx-auto mt-36 w-max text-3xl text-zinc-500'>There is no Comment!</h1>
            }
        </>
    );
}

export default CommentsContainer;
