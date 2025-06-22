import React from 'react';
import WishlistContainer from '@/templates/p-user/wishlist/WishlistContainer';
import { authUser } from '@/utils/actions';
import { redirect } from 'next/navigation';
import { loginRegisterMethods } from '@/utils/constants';

const Wishlist = async () => {
    const user = await authUser();
    if (!user) {
        redirect(`/login-register?method=${loginRegisterMethods.signin}`);
    }
    return (
        <main className='p-2'>
            <h1 className='text-4xl text-zinc-800 font-semibold p-2 mt-5 border-b border-b-zinc-400'>Wishlist</h1>
            <WishlistContainer />
        </main>
    );
}

export default Wishlist;
