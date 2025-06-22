import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const OrderBox = ({ totalPrice, createdAt, _id, products, status }) => {
    
    return (
        <Link href={`/p-user/orders/${_id}`} className='w-full rounded-md text-slate-200 bg-zinc-700 p-3 my-5 sm:my-10 inline-block sm:flex items-center justify-between max-w-2xl'>
            <div className=''>
                <div className='flex items-center flex-wrap '>
                    {
                        products.map(product => <div key={product._id} className='w-14 h-14 m-2 relative rounded-xl bg-slate-200 overflow-hidden z-0'>
                            <Image src={decodeURIComponent(product.img)} fill alt='product image' />
                        </div>)
                    }
                </div>
                <p className={`my-4 sm:mb-0 sm:mt-5 ${status === "pending" || status === "processing" ? "text-amber-500" : status === "delivered" ? "text-green-600" : "text-red-600"}`}>{
                    status.toUpperCase()
                }</p>
            </div>
            <div className='flex flex-col-reverse sm:flex-col h-full'>
                <p className='mt-4 sm:mt-0 ml-auto text-zinc-400'>{new Date(createdAt).toLocaleDateString()}</p>
                <p className={`font-semibold sm:text-center tracking-wider sm:mt-5`}>
                    {totalPrice.toFixed(2)} $
                </p>
            </div>
        </Link>
    );
}

export default OrderBox;
