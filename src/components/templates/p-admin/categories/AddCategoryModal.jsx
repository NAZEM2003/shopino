"use client"
import SubmitBtn from '@/components/modules/buttons/SubmitBtn';
import { convertToBase64 } from '@/utils/helper';
import { categoryTitleSchema } from '@/utils/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Swal from 'sweetalert2';

const AddCategoryModal = ({ isModalShown, setIsModalShown, getCategories }) => {
    const [imagePreview, setImagePreview] = useState(null);

    const [title, setTitle] = useState("");
    const [imageFile, setImageFile] = useState(null);

    const router = useRouter();

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

    const addCategory = async () => {
        const isTitleValid = categoryTitleSchema.safeParse(title);
        if (!isTitleValid.success) {
            Swal.fire({
                title: "Operation Failed",
                text: isTitleValid.error.issues[0].message,
                icon: "error"
            });
            return
        };
        if (!imageFile) {
            Swal.fire({
                title: "Operation Failed",
                text: "Please Select the Category Image",
                icon: "error"
            });
            return
        }
        const base64Image = await convertToBase64(imageFile);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("img", base64Image);

        const res = await fetch('/api/category', {
            method: "POST",
            body: formData
        });
        if (res.ok) {
            Swal.fire({
                title: "Done",
                text: "Category Added Successfully",
                icon: "success"
            });
            setTitle("");
            setImagePreview('');
            setImageFile(null);
            getCategories();
            setIsModalShown(false);
            return
        } else if (res.status === 403) {
            router.replace("/");
        } else if (res.status === 422) {
            const data = await res.json();
            Swal.fire({
                title: "Operation Failed",
                text: data.message,
                icon: "error"
            });
            return
        } else {
            Swal.fire({
                title: "Operation Failed",
                text: "Something went wrong , Please try again later!",
                icon: "error"
            });
            return
        }
    }
    
    return (
        <div className={`w-full h-full bg-zinc-500 justify-center items-center fixed top-0 left-0 bg-opacity-50 ${isModalShown ? "flex" : "hidden"}`}>
            <form className='w-56 sm:w-72 p-5 mt-20 bg-slate-200 rounded-md z-20 flex flex-col relative' action={addCategory}>
                <h2 className='text-xl text-center sm:text-2xl mt-5 text-zinc-800'>Add New Category</h2>
                <button type='button' onClick={() => setIsModalShown(false)} className='ml-auto inline-block text-zinc-800 absolute right-2 top-2 hover:text-red-600 transition-all duration-200'>
                    <IoClose className='text-3xl' />
                </button>

                <div className='flex items-center justify-center my-5 flex-col'>
                    <div className='relative w-24 h-24 rounded-md overflow-hidden'>
                        <Image src={imagePreview || "/images/logo.svg"} fill alt='Profile image' />
                    </div>
                    <input accept='image/*' onChange={imageChangeHandler} multiple={false} ref={imgInputRef} type="file" className='hidden' />

                    <button className='p-2 mt-5 border border-custom-dark-blue outline-none rounded-md w-max font-semibold text-lg text-custom-dark-blue bg-slate-200 transition-all duration-200 hover:bg-custom-dark-blue hover:text-slate-200' onClick={() => {
                        imgInputRef.current?.click()
                    }} type='button'>Choose image</button>
                </div>

                <label className='mt-5 mb-2 text-lg font-medium text-zinc-800' htmlFor="title">Title :</label>
                <input
                    className='p-2 text-lg font-medium outline-none border border-zinc-400 rounded-md shadow-md shadow-zinc-500'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id='title'
                    type="text"
                    placeholder='Title...'
                />

                <SubmitBtn text="Add " />

            </form>


            <div onClick={() => setIsModalShown(false)} className='absolute w-full h-full'></div>
        </div>
    );
}

export default AddCategoryModal;
