import SubmitBtn from '@/components/modules/buttons/SubmitBtn';
import { loginRegisterMethods } from '@/utils/constants';

import { discountSchema } from '@/utils/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddDiscountForm = ({ fetchDiscounts }) => {
    const [code, setCode] = useState("");
    const [percent, setPercent] = useState();
    const [maxUse, setMaxUse] = useState();
    const router = useRouter();

    const addNewDiscount = async () => {
        const data = { code, percent: Number(percent), maxUse: Number(maxUse) };
        const isDataValid = discountSchema.safeParse(data);
        if (!isDataValid.success) {
            Swal.fire({
                title: "Operation Failed",
                text: isDataValid.error.issues[0].message,
                icon: "error"
            });
            return
        }
        const res = await fetch("/api/discount", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            Swal.fire({
                title: "Done",
                text: "discount code added successfully",
                icon: "success"
            });
            setCode("");
            setMaxUse("");
            setPercent("");
            fetchDiscounts();
            return
        } else if (res.status === 403) {
            Swal.fire({
                title: "Operation Failed",
                text: "Your Token has expired , Please log in again",
                icon: "error"
            });
            router.replace(`/login-register?method=${loginRegisterMethods.signin}`);
            return
        } else if (res.status === 500) {
            Swal.fire({
                title: "Operation Failed",
                text: "somthing went wrong , Please try again later",
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


    return (
        <form action={addNewDiscount} className='flex flex-col p-2 mt-10 mx-auto max-w-lg border border-zinc-400 rounded-lg shadow-lg shadow-zinc-600'>
            <h2 className='text-center text-xl font-semibold text-zinc-800 my-5'>Add New Discount Code</h2>
            <label className='text-lg p-1 text-zinc-800 font-semibold mt-5' htmlFor="code">Discount Code</label>
            <input
                className='p-1 rounded-md border border-zinc-400 text-lg outline-none shadow-lg shadow-zinc-400'
                id='code'
                type="text"
                placeholder='Discount Code'
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />

            <label className='text-lg p-1 text-zinc-800 font-semibold mt-5' htmlFor="percent">Discount Percentage</label>
            <input
                className='p-1 rounded-md border border-zinc-400 text-lg outline-none shadow-lg shadow-zinc-400'
                id='percent'
                min={1}
                max={100}
                type="number"
                placeholder='Discount Percentage'
                value={percent}
                onChange={(e) => setPercent(e.target.value)}
            />

            <label className='text-lg p-1 text-zinc-800 font-semibold mt-5' htmlFor="maxUse">Maximum Use</label>
            <input
                min={1}
                className='p-1 rounded-md border border-zinc-400 text-lg outline-none shadow-lg shadow-zinc-400'
                id='maxUse'
                type="number"
                placeholder='Maximum Use'
                value={maxUse}
                onChange={(e) => setMaxUse(e.target.value)}
            />

            <SubmitBtn text="Add" />
        </form>
    );
}

export default AddDiscountForm;
