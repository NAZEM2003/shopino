import React from 'react';
import OrderDetailsProductCard from './OrderDetailsProductCard';

const OrderDetails = ({ order }) => {
    return (
        <section className='mt-7 text-zinc-700 '>
            <div className='mb-2 border border-b-zinc-500 py-3'>
                <h3 className='text-lg font-medium'>Order ID : {order._id}</h3>
                <h3 className='text-lg font-medium'>Order Date : {new Date(order.createdAt).toLocaleDateString()}</h3>
                <h3 className='text-lg font-medium'>Receiver Delivery : {order.user.name}</h3>
                <h3 className='text-lg font-medium text-zinc-600'>Email : {order.user.email}</h3>
            </div>

            <div className='border border-b-zinc-500 py-3'>
                <p className='text-lg font-medium'>{order.products.length} Products</p>
                <p className={`mt-3 font-semibold  ${order.status === "pending" || order.status === "processing" ? "text-amber-500" : order.status === "delivered" ? "text-green-600" : "text-red-600"}`}>
                    {
                        order.status.toUpperCase()
                    }
                </p>
            </div>

            <div>
                {
                    order.products.map(product => <OrderDetailsProductCard key={product._id} OrderedProduct={product}/>)
                }
            </div>

            <div className='border border-t-zinc-500 py-3'>
                <p className='text-lg font-medium'>Order ID : {order._id}</p>
                <h2 className='mt-2 text-lg font-semibold'>Total Order Amount : {order.totalPrice.toFixed(2)} $</h2>
            </div>
        </section>
    );
}

export default OrderDetails;
