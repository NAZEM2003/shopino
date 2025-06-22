"use client"
import { getAllComments } from '@/utils/actions';

import { emailSchema } from '@/utils/zod';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const CommentsTable = () => {
    const [comments, setComments] = useState([]);
    const fetchComments = async () => {
        const allComments = await getAllComments();
        setComments(allComments);
    }
    useEffect(() => {
        fetchComments();
    }, []);

    const showCommentMessage = (message) => {
        Swal.fire({
            title: "Comment Message",
            text: message
        });
    };

    const acceptComment = async (commentID) => {
        Swal.fire({
            title: "Attention",
            icon: "warning",
            text: "are You sure You want to Accept this Comment?",
            showCancelButton: true,
            cancelButtonText: "NO",
            confirmButtonText: "YES",
            confirmButtonColor: "#a55",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch("/api/comments/accept", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ commentID })
                });
                if (res.ok) {
                    Swal.fire({
                        title: "Done",
                        text: "the Comment was successfully accepted",
                        icon: "success"
                    });
                    fetchComments();
                    return
                } else if (res.status === 500) {
                    Swal.fire({
                        title: "Operation Failed",
                        text: "somthing went wrong, Please try again later",
                        icon: "error"
                    });
                    return
                } else {
                    const resData = await req.json();
                    Swal.fire({
                        title: "Operation Failed",
                        text: resData.message,
                        icon: "error"
                    });
                    return
                }
            }
        });
    }

    const rejectComment = async (commentID) => {
        Swal.fire({
            title: "Attention",
            icon: "warning",
            text: "are You sure You want to Reject this Comment?",
            showCancelButton: true,
            cancelButtonText: "NO",
            confirmButtonText: "YES",
            confirmButtonColor: "#a55",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch("/api/comments/reject", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ commentID })
                });
                if (res.ok) {
                    Swal.fire({
                        title: "Done",
                        text: "the Comment was successfully Rejected",
                        icon: "success"
                    });
                    fetchComments();
                    return
                } else if (res.status === 500) {
                    Swal.fire({
                        title: "Operation Failed",
                        text: "somthing went wrong, Please try again later",
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
        });
    }

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

    const deleteCommentHandler = async (commentID) => {
        Swal.fire({
            title: "Attention",
            icon: "warning",
            text: "are You sure You want to Delete this Comment?",
            showCancelButton: true,
            cancelButtonText: "NO",
            confirmButtonText: "YES",
            confirmButtonColor: "#a55",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch("/api/comments", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ commentID })
                });
                if (res.ok) {
                    Swal.fire({
                        title: "Done",
                        text: "the Comment was Successfully Deleted",
                        icon: "success"
                    })
                    fetchComments();
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
        })
    }

    return (

        <>
            {
                comments.length > 0 ? <table className='w-full min-w-[640px] overflow-x-scroll  mt-14 border border-zinc-500 '>
                    <thead className='border border-zinc-500 bg-zinc-400'>
                        <tr className='text-zinc-800 h-14'>
                            <th className='border border-zinc-500'>row</th>
                            <th className='border border-zinc-500'>User</th>
                            <th className='border border-zinc-500'>Email</th>
                            <th className='border border-zinc-500'>Score</th>
                            <th className='border border-zinc-500'>Product</th>
                            <th className='border border-zinc-500'>Date</th>
                            <th className='border border-zinc-500'>View</th>
                            <th className='border border-zinc-500'>Delete</th>
                            <th className='border border-zinc-500'>Confirm / regect</th>
                            <th className='border border-zinc-500'>Ban</th>
                        </tr>
                    </thead>
                    <tbody className='border border-zinc-500'>
                        {
                            comments.map((comment, index) => <tr key={comment._id} className='border border-zinc-500 text-lg'>
                                <td className='border border-zinc-500 p-2 text-center'>
                                    {index + 1}
                                </td>
                                <td className='border border-zinc-500 p-2 text-center'>
                                    {comment.userID.name}
                                </td>
                                <td className='border border-zinc-500 font font-semibold text-zinc-800 p-2 '>
                                    {comment.userID.email}
                                </td>
                                <td className='border border-zinc-500 p-2 text-center'>
                                    {comment.score}
                                </td>
                                <td className='border border-zinc-500 text-center p-2'>
                                    <p className={`font-medium`}>
                                        {
                                            comment.productID.name
                                        }
                                    </p>
                                </td>
                                <td className='border border-zinc-500 p-1 text-center'>
                                    <p>
                                        {
                                            new Date(comment.createdAt).toLocaleDateString()
                                        }
                                    </p>
                                </td>
                                <td className='border border-zinc-500 p-2 text-center'>
                                    <button onClick={() => showCommentMessage(comment.message)} className='border border-zinc-600 p-2 rounded-md font-semibold text-zinc-600 hover:bg-zinc-600 hover:text-slate-200'>View</button>
                                </td>

                                <td className='border border-zinc-500 p-2 text-center'>
                                    <button onClick={() => deleteCommentHandler(comment._id)} className='border border-red-600 p-2 rounded-md font-semibold text-red-600 hover:bg-red-600 hover:text-slate-200'>Delete</button>
                                </td>
                                <td className='border border-zinc-500 p-2 text-center'>
                                    {
                                        comment.isAccepted ? <button onClick={() => rejectComment(comment._id)} className='border border-zinc-600 p-2 rounded-md font-semibold text-zinc-600 hover:bg-zinc-600 hover:text-slate-200'>Reject</button>
                                            : <button onClick={() => acceptComment(comment._id)} className='border border-green-600 p-2 rounded-md font-semibold text-green-600 hover:bg-green-600 hover:text-slate-200'>Confirm</button>
                                    }
                                </td>
                                <td onClick={() => banUserHandler(comment.userID.email)} className='border border-zinc-500 p-2 text-center'>
                                    <button className='border border-red-600 p-2 rounded-md font-semibold text-red-600 hover:bg-red-600 hover:text-slate-200'>Ban</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table> : <h1 className='text-center mt-28 font-semibold text-3xl text-zinc-500'>There are no Comments</h1>
            }
        </>
    );
}

export default CommentsTable;
