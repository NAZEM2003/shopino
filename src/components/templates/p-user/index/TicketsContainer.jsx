"use client"
import React, { useEffect, useState } from 'react';
import TicketBox from './TicketBox';
import { useRouter } from 'next/navigation';
import { loginRegisterMethods } from '@/utils/constants';

const TicketsContainer = () => {
   const [tickets,setTickets] = useState([]);
    const router = useRouter();

    useEffect(()=>{
        const fetchTickets = async()=>{
            const res = await fetch('/api/tickets');     
            if(res.ok){
                const tickets = await res.json();
                setTickets(tickets);
            }else if(res.status === 401){
                router.forward(`/login-register?method=${loginRegisterMethods.signin}`)
            }
        }
        fetchTickets();
    },[]);

    return (
        <div className='mt-10 '>
            {
                tickets.length > 0 ?
                    tickets.map(ticket => <TicketBox key={ticket._id} ticket={ticket} />)
                    : <h2 className='text-center text-2xl text-zinc-800 font font-semibold my-20'>There is no Ticket!</h2>
            }
        </div>
    );
}

export default TicketsContainer;
