"use client"
import React, { useEffect, useState } from 'react';
import TicketBox from './TicketBox';
import Swal from 'sweetalert2';


const TicketsContainer = () => {
    const [tickets, setTickets] = useState([]);
    useEffect(() => {
        const fetchTickets = async () => {
            const res = await fetch("/api/tickets", { next: { tags: ['fetchTickets'] } });
            if (res.ok) {
                const responseData = await res.json();
                setTickets(responseData);
            } else {
                Swal.fire({
                    title:"Error",
                    text:"Something went wrong , Please try again later.",
                    icon:"error"
                });
            }
        };
        fetchTickets();
    }, []);

    return (
        <div>
            <form className='mt-8 flex flex-wrap' action="">
                <select className='w-5/12 max-w-44 p-2 outline-none border-b-2 border-custom-dark-blue' name="date" id="date">
                    <option value="create">Create Date</option>
                    <option value="response">Response Date</option>
                </select>

                <select className='w-5/12 max-w-44 ml-6 mr-auto p-2 outline-none border-b-2 border-custom-dark-blue' name="status" id="status">
                    <option value="all">All</option>
                    <option value="open">Open</option>
                    <option value="closed">closed</option>
                    <option value="answerd">Answerd</option>
                    <option value="ended">Ended</option>
                </select>

                <button className='bg-custom-dark-blue text-lg inline-block text-slate-200 p-2 ml-5 justify-self-end mt-8 mr-0 rounded outline-none '>Filter</button>
            </form>
            <section className='mt-14'>
                {
                    tickets.length ?
                        tickets.map((ticket) => <TicketBox key={ticket._id} id={ticket._id} title={ticket.title} department={ticket.department.title} hasAnswer={ticket.hasAnswer} createdAt={ticket.createdAt} />)
                        : <h1 className='text-center text-4xl font-semibold text-zinc-800 mt-28'>There is no Ticket</h1>
                }
            </section>
        </div>
    );
}

export default TicketsContainer;
