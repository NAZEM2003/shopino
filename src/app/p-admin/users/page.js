import UsersTable from '@/templates/p-admin/users/UsersTable';
import { authAdmin } from '@/utils/actions';
import { redirect } from 'next/navigation';
import React from 'react';

const Users = async () => {
    const admin = await authAdmin();
    if (!admin) {
        redirect("/")
    }
    return (
        <main className='p-3'>
            <h1 className='text-4xl text-zinc-800 font-semibold p-2 mt-5 border-b border-b-zinc-400'>Users</h1>
            <section className='overflow-x-scroll'>
                <UsersTable />
            </section>
        </main>
    );
}

export default Users;
