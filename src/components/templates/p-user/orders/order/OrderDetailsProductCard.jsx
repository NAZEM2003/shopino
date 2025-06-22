import { getProduct } from '@/utils/actions';
import Image from 'next/image';
import React from 'react';

const OrderDetailsProductCard = async ({OrderedProduct}) => {
    const product = await getProduct(OrderedProduct.id);
    return (
        <div className='border border-zinc-400 flex flex-col sm:flex-row justify-between shadow-lg shadow-zinc-400 rounded-md p-2 my-5 max-w-xl'>
            <div className='flex items-center'>
                <div className='w-16 h-16 sm:h-20 sm:w-20 relative'>
                    <Image src={decodeURIComponent(product.img)} fill alt={product.name}/>
                </div>
                <div className='ml-3'>
                    <h1 className='text-lg font-semibold '>{product.name}</h1>
                    <p className='font-medium text-sm mt-2'>{product.category.title}</p>
                </div>
            </div>
            <div className='mt-5 p-3 sm:mr-5'>
                <p className='text-lg font-semibold'>Price : {OrderedProduct.price.toFixed(2)} $</p>
                <p className='text-lg font-semibold'>Count : {OrderedProduct.count}</p>
                <p className='text-lg font-semibold'>Total Price : {OrderedProduct.total.toFixed(2)} $</p>
            </div>
        </div>
    );
}

export default OrderDetailsProductCard;
