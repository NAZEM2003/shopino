"use client"
import React, { useEffect, useState } from 'react';
import AddDiscountForm from './AddDiscountForm';
import { getDiscounts } from '@/utils/actions';
import Swal from 'sweetalert2';
import { loginRegisterMethods } from '@/utils/constants';
import { useRouter } from 'next/navigation';


const DiscountsTable = () => {
    const [discounts, setDiscounts] = useState([]);

    const router = useRouter();

    const fetchDiscounts = async () => {
        const allDiscounts = await getDiscounts();
        setDiscounts(allDiscounts);
    }
    useEffect(() => {
        fetchDiscounts();
    }, []);

    const deleteDiscount = async (discountID) => {
        Swal.fire({
            title: "Attention",
            icon: "warning",
            text: "are You sure You want to Delete this Discount?",
            showCancelButton: true,
            cancelButtonText: "NO",
            confirmButtonText: "YES",
            confirmButtonColor: "#a55",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch("/api/discount", {
                    method: "DELETE",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({ discountID })
                });
                if (res.ok) {
                    Swal.fire({
                        title: "Done",
                        text: "Discount Successfully Removed",
                        icon: "success"
                    });
                    fetchDiscounts();
                    return
                } else if (res.status === 500) {
                    Swal.fire({
                        title: "Operation Failed",
                        text: "Somthing went wrong, Please try again later",
                        icon: "error"
                    });
                    return
                } else if (res.status === 403) {
                    Swal.fire({
                        title: "Operation Failed",
                        text: "Your Token has expired , Please log in again",
                        icon: "error"
                    });
                    router.replace(`/login-register?method=${loginRegisterMethods.signin}`);
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
        })
    }

    return (
        <section className='my-10'>
            <AddDiscountForm fetchDiscounts={fetchDiscounts} />
            <div className='overflow-x-auto'>
                {
                    discounts.length > 0 ? <table className='w-full min-w-[640px] overflow-x-scroll  mt-14 border border-zinc-500'>
                        <thead className='border border-zinc-500 bg-zinc-400'>
                            <tr className='text-zinc-800 h-14'>
                                <th className='border border-zinc-500'>row</th>
                                <th className='border border-zinc-500'>Code</th>
                                <th className='border border-zinc-500'>Percentage</th>
                                <th className='border border-zinc-500'>Maximum Use</th>
                                <th className='border border-zinc-500'>Used Times</th>
                                <th className='border border-zinc-500'>Creator</th>
                                <th className='border border-zinc-500'>Date</th>
                                <th className='border border-zinc-500'>Delete</th>
                            </tr>
                        </thead>
                        <tbody className='border border-zinc-500'>
                            {
                                discounts.map((discount, index) => <tr key={discount._id} className={`border border-zinc-500 text-lg ${discount.uses === discount.maxUse ? "bg-red-400 text-slate-200" : ""}`}>
                                    <td className='border border-zinc-500 p-2 text-center'>
                                        {index + 1}
                                    </td>
                                    <td className='border border-zinc-500 p-2 text-center font-semibold'>
                                        {discount.code}
                                    </td>
                                    <td className='border border-zinc-500 text-center p-2 '>
                                        {discount.percent}
                                    </td>
                                    <td className='border border-zinc-500 p-2 text-center'>
                                        {discount.maxUse}
                                    </td>
                                    <td className='border border-zinc-500 text-center p-2'>
                                        <p className={`font-medium`}>
                                            {
                                                discount.uses
                                            }
                                        </p>
                                    </td>
                                    <td className='border border-zinc-500 p-1 text-center'>
                                        <p>
                                            {
                                                discount.user.name
                                            }
                                        </p>
                                    </td>
                                    <td className='border border-zinc-500 p-2 text-center'>
                                        {
                                            new Date(discount.createdAt).toLocaleDateString()
                                        }
                                    </td>
                                    <td className='border border-zinc-500 p-2 text-center'>
                                        <button onClick={() => deleteDiscount(discount._id)} className='border bg-slate-200 border-red-600 p-2 rounded-md font-semibold text-red-600 hover:bg-red-600 hover:text-slate-200'>Delete</button>
                                    </td>

                                </tr>)
                            }
                        </tbody>
                    </table>
                        : <h1 className='text-center mt-16 text-2xl font-semibold text-zinc-800 p-2 sm:p-5 border-t border-t-zinc-600'>There is no Discount!</h1>
                }
            </div>
        </section>
    );
}

export default DiscountsTable;
