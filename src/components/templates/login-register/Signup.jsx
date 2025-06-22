"use client"
import SubmitBtn from '@/components/modules/buttons/SubmitBtn';
import { loginRegisterMethods } from '@/utils/constants';
import { convertToBase64 } from '@/utils/helper';
import { signupSchema } from '@/utils/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import Swal from 'sweetalert2';

const Signup = () => {
    const [imagePreview, setImagePreview] = useState(null);
    //form values
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageFile, setImageFile] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();
    const formRef = useRef();
    const imgInputRef = useRef();

    const imageChangeHandler = (e) => {
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
    };

    const signupHandler = async () => {
        // data validation
        const isValidData = signupSchema.safeParse({ name, email, password });
        if (!isValidData.success) {
            Swal.fire({
                title: "Sign Up failed",
                icon: "error",
                text: isValidData.error.issues[0].message,
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return false
        }
        if (confirmPassword !== password) {
            Swal.fire({
                title: "Sign Up faild",
                icon: "error",
                text: "Password Confirmation is not the same as Password",
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return false
        }
        // data validation end
        const base64Image = imageFile ? await convertToBase64(imageFile) : ""
        const formData = new FormData();
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("img", base64Image)
        //send request
        const res = await fetch(`/api/auth/signup`, {
            method: "POST",
            body: formData
        });
        const data = await res.json();
        if (res.status === 201) {
            //reset the inputs
            formRef.current.reset();
            setConfirmPassword("")
            setPassword("");
            setName("");
            setEmail("");
            Swal.fire({
                title: "Done",
                icon: "success",
                text: "you have successfully Signed Up",
                confirmButtonText: "Ok",
                confirmButtonColor: "#499"
            }).then(() => {
                router.replace("/")
            })
            return true
        } else {
            Swal.fire({
                title: "Sign Up faild",
                icon: "error",
                text: data.message,
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return false
        }

    }
    return (
        <form ref={formRef} action={signupHandler} className='w-full max-w-sm sm:w-10/12 sm:max-w-lg flex flex-col items-center  backdrop-blur-md bg-slate-200 bg-opacity-15 text-slate-800 mx-auto mt-8 rounded-md px-4'>
            <h2 className='my-5 text-2xl text-slate-100 font-semibold'>Sign Up</h2>

            <div className='flex items-center justify-center flex-col mb-5'>
                <div className='relative w-24 h-24 rounded-full overflow-hidden'>
                    <Image src={imagePreview || "/uploads/users/defaultProfile.png"} fill alt='Profile image' />
                </div>
                <input accept='image/*' onChange={imageChangeHandler} multiple={false} ref={imgInputRef} type="file" className='hidden' />

                <button className='p-2 mt-5 border border-custom-dark-blue outline-none rounded-md w-max font-semibold text-lg text-custom-dark-blue bg-slate-200 transition-all duration-200 hover:bg-custom-dark-blue hover:text-slate-200' onClick={() => {
                    imgInputRef.current?.click()
                }} type='button'>Choose image</button>
            </div>
            <div className='w-full flex flex-col md:flex-row md:gap-3'>
                <input value={name} onChange={(e) => setName(e.target.value)} name='name' className='my-5 p-2 outline-none rounded  w-full' type="text" placeholder='Name...' />
                <input value={email} onChange={(e) => setEmail(e.target.value)} name='email' className='my-5 p-2 outline-none rounded  w-full' type="email" placeholder='Email...' />
            </div>
            <div className='w-full flex flex-col md:flex-row md:gap-3'>
                <input value={password} onChange={(e) => setPassword(e.target.value)} name='password' className='my-5 p-2 outline-none rounded  w-full' type="password" placeholder='password...' />
                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name='confirm_password' className='my-5 p-2 outline-none rounded  w-full' type="password" placeholder='Confirm Password...' />
            </div>
            <SubmitBtn text="Sign Up" />
            <p className='mb-5 text-slate-100'>already Have an Account? <Link className='text-custom-light-blue' href={`/login-register/?method=${loginRegisterMethods.signin}`}>Sign In</Link></p>
        </form>
    );
}

export default Signup;
