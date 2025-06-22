"use client"
import SubmitBtn from '@/components/modules/buttons/SubmitBtn';
import { role } from '@/utils/constants';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Swal from 'sweetalert2';


const ChangeRoleModal = ({ userID, isModalShown, setIsModalShown, fetchUsers }) => {
    const [newRole, setNewRole] = useState("");
    const inputChangeHandler = (e) => {
        setNewRole(e.target.value);
    };

    
    const changeRoleHandler = async () => {
        if (!newRole) {
            Swal.fire({
                title: "operation Failed",
                text: "Please select the Role",
                icon: "error",
            });
            return
        }
        if (newRole !== role.admin && newRole !== role.user) {
            Swal.fire({
                title: "operation Failed",
                text: "Please select a valid Role",
                icon: "error",
            });
            return
        };
        const data = { userID, newRole };
        const res = await fetch("/api/user/role", {
            method: "PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        });
        if (res.status === 200) {
            Swal.fire({
                title: "Done",
                text: "Role Changed Successfully",
                icon: "success",
            });
            fetchUsers();
            setIsModalShown(false);
            return
        } else if (res.status === 400) {
            const resData = await res.json();
            Swal.fire({
                title: "operation Failed",
                text: resData.message,
                icon: "error",
            });
            return
        } else if (res.status === 404) {
            Swal.fire({
                title: "operation Failed",
                text: "no user with this ID was Found.",
                icon: "error",
            });
            return
        } else {
            Swal.fire({
                title: "operation Failed",
                text: "Somthing went wrong. Please try again later",
                icon: "error",
            });
            return
        }
    };
    return (
        <div className={`w-full h-full bg-zinc-500 justify-center items-center absolute top-0 left-0 bg-opacity-50 ${isModalShown ? "flex" : "hidden"}`}>
            <form className='w-56 sm:w-72 p-5 bg-slate-200 rounded-md z-20 flex flex-col items-center relative' action={changeRoleHandler}>
                <h2 className='text-xl sm:text-2xl mt-5 text-zinc-800'>Select the User Role</h2>
                <button type='button' onClick={() => setIsModalShown(false)} className='ml-auto inline-block text-zinc-800 absolute right-2 top-2 hover:text-red-600 transition-all duration-200'>
                    <IoClose className='text-3xl' />
                </button>
                <div className='text-xl mt-10'>
                    <input onChange={inputChangeHandler} value={role.admin} type="radio" name='role' id='admin' />
                    <label className='ml-2' htmlFor="admin">Admin</label>
                </div>
                <div className='text-xl mt-5'>
                    <input onChange={inputChangeHandler} value={role.user} type="radio" name='role' id='user' />
                    <label className='ml-2' htmlFor="user">User</label>
                </div>

                <SubmitBtn text="Save" />
            </form>

            
            <div onClick={() => setIsModalShown(false)} className='absolute w-full h-full'></div>

        </div>
    );
}

export default ChangeRoleModal;
