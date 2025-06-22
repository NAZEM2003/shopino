"use client"
import { getAllTickets } from '@/utils/actions';
import { loginRegisterMethods } from '@/utils/constants';
import { emailSchema, ticketAnswerSchema } from '@/utils/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const TicketsTable = () => {
    const [tickets, setTickets] = useState([]);

    const router = useRouter();

    const fetchTickets = async () => {
        const Alltickets = await getAllTickets();
        setTickets(Alltickets);
    }
    useEffect(() => {
        fetchTickets();
    }, []);

    const viewTicketBody = (body) => {
        Swal.fire({
            title: "Ticket text",
            text: body,
            confirmButtonText: "Close"
        })
    };

    const answerToTicket = async (ticket) => {
        Swal.fire({
            title: "Please Enter the Answer",
            input: "text",
            confirmButtonText: "Send",
            showCancelButton: true,
        }).then(async (response) => {
            if (response.isConfirmed) {
                const answer = response.value;
                const isAnswerValid = ticketAnswerSchema.safeParse(answer);
                if (!isAnswerValid.success) {
                    Swal.fire({
                        title: "Operation Failed",
                        text: isAnswerValid.error.issues[0].message,
                        icon: "error"
                    });
                    return
                }
                const data = {
                    title: ticket.title,
                    body: response.value,
                    department: ticket.department._id,
                    ticketID: ticket._id
                };
                const res = await fetch("/api/tickets/answer", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
                if (res.ok) {
                    Swal.fire({
                        title: "Done",
                        text: "Your Answer was Successfully send.",
                        icon: "success"
                    });
                    fetchTickets();
                    return
                } else if (res.status === 403) {
                    Swal.fire({
                        title: "Operation Failed",
                        text: "Your Token has expired , Please log in again",
                        icon: "error"
                    });
                    router.replace(`/login-register?method=${loginRegisterMethods.signin}`);
                    return
                }
                else if (res.status === 500) {
                    Swal.fire({
                        title: "Operation Failed",
                        text: "somthing went wrong. Please try again later.",
                        icon: "error"
                    });
                    return
                } else {
                    const resData = await res.json();
                    Swal.fire({
                        title: "Operation Failed",
                        text: resData.message,
                        icon: "error"
                    });
                    return
                }
            }
        })
    };

    const banUserHandler = async (email) => {
        Swal.fire({
            title: "Attention",
            icon: "warning",
            text: "are You sure You want to Ban this User?",
            showCancelButton: true,
            cancelButtonText: "NO",
            confirmButtonText: "YES",
            confirmButtonColor: "#a55",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const isEmailValid = emailSchema.safeParse(email);
                if (!isEmailValid.success) {
                    Swal.fire({
                        title: "Operation Failed",
                        icon: "error",
                        text: "the user Email is not valid"
                    });
                    return
                }
                const res = await fetch("/api/user/ban", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email })
                });
                if (res.ok) {
                    Swal.fire({
                        title: "Done",
                        text: "the user was successfully banned",
                        icon: "success"
                    });
                    return
                } else if (res.status === 403) {
                    Swal.fire({
                        title: "Operation Failed",
                        text: "Your Token has expired , Please log in again",
                        icon: "error"
                    });
                    router.replace(`/login-register?method=${loginRegisterMethods.signin}`);
                    return
                } else if (res.status === 500) {
                    Swal.fire({
                        title: "Operation Failed",
                        text: "somthing went wrong. please try again later",
                        icon: "error"
                    });
                    return
                } else {
                    const data = await res.json();
                    Swal.fire({
                        title: "Operation Failed",
                        text: data.message,
                        icon: "error"
                    });
                    return
                }
            }
        });
    }

    return (
        <>
            {
                tickets.length > 0 ? <table className='w-full min-w-[640px] overflow-x-scroll  mt-14 border border-zinc-500 '>
                    <thead className='border border-zinc-500 bg-zinc-400'>
                        <tr className='text-zinc-800 h-14'>
                            <th className='border border-zinc-500'>row</th>
                            <th className='border border-zinc-500'>User</th>
                            <th className='border border-zinc-500'>Title</th>
                            <th className='border border-zinc-500'>Deptartment</th>
                            <th className='border border-zinc-500'>Status</th>
                            <th className='border border-zinc-500'>View</th>
                            <th className='border border-zinc-500'>Reply</th>
                            <th className='border border-zinc-500'>Ban</th>
                        </tr>
                    </thead>
                    <tbody className='border border-zinc-500'>
                        {
                            tickets.map((ticket, index) => <tr key={ticket._id} className='border border-zinc-500 text-lg'>
                                <td className='border border-zinc-500 p-2 text-center'>
                                    {index + 1}
                                </td>
                                <td className='border border-zinc-500 p-2'>
                                    {ticket.user.name}
                                </td>
                                <td className='border border-zinc-500 font font-semibold text-zinc-800 p-2 min-w-52'>
                                    {ticket.title}
                                </td>
                                <td className='border border-zinc-500 p-2'>
                                    {ticket.department.title}
                                </td>
                                <td className='border border-zinc-500 text-center p-2'>
                                    <p className={`font-medium ${ticket.hasAnswer ? "text-green-600" : "text-red-600"}`}>
                                        {
                                            ticket.hasAnswer ? "Answered" : "Not Answerd"
                                        }
                                    </p>
                                </td>
                                <td className='border border-zinc-500 p-1 text-center'>
                                    <button onClick={() => viewTicketBody(ticket.body)} className='border border-green-600 p-2 rounded-md font-semibold text-green-600 hover:bg-green-600 hover:text-slate-200'>View</button>
                                </td>
                                <td className='border border-zinc-500 p-2 text-center'>
                                    <button onClick={() => answerToTicket(ticket)} className='border border-zinc-600 p-2 rounded-md font-semibold text-zinc-600 hover:bg-zinc-600 hover:text-slate-200'>Reply</button>
                                </td>
                                <td className='border border-zinc-500 p-2 text-center'>
                                    <button onClick={() => banUserHandler(ticket.user.email)} className='border border-red-600 p-2 rounded-md font-semibold text-red-600 hover:bg-red-600 hover:text-slate-200'>Ban</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table> : <h1 className='text-center mt-28 font-semibold text-3xl text-zinc-500'>There are no Tickets</h1>
            }
        </>

    );
}

export default TicketsTable;
