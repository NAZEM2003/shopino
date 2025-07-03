import CategoryCard from '@/modules/categories/CategoryCard';
import Link from 'next/link';
import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import styles from "@/styles/categories/style.module.css";

const Categories = async ({categories}) => {
    return (
        <section className='w-full p-3 my-10'>
            <div className='flex items-center justify-between'>
                <h2 className='sm:text-2xl text-xl text-zinc-800 font-semibold p-2'>Categories</h2>
                <Link className='flex items-center sm:text-lg text-base text-zinc-800 hover:text-custom-light-blue transition-all' href="/categories">See more <FaArrowRightLong className='ml-2 text-xl'/></Link>
            </div>
            <div className={styles.grid_container}>
                {
                    categories.length ?
                    categories.map((category)=> <CategoryCard key={category._id} data={JSON.parse(JSON.stringify(category))}/>)
                    :""
                }
            </div>
        </section>
    );
}

export default Categories;
