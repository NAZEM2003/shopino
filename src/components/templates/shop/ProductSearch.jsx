"use client"
import SubmitBtn from '@/components/modules/buttons/SubmitBtn';
import React from 'react';
import Swal from 'sweetalert2';
import styles from "@/styles/products/style.module.css";
import ProductCard from '@/components/modules/product/ProductCard';
import { searchParamSchema } from '@/utils/zod';
import { IoClose } from "react-icons/io5";

const ProductSearch = ({ searchQuery, setSearchQuery, searchResult, setSearchResult }) => {

    const searchHandler = async () => {
        const isSearchQueryValid = searchParamSchema.safeParse(searchQuery);
        if (!isSearchQueryValid.success) {
            Swal.fire({
                title: "Operation Failed",
                text: isSearchQueryValid.error.issues[0].message,
                icon: "error"
            });
            return
        }
        const res = await fetch(`/api/search?search=${searchQuery}`);
        if (res.ok) {
            const data = await res.json();
            if (data.length) {
                setSearchResult(data);
            }
            else {
                Swal.fire({
                    title: "Not Found",
                    text: "no Product Found",
                    icon: "error"
                });
                setSearchResult([]);
                setSearchQuery("");
            }
            return
        } else if (res.status === 500) {
            Swal.fire({
                title: "Operation Failed",
                text: "Something went wrong , Please try again later",
                icon: "error"
            });
            setSearchResult([]);
            setSearchQuery("");
            return
        } else {
            const data = await res.json();
            Swal.fire({
                title: "Operation Failed",
                text: data.message,
                icon: "error"
            });
            return
        }
    }
    const closeHandler = ()=>{
        setSearchQuery("");
        setSearchResult([]);
    }

    return (
        <section className='p-3'>
            <form action={searchHandler} className='flex flex-col sm:flex-row items-center w-full max-w-md sm:max-w-xl mt-8'>
                <input className='p-1 border border-zinc-400 rounded-md outline-none text-lg font-medium w-full sm:mr-3' value={searchQuery} onChange={e => setSearchQuery(e.target.value.trim())} type="text" placeholder='Search...' />
                <SubmitBtn text="Search" />
            </form>
            {
                searchResult.length ?
                    <div className='mt-5 border-t border-t-zinc-400 py-3'>
                        <div className='flex items-center justify-between'>
                            <h1 className='text-2xl font-medium text-zinc-800 p-3'>Results for <span>{searchQuery}</span></h1>
                            <button onClick={closeHandler} className='text-3xl sm:text-5xl text-zinc-800 hover:text-red-600 transition-all duration-200'><IoClose /></button>
                        </div>
                        <div className={styles.products_grid_container}>
                            {
                                searchResult.map(product => <ProductCard key={product._id} {...JSON.parse(JSON.stringify(product))} />)
                            }
                        </div>
                    </div>
                    : ""
            }
        </section>
    );
}

export default ProductSearch;
