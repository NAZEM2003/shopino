"use client"
import { authAdmin, getAllProducts } from '@/utils/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import EditProductModal from './EditProductModal';

const ProductsTable = () => {
    const [product, setProduct] = useState("");
    const [isModalShown, setIsModalShown] = useState(false);

    const router = useRouter();
    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        const allProducts = await getAllProducts();
        setProducts(allProducts)
    }
    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteProduct = async (productID) => {
        Swal.fire({
            title: "Attention",
            icon: "warning",
            text: "are You sure You want to Delete this Product?",
            showCancelButton: true,
            cancelButtonText: "NO",
            confirmButtonText: "YES",
            confirmButtonColor: "#a55",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const admin = await authAdmin();
                if (!admin) {
                    router.push(`/`);
                }
                const res = await fetch("/api/products", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ productID })
                });
                if (res.ok) {
                    Swal.fire({
                        title: "Done",
                        text: "The Product Was Successfully Deleted.",
                        icon: "success"
                    });
                    fetchProducts();
                    return
                } else if (res.status === 400) {
                    Swal.fire({
                        title: "Operation Failed",
                        text: "The Product ID is invalid.",
                        icon: "error"
                    });
                    return
                } else {
                    Swal.fire({
                        title: "Operation Failed",
                        text: "Somthing went Wrong , Please try again later.",
                        icon: "error"
                    });
                    return
                }
            }
        })
    };
    const showEditModal = async (product) => {
        setProduct(product);
        setIsModalShown(true);
    }

    return (
        <>
            {
                products.length > 0 ? <>

                    {
                        isModalShown ?
                            <EditProductModal isShown={isModalShown} setIsShown={setIsModalShown} fetchProducts={fetchProducts} product={JSON.parse(JSON.stringify(product))} />
                            : ""
                    }
                    <table className='w-full min-w-[640px] overflow-x-scroll  mt-14 border border-zinc-500 '>
                        <thead className='border border-zinc-500 bg-zinc-400'>
                            <tr className='text-zinc-800 h-14'>
                                <th className='border border-zinc-500'>row</th>
                                <th className='border border-zinc-500'>Name</th>
                                <th className='border border-zinc-500'>Price</th>
                                <th className='border border-zinc-500'>Score</th>
                                <th className='border border-zinc-500'>is Exist</th>
                                <th className='border border-zinc-500'>Category</th>
                                <th className='border border-zinc-500'>Details Page</th>
                                <th className='border border-zinc-500'>Edit</th>
                                <th className='border border-zinc-500'>Delete</th>
                            </tr>
                        </thead>
                        <tbody className='border border-zinc-500'>
                            {
                                products.map((product, index) => <tr key={product._id} className='border border-zinc-500 text-lg'>
                                    <td className='border border-zinc-500 p-2 text-center'>
                                        {index + 1}
                                    </td>
                                    <td className='border border-zinc-500 p-1 text-center w-40'>
                                        {product.name}
                                    </td>
                                    <td className='border border-zinc-500 font font-semibold text-zinc-800 p-2 '>
                                        {product.price.toFixed(2)} $
                                    </td>
                                    <td className='border border-zinc-500 p-2 text-center'>
                                        {product.score}
                                    </td>
                                    <td className='border border-zinc-500 text-center p-2'>
                                        <p className={`font-medium ${product.isExist ? "text-green-600" : "text-red-600"}`}>
                                            {
                                                product.isExist ? "Available" : "Not Available"
                                            }
                                        </p>
                                    </td>
                                    <td className='border border-zinc-500 text-center p-2'>
                                        <p className={`font-medium`}>
                                            {
                                                product.category.title
                                            }
                                        </p>
                                    </td>
                                    <td className='border border-zinc-500 p-2 text-center'>
                                        <Link href={`/product/${product._id}`} className='border inline-block border-zinc-600 p-2 rounded-md font-semibold text-zinc-600 hover:bg-zinc-600 hover:text-slate-200'>Details</Link>
                                    </td>

                                    <td className='border border-zinc-500 p-2 text-center'>
                                        <button onClick={() => showEditModal(product)} className='border border-amber-500 p-2 rounded-md font-semibold text-amber-500 hover:bg-amber-500 hover:text-slate-200'>Edit</button>
                                    </td>
                                    <td className='border border-zinc-500 p-2 text-center'>
                                        <button onClick={() => deleteProduct(product._id)} className='border border-red-600 p-2 rounded-md font-semibold text-red-600 hover:bg-red-600 hover:text-slate-200'>Delete</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </> : <h1 className='text-center mt-28 font-semibold text-3xl text-zinc-500'>There are no Products!</h1>
            }
        </>
    );
}

export default ProductsTable;
