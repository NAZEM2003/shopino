"use client"
import SubmitBtn from '@/components/modules/buttons/SubmitBtn';
import { loginRegisterMethods } from '@/utils/constants';
import { ticketSchema } from '@/utils/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const SendTicketForm = () => {
    const [departments, setDepartments] = useState([]);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [department, setDepartment] = useState("");
    const router = useRouter();
    useEffect(() => {
        const fetchDepartments = async () => {
            const res = await fetch("/api/departments", { next: { tags:["departmentsFetch"] } });
            if (res.ok) {
                const departments = await res.json();
                setDepartments(departments.data);
            } else {
                const data = await res.json();
                Swal.fire({
                    title: "Operation Failed",
                    text: data.message,
                    icon: "error"
                });
            }
        }
        fetchDepartments();
    }, []);

    const sendTicket = async () => {
        if (!department) {
            Swal.fire({
                title: "Warning",
                icon: "warning",
                text: "Please Select the Department!",
                confirmButtonColor: "#8a8"
            });
            return
        };
        const isDataValid = ticketSchema.safeParse({ title, body });
        if (!isDataValid.success) {
            Swal.fire({
                title: "Warning",
                icon: "warning",
                text: isDataValid.error.issues[0].message,
                confirmButtonColor: "#8a8"
            });
            return
        }
        const data = { title, body, department };
        const res = await fetch("/tickets", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            Swal.fire({
                title: "Done",
                icon: "success",
                text: "Ticket was sent Successfully!",
                confirmButtonColor: "#8a8"
            });
            setBody("");
            setTitle("");
            return
        } else if (res.status === 401) {
            Swal.fire({
                title: "Operation Failed",
                icon: "error",
                text: "Your Token has expired. Please login again.",
                confirmButtonColor: "#8a8"
            }).then(()=>{
                router.push(`/login-register?method=${loginRegisterMethods.signin}`);
            })
            return
        } else if (res.status === 404) {
            Swal.fire({
                title: "Operation Failed",
                icon: "error",
                text: "Department not Found.",
                confirmButtonColor: "#8a8"
            });
            return
        } else if (res.status === 400) {
            const resData = await res.json();
            Swal.fire({
                title: "Operation Failed",
                icon: "error",
                text: resData.message,
                confirmButtonColor: "#8a8"
            });
            return
        } else {
            Swal.fire({
                title: "Operation Failed",
                icon: "error",
                text: "Somthing went wrong.Please try again later!",
                confirmButtonColor: "#8a8"
            });
            return
        }
    }

    return (
        <form action={sendTicket} className='w-full max-w-lg mx-auto flex flex-col border border-zinc-400 rounded-lg p-3 my-10 shadow-xl shadow-zinc-400 lg:max-w-xl'>
            <label className='my-2 text-lg font-semibold' htmlFor="department">Department</label>
            <select value={department} onChange={(e) => setDepartment(e.target.value)} className='text-lg outline-none border border-zinc-400 p-2 rounded-md mb-7  shadow-lg shadow-zinc-400' id='department' name="department">
                <option value="">Please Select a Department ...</option>
                {
                    departments.length ?
                        departments.map(department => <option value={department._id} key={department._id} >{department.title}</option>)
                        : ""
                }
            </select>

            <label className='my-2 text-lg font-semibold' htmlFor="title">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className='text-lg font-semibold text-zinc-800 p-2 mb-7 shadow-lg shadow-zinc-400 border outline-none border-zinc-400 rounded-md' id='title' type="text" placeholder='title ...' />

            <label className='my-2 text-lg font-semibold' htmlFor="message">Your Message</label>
            <textarea value={body} onChange={e => setBody(e.target.value)} className='text-lg font-semibold text-zinc-800 p-2 mb-7 shadow-lg shadow-zinc-400 border outline-none border-zinc-400 rounded-md resize-none' rows={6} id='message' type="text" placeholder='message ...' />

            <SubmitBtn text="Send Ticket" />
        </form>
    );
}

export default SendTicketForm;
