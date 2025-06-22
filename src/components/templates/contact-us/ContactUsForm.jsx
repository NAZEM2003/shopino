"use client"
import SubmitBtn from '@/components/modules/buttons/SubmitBtn';
import { contactUsSchema } from '@/utils/zod';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ContactUsForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [message, setMessage] = useState("");

    const submitMessage = async () => {
        const body = {
            name,
            email,
            message,
            number
        }
        const isDataValid = contactUsSchema.safeParse(body)
        if (!isDataValid.success) {
            Swal.fire({
                title: "Operation Failed",
                text: isDataValid.error.issues[0].message,
                icon: "error",
                confirmButtonText: "OK",
                confirmButtonColor: "#844"
            });
            return
        }
        const res = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        if (res.status === 201) {
            setEmail("");
            setName("");
            setMessage("");
            setNumber("");
            Swal.fire({
                title: "Operation was Successful",
                icon: "success",
                text: "Message Sent Successfully",
                confirmButtonText: "Ok",
                confirmButtonColor: "#353"
            });
            return
        } else if (res.status === 422) {
            const data = await res.json();
            Swal.fire({
                title: "Operation Failed",
                icon: "error",
                text: data.message,
                confirmButtonText: "Ok",
                confirmButtonColor: "#844"
            });
            return
        }else{
            Swal.fire({
                title: "Operation Failed",
                icon: "error",
                text: "Somthing went Wrong , Please try again later!",
                confirmButtonText: "Ok",
                confirmButtonColor: "#844"
            });
            return
        }
    }


    return (
        <form action={submitMessage} className='w-9/12 max-w-80 min-w-64 flex flex-col border border-zinc-400 rounded-md p-2 text-zinc-800 sm:w-80 mx-auto'>
            <h2 className='text-lg font-semibold text-zinc-800 mx-auto mb-6'>You can use this Form to Contact Us</h2>
            <input onChange={(e) => setName(e.target.value)} value={name} minLength={3} className='p-2 text-lg outline-none border border-zinc-400 rounded-md my-3' type="text" placeholder='Your Name..' />
            <input onChange={(e) => setNumber(e.target.value)} value={number} minLength={4} className='p-2 text-lg outline-none border border-zinc-400 rounded-md my-3' type="tel" placeholder='Your Phone Number..' />
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='p-2 text-lg outline-none border border-zinc-400 rounded-md my-3' type="email" placeholder='Your Email..' />
            <textarea onChange={(e) => setMessage(e.target.value)} className='p-2 text-lg outline-none border border-zinc-400 rounded-md my-3 resize-none' rows={3} value={message} placeholder='Your Message' />
            <SubmitBtn text="Send" />
        </form>
    );
}

export default ContactUsForm;
