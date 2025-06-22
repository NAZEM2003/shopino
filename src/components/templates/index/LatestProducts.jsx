"use client"
import React, { useEffect, useState } from 'react';
import ProductCard from '@/modules/product/ProductCard';
import styles from "@/styles/products/style.module.css";
import { getLatestProducts } from '@/utils/actions';

const LatestProducts = () => {
    const [latestProducts, setLatestProducts] = useState([]);
    const getProducts = async () => {
        const data = await getLatestProducts();
        setLatestProducts(data);
    }
    useEffect(()=>{
        getProducts();
    },[]);
    
    return (
        <section className='p-3 mt-22'>
            <h2 className='sm:text-2xl text-xl text-zinc-800 font-semibold p-2'>Latest Products</h2>
            <div className={styles.products_grid_container}>
                {
                    latestProducts.map(product => <ProductCard key={product._id} {...JSON.parse(JSON.stringify(product))} />)
                }
            </div>
        </section>
    );
}

export default LatestProducts;
