import ProductsTable from '@/components/templates/p-admin/products/ProductsTable';
import { authAdmin } from '@/utils/actions';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';

const Products = async () => {
    const admin = await authAdmin();
    if (!admin) {
        redirect("/")
    }
    return (
        <main className='p-3'>
            <div className='flex items-center justify-between mt-5 border-b border-b-zinc-400'>
                <h1 className='text-3xl sm:text-4xl text-zinc-800 font-semibold sm:p-2 '>Products</h1>
                <Link className='flex items-center font-semibold hover:text-custom-dark-blue text-zinc-800 transition-all duration-200 sm:text-lg sm:p-2' href="/p-admin/products/add-product">Add New Product <IoMdAddCircleOutline className='ml-1 text-xl' /></Link>
            </div>
            <section className='overflow-x-auto'>
                <ProductsTable />
            </section>
        </main>
    );
}

export default Products;
