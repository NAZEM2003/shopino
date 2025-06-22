import TicketsTable from '@/templates/p-admin/tickets/TicketsTable';
import React from 'react';

const Tickets = () => {
    return (
        <main className='p-3'>
            <h1 className='text-4xl text-zinc-800 font-semibold p-2 mt-5 border-b border-b-zinc-400'>Tickets</h1>
            <section className='overflow-x-scroll'>
                <TicketsTable/>
            </section>
        </main>
    );
}

export default Tickets;
