import AddProductForm from '@/components/templates/p-admin/products/add-product/AddProductForm';
import React from 'react';

const AddNewProduct = () => {
    return (
        <main className='p-3'>
            <h1 className='text-2xl sm:text-4xl text-zinc-800 font-semibold p-2 mt-5 border-b border-b-zinc-400'>Add New Product</h1>
            <section>
                <AddProductForm/>
            </section>
        </main>
    );
}

export default AddNewProduct;
