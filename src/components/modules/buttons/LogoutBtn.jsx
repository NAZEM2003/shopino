'use client'
import { loginRegisterMethods } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';

const LogoutBtn = () => {
    const router = useRouter();
    const logoutHandler = async () => {
        Swal.fire({
            title: "Attention",
            icon: "warning",
            text: "are You sure You want to Log Out of Your Account?",
            showCancelButton: true,
            cancelButtonText: "NO",
            confirmButtonText: "YES",
            confirmButtonColor: "#a55",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch("/api/auth/signout", {
                    method: "POST"
                });
                if (res.status === 200) {
                    router.replace(`/login-register?method=${loginRegisterMethods.signin}`);
                }
                else {
                    Swal.fire({
                        title: "Operation Failed",
                        icon: "error",
                        text: "Somthing went wrong.Please try again later!",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#333",
                    });
                    return
                }
            }
        })
    }
    return (
        <button onClick={logoutHandler} className='flex items-center p-2 lg:ml-4 mt-3 border text-red-500 font-semibold border-red-500 transition-all hover:bg-red-500 hover:text-slate-200 rounded-md'>Log out <IoLogOutOutline className='text-xl ml-2' /></button>
    );
}

export default LogoutBtn;
