"use client"
import SubmitBtn from '@/components/modules/buttons/SubmitBtn';
import { convertToBase64 } from '@/utils/helper';
import { updateUserSchema } from '@/utils/zod';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

const UserDataForm = ({user}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [userImg, setUserImg] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const fetchUser = async () => {
        setName(user?.name);
        setEmail(user?.email);
        setUserImg(user?.img);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const fileInputRef = useRef();

    const fileChangeHandler = (e) => {
        const file = e.target.files[0];
        setImageFile(file);

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            return
        } else {
            setImagePreview(null);
            return
        }
    }

    const saveChanges = async () => {
        const data = new FormData();
        const isDataValid = updateUserSchema.safeParse({ name, email });
        if (!isDataValid.success) {
            Swal.fire({
                title: "Update Failed",
                icon: "error",
                text: isDataValid.error.issues[0].message,
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return
        }
        data.append("name", name);
        data.append("email", email);
        if (imageFile) {
            const base64Image = await convertToBase64(imageFile)
            data.append("img", base64Image);
        }
        const res = await fetch("/api/user", {
            method: "PATCH",
            body: data
        });
        if (res.ok) {
            Swal.fire({
                title: "Done",
                text: "Your Profile has been Successfully updated ",
                icon: "success",
                confirmButtonColor: "#8a8"
            });
            fetchUser();
            return
        }
        else if (res.status === 400) {
            const responseData = await res.json();
            Swal.fire({
                title: "Operation Failed",
                text: responseData.message,
                icon: "error",
                confirmButtonColor: "#a88"
            });
            return
        } else {
            Swal.fire({
                title: "Operation Failed",
                text: "Somthing went wrong.Please try again Later",
                icon: "error",
                confirmButtonColor: "#a88"
            });
            return
        }
    }

    return (
        <form className='w-full max-w-sm flex flex-col items-center border border-zinc-400 rounded-lg p-3 my-10 md:mr-4 md:mt-7 shadow-xl shadow-zinc-400' action={saveChanges} >
            <div className='relative w-24 h-24 rounded-full overflow-hidden'>
                <Image src={imagePreview || decodeURIComponent(userImg) || "/uploads/users/defaultProfile.png"} fill alt='Profile image' />
            </div>
            <input accept='image/*' onChange={fileChangeHandler} multiple={false} ref={fileInputRef} type="file" className='hidden' />

            <button className='p-2 mt-5 border border-custom-dark-blue outline-none rounded-md w-max font-semibold text-lg text-custom-dark-blue bg-slate-200 transition-all duration-200 hover:bg-custom-dark-blue hover:text-slate-200' onClick={() => {
                fileInputRef.current?.click()
            }} type='button'>Choose image</button>

            <label className='w-full text-lg p-2 font-semibold text-zinc-800 mt-10' htmlFor="name">Name:</label>
            <input className='w-full outline-none p-2 border border-zinc-400 rounded-md shadow-md shadow-zinc-400 text-lg font-semibold text-zinc-900' id='name' type="text" value={name} onChange={(e) => setName(e.target.value)} />

            <label className='w-full text-lg p-2 font-semibold text-zinc-800 mt-6' htmlFor="email">Email:</label>
            <input className='w-full outline-none p-2 border border-zinc-400 rounded-md shadow-md shadow-zinc-400 text-lg font-semibold text-zinc-900' id='email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

            <SubmitBtn text="Save Changes" />
        </form>
    );
}

export default UserDataForm;
