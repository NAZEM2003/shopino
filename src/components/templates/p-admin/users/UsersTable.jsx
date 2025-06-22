"use client"
import { role } from '@/utils/constants';
import React, { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import ChangeRoleModal from './ChangeRoleModal';
import { getAllUsers } from '@/utils/actions';
import Swal from 'sweetalert2';
import { emailSchema } from '@/utils/zod';


const UsersTable = ({ }) => {
    const [isModalShown, setIsModalShown] = useState(false);
    const [userID, setUserID] = useState("");
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const allUsers = await getAllUsers();
        setUsers(JSON.parse(JSON.stringify(allUsers)));
    }
    useEffect(() => {
        fetchUsers()
    }, []);

    const showModalHandler = async (id) => {
        setUserID(id);
        setIsModalShown(true);
    };
    const deleteUserHandler = async (id) => {
        Swal.fire({
            title: "Attention",
            icon: "warning",
            text: "are You sure You want to delete this User?",
            showCancelButton: true,
            cancelButtonText: "NO",
            confirmButtonText: "YES",
            confirmButtonColor: "#a55",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data = { userID: id }
                const res = await fetch("/api/user/", {
                    method: "DELETE",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(data)
                });
                if (res.status === 200) {
                    Swal.fire({
                        title: "Done",
                        icon: "success",
                        text: "user successfully deleted"
                    });
                    fetchUsers();
                    return
                } else if (res.status === 500) {
                    Swal.fire({
                        title: "Operation Failed",
                        icon: "error",
                        text: "Somthing went wrong.Please try again later"
                    });
                    return
                } else {
                    const resData = await res.json();
                    Swal.fire({
                        title: "Operation Failed",
                        icon: "error",
                        text: resData.message
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
                    headers:{
                        "Content-Type":"application/json"
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
            <ChangeRoleModal setIsModalShown={setIsModalShown} isModalShown={isModalShown} userID={userID} fetchUsers={fetchUsers} />
            <table className='w-full min-w-[640px] overflow-x-scroll  mt-14 border border-zinc-500 '>
                <thead className='border border-zinc-500 bg-zinc-400'>
                    <tr className='text-zinc-800 h-14'>
                        <th className='border border-zinc-500'>row</th>
                        <th className='border border-zinc-500'>Name</th>
                        <th className='border border-zinc-500'>Email</th>
                        <th className='border border-zinc-500'>Role</th>
                        <th className='border border-zinc-500'>Change Role</th>
                        <th className='border border-zinc-500'>Delete</th>
                        <th className='border border-zinc-500'>Ban</th>
                    </tr>
                </thead>
                <tbody className='border border-zinc-500'>
                    {
                        users.map((user, index) => <tr key={user._id} className='border border-zinc-500 text-lg'>
                            <td className='border border-zinc-500 p-2 text-center'>
                                {index + 1}
                            </td>
                            <td className='border border-zinc-500 p-2'>
                                {user.name}
                            </td>
                            <td className='border border-zinc-500 p-2'>
                                {user.email}
                            </td>
                            <td className='border border-zinc-500 p-2'>
                                <p className='flex items-center justify-center'>
                                    {
                                        user.role
                                    }
                                    {
                                        user.role === role.admin ? <FaStar className='ml-2 text-orange-600' /> : ""
                                    }
                                </p>
                            </td>
                            <td className='border border-zinc-500 p-1 text-center'>
                                <button onClick={() => showModalHandler(user._id)} className='border border-green-600 p-2 rounded-md font-semibold text-green-600 hover:bg-green-600 hover:text-slate-200'>Change Role</button>
                            </td>
                            <td className='border border-zinc-500 p-1 text-center'>
                                <button onClick={() => deleteUserHandler(user._id)} className='p-2 rounded-md font-semibold bg-red-600 border border-red-600 text-slate-200 hover:bg-slate-200 hover:text-red-600'>Delete</button>
                            </td>
                            <td className='border border-zinc-500 p-2 text-center'>
                                <button onClick={() => banUserHandler(user.email)} className='border border-red-600 p-2 rounded-md font-semibold text-red-600 hover:bg-red-600 hover:text-slate-200'>Ban</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </>
    );
}

export default UsersTable;
