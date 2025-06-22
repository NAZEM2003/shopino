"use client"
import SubmitBtn from '@/modules/buttons/SubmitBtn';
import { authUser } from '@/utils/actions';
import { commentSchema } from '@/utils/zod';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { loginRegisterMethods } from '@/utils/constants';

const CommentForm = ({ productID }) => {
    const [score, setScore] = useState(0);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [hover, setHover] = useState(0);
    const router = useRouter();

    const sendComment = async () => {
        const isDataValid = commentSchema.safeParse({ name, message, score });
        if (!isDataValid.success) {
            Swal.fire({
                title: "Comment registration failed",
                icon: "error",
                text: isDataValid.error.issues[0].message,
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return false
        }
        const user = await authUser();
        if (!user) {
            Swal.fire({
                title: "Comment registration failed",
                icon: "error",
                text: "Please Log in to your Account first!",
                showDenyButton: true,
                denyButtonText: "cancel",
                confirmButtonText: "Login",
                confirmButtonColor: "#333"
            }).then((response) => {
                if (response.value) {
                    router.push(`/login-register/?method=${loginRegisterMethods.signin}`);
                    return false
                }
                return false

            });
            return false;
        }
        const comment = {
            name,
            message,
            score,
            userID: user._id,
            productID: productID
        }

        const res = await fetch("/api/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        });
        if (res.status === 201) {
            Swal.fire({
                title: "Commented Successfully",
                icon: "success",
                text: "Your comment was sent successfully",
                confirmButtonText: "Ok",
                confirmButtonColor: "#499"
            });
            setScore(0);
            setName('');
            setMessage("");
            return
        } else if (res.status === 422) {
            const data = await res.json();
            Swal.fire({
                title: "Comment registration failed",
                icon: "error",
                text: data.message,
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return false;
        } else {
            Swal.fire({
                title: "Comment registration failed",
                icon: "error",
                text: "Somthing went wrong, Please try again later!",
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return false;
        }
    }

    return (

        <form className='flex flex-col border border-zinc-400 rounded-lg mt-4 p-3 w-10/12 min-w-64 max-w-md' action={sendComment}>
            <h2 className='text-zinc-800 font-semibold text-lg text-center mb-6'>Your Comment</h2>
            <input value={name} onChange={(e) => setName(e.target.value)} className='p-2 text-zinc-800 rounded-md border border-zinc-400 outline-none text-xl' type="text" placeholder='name' />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className='resize-none p-3 outline-none text-xl border border-zinc-400 rounded-md my-6' rows={4} placeholder='your Comment...'></textarea>
            {/* rating stars start */}
            <div className="flex space-x-1">
                {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                        <label key={index}>
                            <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => setScore(ratingValue)}
                                className="hidden"
                            />
                            <FaStar
                                className={`cursor-pointer transition-colors duration-200 ${ratingValue <= (hover || score) ? 'text-orange-500' : 'text-zinc-700'}`}
                                size={23}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(0)}
                            />
                        </label>
                    );
                })}
            </div>
            {/* rating stars end */}
            <SubmitBtn text="Send" />
        </form>
    );
}

export default CommentForm;
