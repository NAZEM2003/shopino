"use client"
import { getProductsByCategory } from '@/utils/actions';
import React, { useEffect, useState } from 'react';
import ShopCategorySlider from '../../templates/shop/ShopCategorySlider';
import Link from 'next/link';

const CategorySlider = ({ title, _id }) => {
    const [products , setProducts] = useState([]);
    useEffect(()=>{
        const fetchProducts = async()=>{
            const data = await getProductsByCategory(_id);
            setProducts(data);
        }
        fetchProducts();
    },[])
    
    return (
        <section className={`${products.length ?"inline-block":"hidden"} my-7`}>
            <Link href={`/categories/${_id}`} className='text-2xl font-semibold text-zinc-800 p-3 '>{title}</Link>
            <div>
                <ShopCategorySlider categoryID={_id} products={JSON.parse(JSON.stringify(products))}/>
            </div>
        </section>
    );
}

export default CategorySlider;
