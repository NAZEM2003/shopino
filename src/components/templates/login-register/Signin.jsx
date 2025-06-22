"use client"
import SubmitBtn from '@/modules/buttons/SubmitBtn';
import { loginRegisterMethods } from '@/utils/constants';
import { signinSchema } from '@/utils/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const signinHandler = async () => {
        const userData = {
            email,
            password
        };
        const isUserDataValid = signinSchema.safeParse(userData);
        if (!isUserDataValid.success) {
            Swal.fire({
                title: "Sign in failed",
                icon: "error",
                text: isUserDataValid.error.issues[0].message,
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            })
            return false;
        }
        const res = await fetch(`/api/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(userData)
        });
        const data = await res.json();
        if (res.status === 200) {
            setEmail("");
            setPassword("");
            Swal.fire({
                title: "Done",
                icon: "success",
                text: "you have successfully Signed In",
                confirmButtonText: "Ok",
                confirmButtonColor: "#499"
            }).then(() => {
                router.replace("/");
            })
        } else {
            Swal.fire({
                title: "Sign in failed",
                icon: "error",
                text: data.message,
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return false
        }
    }

    return (
        <form action={signinHandler} className='w-64 sm:w-80 flex flex-col items-center backdrop-blur-md bg-slate-200 bg-opacity-15 text-zinc-800 mt-8 rounded-md px-4'>
            <h2 className='my-5 text-2xl text-slate-200 font-semibold'>Sign in</h2>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className='my-5 p-2 text-lg font-medium outline-none rounded w-full' type="email" placeholder='Email...' />
            <input value={password} onChange={(e) => setPassword(e.target.value)} className='my-5 p-2 text-lg font-medium outline-none rounded w-full' type="password" placeholder='password...' />
            <SubmitBtn text="Sign In" />
            <p className='my-7 text-slate-100'>Have no Account? <Link className='text-custom-light-blue' href={`/login-register/?method=${loginRegisterMethods.signup}`}>Sign Up</Link></p>
        </form>
    );
}

export default Signin;
