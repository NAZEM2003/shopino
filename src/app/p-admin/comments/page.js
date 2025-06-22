import CommentsTable from '@/templates/p-admin/comments/CommentsTable';
import { authAdmin } from '@/utils/actions';
import { redirect } from 'next/navigation';
import React from 'react';

const Comments = async () => {
    const admin = await authAdmin();
    if(!admin){
        redirect("/")
    }
    return (
        <main className='p-3'>
            <h1 className='text-4xl text-zinc-800 font-semibold p-2 mt-5 border-b border-b-zinc-400'>Comments</h1>
            <section className='overflow-x-scroll'>
                <CommentsTable />
            </section>
        </main>
    );
}

export default Comments;
