"use client"
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import CategoryTableRow from './CategoryTableRow';
import { IoMdAddCircleOutline } from 'react-icons/io';
import AddCategoryModal from './AddCategoryModal';

const CategoriesContent = () => {
    const [categories, setCategories] = useState([]);
    const [isModalShown, setIsModalShown] = useState(false);


    const getCategories = async () => {
        const res = await fetch("/api/category",{next:{tags:['fetchCategories']}});
        if (res.ok) {
            const data = await res.json();
            setCategories(data);
            return
        } else {
            Swal.fire({
                title: "Failed to Fetch",
                text: "Failed to Fetch the Categories , Please Try again!",
                icon: "error"
            });
            return
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <section className='overflow-x-scroll'>

            <button onClick={()=> setIsModalShown(true)} className='flex items-center font-semibold transition-all duration-200 sm:text-lg rounded-md bg-custom-dark-blue border border-custom-dark-blue text-slate-200 hover:bg-slate-200 hover:text-custom-dark-blue p-3 mt-8'>Add New Category <IoMdAddCircleOutline/></button>
            {
                categories.length ? <table className='w-max min-w-[640px] overflow-x-scroll mt-8 border border-zinc-500 '>
                    <thead className='border border-zinc-500 bg-zinc-400'>
                        <tr className='text-zinc-800 h-14'>
                            <th className='border border-zinc-500'>row</th>
                            <th className='border border-zinc-500'>Image</th>
                            <th className='border border-zinc-500'>Title</th>
                            <th className='border border-zinc-500'>Number of Products</th>
                        </tr>
                    </thead>
                    <tbody className='border border-zinc-500'>
                        {
                            categories.map((category, index) => <CategoryTableRow key={category._id} {...category}  index={index}/> )
                        }
                    </tbody>
                </table>
                    : <h1 className='text-center mt-20 text-2xl font-semibold text-zinc-800'>There is no Category</h1>
            }

            <AddCategoryModal getCategories={getCategories} isModalShown={isModalShown} setIsModalShown={setIsModalShown}/>

        </section>
    );
}

export default CategoriesContent;
