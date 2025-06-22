import OrderDetails from '@/components/templates/p-user/orders/order/OrderDetails';
import { authUser, getOrderByID } from '@/utils/actions';
import { loginRegisterMethods } from '@/utils/constants';
import { redirect } from 'next/navigation';
import React from 'react';

const Page = async ({ params }) => {
    const { orderID } = params;
    const user = await authUser();
    if (!user) {
        redirect(`/login-register?method=${loginRegisterMethods.signin}`);
    }
    const order = await getOrderByID(orderID);
    
    return (
        <main className='p-3'>
            <h1 className='text-4xl text-zinc-800 font-semibold p-2 mt-5 border-b border-b-zinc-400'>Order  <span className='text-sm'>({orderID})</span></h1>
            <OrderDetails order={JSON.parse(JSON.stringify(order))}/>
        </main>
    );
}

export default Page;
