import CommentsContainer from '@/templates/p-user/comments/CommentsContainer';
import { authUser } from '@/utils/actions';
import { loginRegisterMethods } from '@/utils/constants';
import { redirect } from 'next/navigation';
import React from 'react';

const Comments = async () => {
    const user = await authUser();
    if (!user) {
        redirect(`/login-register?method=${loginRegisterMethods.signin}`);
    }
    return (
        <main className='p-3'>
            <h1 className='text-4xl text-zinc-800 font-semibold p-2 mt-5 border-b border-b-zinc-400'>Comments</h1>
            <CommentsContainer user={user}/>
        </main>
    );
}

export default Comments;
