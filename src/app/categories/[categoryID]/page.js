import Footer from '@/modules/footer/Footer';
import Navbar from '@/modules/navbar/Navbar';
import { getAllProductsByCategory, getCategory } from '@/utils/actions';
import styles from "@/styles/products/style.module.css";
import React from 'react';
import ProductCard from '@/components/modules/product/ProductCard';

const Category = async ({ params }) => {
    const categoryID = params.categoryID;
    const products = await getAllProductsByCategory(categoryID);
    const category = await getCategory(categoryID);

    return (
        <div>
            <Navbar />
            <main className='mt-20 min-h-screen'>
                <h1 className='text-4xl text-zinc-800 font-semibold p-2 mt-5 border-b border-b-zinc-400'> {category.title} </h1>
                <section className={products.length ? styles.products_grid_container :""}>
                    {
                        products.length ?
                            products.map(product => <ProductCard key={product._id} {...JSON.parse(JSON.stringify(product))} />)
                            : <h1 className='text-3xl font-semibold text-zinc-800 text-center mt-36'>There are No Products in this Category</h1>
                    }
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Category;
