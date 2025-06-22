"use client"
import { emailSchema } from '@/utils/zod';
import React, { useState } from 'react';
import { FcCheckmark, FcNews } from "react-icons/fc";
import Swal from 'sweetalert2';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const addToNewsletter = async () => {
        const isEmailValid = emailSchema.safeParse(email);
        if (!isEmailValid.success) {
            Swal.fire({
                title: "Operation Failed",
                text: isEmailValid.error.issues[0].message,
                icon: "error"
            });
            return
        }
        const res = await fetch("/api/newsletter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });
        if (res.ok) {
            Swal.fire({
                title: "Done",
                text: "you have successfully subscribed to the Newsletter",
                icon: "success"
            });
            setEmail("");
            return
        } else if (res.status === 400) {
            const resData = await res.json();
            Swal.fire({
                title: "Operation Failed",
                text: resData.message,
                icon: "error"
            });
            return
        } else {
            Swal.fire({
                title: "Operation Failed",
                text: "Something went wrong , Please try again later.",
                icon: "error"
            });
            return
        }

    }
    return (
        <div className='w-3/12 p-2 max-w-96 min-w-60'>
            <h2 className='flex items-center text-2xl'>Newsletter <FcNews className='ml-2' /></h2>
            <p className='text-lg text-justify leading-loose my-5'>be aware of the latest News and Discounts of Shopino by subscribing to the Newslatter.</p>
            <div className='mt-4 flex items-center w-full'>
                <input
                    className='p-2 w-9/12 rounded-l-md outline-none border-none text-zinc-800 text-lg'
                    type="email"
                    placeholder='Email...'
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                <button
                    onClick={addToNewsletter}
                    className='text-4xl bg-slate-200 p-1 rounded-r-md border-l border-zinc-400'><FcCheckmark /></button>
            </div>
        </div>
    );
}

export default Newsletter;
