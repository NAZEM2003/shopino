"use client"
import React, { useEffect, useState } from 'react';
import CategorySlider from '../../modules/categories/CategorySlider';

const ShopCategoriesContainer = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch("/api/category");
            if (res.ok) {
                const categories = await res.json();
                setCategories(categories);
            }
        }
        fetchCategories();
    }, []);

    
    return (
        <section className='p-3 flex flex-col'>
            {
                categories.length ?
                    <>
                        {
                            categories.map(category => <CategorySlider key={category._id} {...JSON.parse(JSON.stringify(category))}/>)
                        }
                    </>
                    : ""
            }
        </section>
    );
}

export default ShopCategoriesContainer;
