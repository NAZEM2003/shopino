import DiscountsTable from '@/components/templates/p-admin/discounts/DiscountsTable';
import { authAdmin, getDiscounts } from '@/utils/actions';
import { redirect } from 'next/navigation';
import React from 'react';

const Discounts = async () => {
       const admin = await authAdmin();
        if(!admin){
            redirect("/")
        }
    return (
        <main className='p-3'>
            <h1 className='text-4xl text-zinc-800 font-semibold p-2 mt-5 border-b border-b-zinc-400'>Discounts</h1>
            <DiscountsTable />
        </main>
    );
}

export default Discounts;
