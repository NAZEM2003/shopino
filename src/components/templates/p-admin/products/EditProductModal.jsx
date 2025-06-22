import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import styles from "@/styles/p-admin/product/edit/editProductmodal/style.module.css";
import SubmitBtn from '@/components/modules/buttons/SubmitBtn';
import { productSchema } from '@/utils/zod';
import { IoMdClose } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { convertToBase64 } from '@/utils/helper';

const EditProductModal = ({ setIsShown, fetchProducts, product }) => {
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [categories, setCategories] = useState([]);
    //product details
    const [productImg, setProductImg] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [isExist, setIsExist] = useState(true);
    const [category, setCategory] = useState("");
    const router = useRouter();
    const imgInputRef = useRef();

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch("/api/category");
            if (res.ok) {
                const data = await res.json();
                const categories = []
                for (const category of data) {
                    if (category._id !== product.category._id) {
                        categories.push(category);
                    }
                }
                setCategories(categories);
            } else {
                Swal.fire({
                    title: "Operation Failed",
                    text: "Failed to receive categories, Please refresh the Page.",
                    icon: "error"
                });
            }
        }
        fetchCategories();
        setName(product.name);
        setPrice(product.price);
        setQuantity(product.quantity);
        setDescription(product.description);
        setIsExist(product.isExist);
        setCategory(product.category._id);
        setProductImg(product.img);
    }, [product]);

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


    const editProductHandler = async () => {
        const data = { name, price: Number(price), quantity, description, category };
        const isDataValid = productSchema.safeParse(data);
        if (!isDataValid.success) {
            Swal.fire({
                title: "Operation Failed",
                text: isDataValid.error.issues[0].message,
                icon: "error"
            });
            return
        }
        const base64Image = imageFile ? await convertToBase64(imageFile) :""
        const formData = new FormData();
        for (const property in data) {
            formData.append(`${property}`, data[property]);
        }
        formData.append("isExist", isExist ? "true" : "");
        formData.append("img", base64Image);
        const res = await fetch(`/api/products/${product._id}`, {
            method: "PATCH",
            body: formData
        });
        if (res.ok) {
            Swal.fire({
                title: "Done",
                text: "The Product was Successfully Edited",
                icon: "success"
            });
            fetchProducts();
            setIsShown(false);
            return
        } else if (res.status === 403) {
            router.replace('/');
            return
        }
        else if (res.status === 500) {
            Swal.fire({
                title: "Operation Failed",
                text: "Somthing went wrong , Please try again later.",
                icon: "error"
            });
            return
        }
        else {
            const resData = await res.json();
            Swal.fire({
                title: "Operation Failed",
                text: resData.message,
                icon: "error"
            });
            return;
        }
    };

    return (
        <div className={`w-full h-full fixed top-0 left-0 flex items-center justify-center bg-zinc-900 bg-opacity-30 p-3`}>

            <form className={`${styles.edit_form} shadow-lg shadow-zinc-400 text-zinc-800`} action={editProductHandler}>
                <button onClick={() => setIsShown(false)} className='absolute top-3 right-3' title='Close' type='button'><IoMdClose className='text-3xl font-medium  text-zinc-800 hover:text-red-600 transition-all' /></button>

                <h2 className='text-xl font-semibold text-zinc-800 text-center my-5'>Edit Product Details</h2>
                <div className='flex items-center justify-center flex-col'>
                    <div className='relative w-24 h-24 rounded-md overflow-hidden'>
                        <Image src={imagePreview || decodeURIComponent(productImg) || "/images/logo.svg"} fill alt='Profile image' />
                    </div>
                    <input onChange={imageChangeHandler} multiple={false} ref={imgInputRef} type="file" className='hidden' />

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

                <div className='mt-5 mb-2 flex items-center'>
                    <label className='text-lg font-medium text-zinc-800' htmlFor="isExist">Is Exist :</label>
                    <input className='ml-2 w-5 h-5' checked={isExist} value={isExist} onChange={(e) => setIsExist(e.target.checked)} id='isExist' type="checkbox" />
                </div>

                <div >
                    <label className='mt-5 mb-2 text-lg font-medium text-zinc-800' htmlFor="category">Category :</label>

                    <select className='ml-2 p-2 text-lg font-medium outline-none border border-zinc-400 rounded-md shadow-md shadow-zinc-500' value={category} onChange={e => setCategory(e.target.value)} name="category" id="category">
                        <option value={product.category._id}>{product.category.title}</option>
                        {
                            categories.length ?
                                categories.map(category => <option key={category._id} value={category._id}>{category.title}</option>)
                                : ""
                        }
                    </select>
                </div>

                <SubmitBtn text="Save" />

            </form>

            <div onClick={() => setIsShown(false)} className='absolute w-full h-full top-0 left-0'></div>
        </div>
    );
}

export default EditProductModal;
