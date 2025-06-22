"use client"
import { getAllProductsByCategory } from '@/utils/actions';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const CategoryTableRow = ({ _id, title, img, index }) => {
    const [products, setProducts] = useState([]);
    const decodedImg = decodeURIComponent(img);
    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getAllProductsByCategory(_id);
            setProducts(products.length);
        }
        fetchProducts();
    }, [_id]);
    return (
        <tr className='border border-zinc-500 text-lg'>
            <td className='border border-zinc-500 p-2 text-center'>
                {index + 1}
            </td>

            <td className='border border-zinc-500 p-2 text-center'>
                <div className='w-16 h-16 mx-auto rounded-md overflow-hidden relative'>
                    <Image src={decodedImg} fill alt={title}/>
                </div>
            </td>

            <td className='border border-zinc-500 font font-semibold text-zinc-800 p-2 '>
                {
                    title
                }
            </td>

            <td className='border border-zinc-500 p-2 text-center'>
                <p className='text-lg font-medium text-zinc-800'>
                    {products}
                </p>
            </td>
        </tr>
    );
}

export default CategoryTableRow;
