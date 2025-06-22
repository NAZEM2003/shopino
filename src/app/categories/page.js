import Footer from '@/components/modules/footer/Footer';
import Navbar from '@/components/modules/navbar/Navbar';
import { getAllCategories, getCategories } from '@/utils/actions';
import React from 'react';
import styles from "@/styles/categories/style.module.css";
import CategoryCard from '@/components/modules/categories/CategoryCard';
import CategorySlider from '@/components/modules/categories/CategorySlider';

const Categories = async () => {
    const Allcategories = await getAllCategories();
    const popularCtegories = await getCategories();
    return (
        <div>
            <Navbar />
            <main className='mt-20 min-h-screen'>
                <section className={`${styles.grid_container}`}>
                    {
                        Allcategories.map((category) => <CategoryCard key={category._id} data={JSON.parse(JSON.stringify(category))} />)
                    }
                </section>
                <section className='flex flex-col p-3'>
                    {
                        popularCtegories.length ? popularCtegories.map(category => <CategorySlider key={category._id} {...JSON.parse(JSON.stringify(category))}/>)
                        : ""
                    }
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Categories;
