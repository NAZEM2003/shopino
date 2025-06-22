import React from 'react';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';
import OrderBox from './OrderBox';
import { getLatestOrders } from '@/utils/actions';


const Orders = async ({ userID }) => {
    const latestOrders = await getLatestOrders(userID);

    return (
        <section>
            <div className='mt-16 flex items-center justify-between'>
                <h2 className='sm:text-2xl text-xl text-zinc-800 font-semibold p-2'>Recent Orders</h2>
                <Link className='flex items-center sm:text-lg text-base text-zinc-800 hover:text-custom-light-blue transition-all' href="/p-user/orders">All Orders <FaArrowRightLong className='ml-2 text-xl' /></Link>
            </div>
            <div className='mt-10 '>
                {
                    latestOrders.length ? latestOrders.map(order => <OrderBox key={order._id} {...JSON.parse(JSON.stringify(order))} />)
                        : <h2 className='text-center text-2xl text-zinc-800 font font-semibold my-20'>There is no Order!</h2>
                }
            </div>
        </section>
    );
}

export default Orders;
