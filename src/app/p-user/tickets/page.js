import Link from 'next/link';
import React from 'react';
import { IoMdAddCircleOutline } from "react-icons/io";
import TicketsContainer from '@/templates/p-user/tickets/TicketsContainer';
import { authUser } from '@/utils/actions';
import { redirect } from 'next/navigation';
import { loginRegisterMethods } from '@/utils/constants';

const Tickets = async () => {
    const user = await authUser();
    if (!user) {
        redirect(`/login-register?method=${loginRegisterMethods.signin}`);
    }
    return (
        <main className='p-3'>
            <div className='flex items-center justify-between mt-5 border-b border-b-zinc-400'>
                <h1 className='text-3xl sm:text-4xl text-zinc-800 font-semibold sm:p-2 '>Tickets</h1>
                <Link className='flex items-center font-semibold hover:text-custom-dark-blue text-zinc-800 transition-all duration-200 sm:text-lg sm:p-2' href="/p-user/tickets/send-ticket">Send New Ticket <IoMdAddCircleOutline className='ml-1 text-xl' /></Link>
            </div>
            <TicketsContainer />
        </main>
    );
}

export default Tickets;
