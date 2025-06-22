import { getUserOrders } from '@/utils/actions';
import React from 'react';
import OrderBox from '../index/OrderBox';

const OrdersContainer = async ({user}) => {
    const orders = await getUserOrders(user?._id);
 
    return (
        <section className='mt-8'>
            {
                orders.length ? 
                    orders.map(order => <OrderBox key={order._id} {...JSON.parse(JSON.stringify(order))}/>)
                : <h1 className='text-center text-3xl font-semibold mt-28 text-zinc-600'>No Order have been Placed!</h1>
            }
        </section>
    );
}

export default OrdersContainer;
