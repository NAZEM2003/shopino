import CategoriesContent from '@/templates/p-admin/categories/CategoriesContent';
import { authAdmin } from '@/utils/actions';
import { redirect } from 'next/navigation';
import React from 'react';

const Categories = async () => {
    const admin = await authAdmin();
    if (!admin) {
        redirect("/")
    }
    return (
        <main className='p-3'>

            <h1 className='text-4xl text-zinc-800 font-semibold p-2 mt-5 border-b border-b-zinc-400'>Categories</h1>

            <CategoriesContent />
        </main>
    );
}

export default Categories;
