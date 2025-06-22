import Link from 'next/link';
import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import TicketsContainer from './TicketsContainer';



const Tickets = async () => {

    return (
        <section>
            <div className='mt-16 flex items-center justify-between'>
                <h2 className='sm:text-2xl text-xl text-zinc-800 font-semibold p-2'>Recent Tickets</h2>
                <Link className='flex items-center sm:text-lg text-base text-zinc-800 hover:text-custom-light-blue transition-all' href="/p-user/tickets">All Tickets <FaArrowRightLong className='ml-2 text-xl' /></Link>
            </div>
            <TicketsContainer />
        </section>
    );
}

export default Tickets;
