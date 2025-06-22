"use client"
import SubmitBtn from '@/components/modules/buttons/SubmitBtn';
import { changePasswordSchema } from '@/utils/zod';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ChangePasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const changePassword = async () => {
        const isDataValid = changePasswordSchema.safeParse({ currentPassword, newPassword });
        if (!isDataValid.success) {
            Swal.fire({
                title: "Operation failed",
                icon: "error",
                text: isDataValid.error.issues[0].message,
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return
        }
        if (newPassword === currentPassword) {
            Swal.fire({
                title: "Operation failed",
                icon: "error",
                text: "the New Password is the same as the Current Password",
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return
        }
        if (newPassword !== repeatPassword) {
            Swal.fire({
                title: "Operation failed",
                icon: "error",
                text: "Repeated Password is not equal to the new Password",
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return
        }
        const data = { currentPassword, newPassword, repeatPassword };
        const res = await fetch("/api/user/password", {
            method: "PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            Swal.fire({
                title: "Done",
                text: "Your Password has been Successfully Changed",
                icon: "success",
                confirmButtonColor: "#8a8"
            });
            setCurrentPassword("");
            setNewPassword("");
            setRepeatPassword("");
            return
        } else if (res.status === 400) {
            const responseData = await res.json();
            Swal.fire({
                title: "Operation failed",
                icon: "error",
                text: responseData.message,
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            })
        } else {
            Swal.fire({
                title: "Operation failed",
                icon: "error",
                text: "Somthing went wrong. Please try again later",
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            })
        }
    }


    return (
        <form action={changePassword} className='w-full max-w-sm md:max-w-xs flex flex-col items-center border border-zinc-400 rounded-lg p-3 my-10 md:mt-7 shadow-xl shadow-zinc-400'>
            <h2 className='text-2xl font-semibold my-3 text-zinc-800'>Change Password</h2>

            <label className='w-full text-lg p-2 font-semibold text-zinc-800 mt-10' htmlFor="currentPass">Current Password:</label>
            <input
                className='w-full outline-none p-2 border border-zinc-400 rounded-md shadow-md shadow-zinc-400 text-lg font-semibold text-zinc-900'
                id='currentPass'
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <label className='w-full text-lg p-2 font-semibold text-zinc-800 mt-10' htmlFor="newPass">New Password:</label>
            <input
                className='w-full outline-none p-2 border border-zinc-400 rounded-md shadow-md shadow-zinc-400 text-lg font-semibold text-zinc-900'
                id='newPass'
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />

            <label className='w-full text-lg p-2 font-semibold text-zinc-800 mt-10' htmlFor="repeatPass">Repeat New Password:</label>
            <input
                className='w-full outline-none p-2 border border-zinc-400 rounded-md shadow-md shadow-zinc-400 text-lg font-semibold text-zinc-900'
                id='repeatPass'
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
            />

            <SubmitBtn text="Save Changes" />

        </form>
    );
}

export default ChangePasswordForm;

