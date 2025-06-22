import OrdersContainer from '@/templates/p-user/orders/OrdersContainer';
import { authUser } from '@/utils/actions';
import { loginRegisterMethods } from '@/utils/constants';
import { redirect } from 'next/navigation';
import React from 'react';

const Orders = async () => {
    const user = await authUser();
    if (!user) {
        redirect(`/login-register?method=${loginRegisterMethods.signin}`);
    }
    return (
        <main className='p-3'>
            <h1 className='text-4xl text-zinc-800 font-semibold p-2 mt-5 border-b border-b-zinc-400'>Orders</h1>
            <OrdersContainer user={user}/>
        </main>
    );
}

export default Orders;
