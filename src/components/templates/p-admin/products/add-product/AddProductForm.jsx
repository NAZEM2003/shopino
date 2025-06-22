"use client"
import SubmitBtn from '@/components/modules/buttons/SubmitBtn';
import { convertToBase64 } from '@/utils/helper';
import { productSchema } from '@/utils/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

const AddProductForm = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [categories, setCategories] = useState([]);
    //form values
    const [imageFile, setImageFile] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const router = useRouter();

    const imgInputRef = useRef();

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch("/api/category");
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            } else {
                Swal.fire({
                    title: "Operation Failed",
                    text: "Failed to receive categories, Please refresh the Page.",
                    icon: "error"
                });
            }

        };
        fetchCategories();
    }, []);

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

    const AddProductHandler = async () => {
        const formData = new FormData();
        const productData = { name, price: Number(price), quantity, description, category, img: imageFile }
        const isDataValid = productSchema.safeParse(productData);
        if (!isDataValid.success) {
            Swal.fire({
                title: "Operation Failed",
                text: isDataValid.error.issues[0].message,
                icon: "error"
            });
            return
        }
        if (!productData.img) {
            Swal.fire({
                title: "Operation Failed",
                text: "Please Select the Product Image",
                icon: "error"
            });
            return
        }
        const base64Image = await convertToBase64(imageFile);
        formData.append("name", name);
        formData.append("price" , price);
        formData.append("quantity" , quantity);
        formData.append("description" , description);
        formData.append("category" , category);
        formData.append("img" , base64Image);


        const res = await fetch("/api/products", {
            method: "POST",
            body: formData
        });
        if (res.ok) {
            Swal.fire({
                title: "Done",
                text: "Product added successfully",
                icon: "success"
            });
            setImageFile("");
            setName("");
            setPrice("");
            setQuantity("");
            setDescription("");
            setImagePreview("");
            return;
        } else if (res.status === 403) {
            router.replace('/');
            return
        } else if (res.status === 500) {
            Swal.fire({
                title: "Operation Failed",
                text: "Somthing went wrong , Please try again later",
                icon: "error"
            });
            return;
        } else {
            const resData = await res.json();
            Swal.fire({
                title: "Operation Failed",
                text: resData.message,
                icon: "error"
            });
            return;
        }
    }

    return (
        <form className={`shadow-lg shadow-zinc-400 text-zinc-800 w-full rounded-md flex flex-col mx-auto p-1 sm:p-3 mt-10 max-w-lg border border-zinc-400`} action={AddProductHandler}>

            <h2 className='text-xl sm:text-2xl font-semibold text-zinc-800 text-center mt-3 mb-6'>Product Details</h2>

            <div className='flex items-center justify-center flex-col'>
                <div className='relative w-24 h-24 rounded-md overflow-hidden'>
                    <Image src={imagePreview || "/images/logo.svg"} fill alt='Profile image' />
                </div>
                <input accept='image/*' onChange={imageChangeHandler} multiple={false} ref={imgInputRef} type="file" className='hidden' />

                <button className='p-2 mt-5 border border-custom-dark-blue outline-none rounded-md w-max font-semibold text-lg text-custom-dark-blue bg-slate-200 transition-all duration-200 hover:bg-custom-dark-blue hover:text-slate-200' onClick={() => {
                    imgInputRef.current?.click()
                }} type='button'>Choose image</button>
            </div>

            <label className='mt-5 mb-2 text-lg font-medium text-zinc-800' htmlFor="name">Name :</label>
            <input className='p-2 text-lg font-medium outline-none border border-zinc-400 rounded-md shadow-md shadow-zinc-500' value={name} onChange={(e) => setName(e.target.value)} id='name' type="text" />

            <label className='mt-5 mb-2 text-lg font-medium text-zinc-800' htmlFor="price">Price :</label>
            <input className='p-2 text-lg font-medium outline-none border border-zinc-400 rounded-md shadow-md shadow-zinc-500' value={price} onChange={(e) => setPrice(e.target.value)} id='price' type="number" />

            <label className='mt-5 mb-2 text-lg font-medium text-zinc-800' htmlFor="quantity">Quantity :</label>
            <input className='p-2 text-lg font-medium outline-none border border-zinc-400 rounded-md shadow-md shadow-zinc-500' value={quantity} onChange={(e) => setQuantity(e.target.value)} id='quantity' type="text" />
            <div className='flex flex-col'>
                <label className='mt-5 mb-2 text-lg font-medium text-zinc-800' htmlFor="description">Description :</label>
                <textarea rows={5} className='resize-none p-2 text-lg font-medium outline-none border border-zinc-400 rounded-md shadow-md shadow-zinc-500' value={description} onChange={(e) => setDescription(e.target.value)} id='description' />
            </div>

            <div className='mt-5'>
                <label className='mt-5 mb-2 text-lg font-medium text-zinc-800' htmlFor="category">Category :</label>

                <select
                    className='ml-2 p-2 text-lg font-medium outline-none border border-zinc-400 rounded-md shadow-md shadow-zinc-500'
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    name="category"
                    id="category"
                >
                    <option value="">Select Category</option>
                    {
                        categories.length ?
                            categories.map(category => <option key={category._id} value={category._id}>{category.title}</option>)
                            : ""
                    }
                </select>
            </div>

            <SubmitBtn text="Add Product" />

        </form>
    );
}

export default AddProductForm;
