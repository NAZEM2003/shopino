"use client"
import React from 'react';
import { useFormStatus } from 'react-dom';
import { ImSpinner8 } from "react-icons/im";

const SubmitBtn = ({ text }) => {
    const { pending } = useFormStatus();
    return (
        <button className='my-8 bg-custom-dark-blue text-slate-200 p-2 rounded w-full outline-none flex justify-center items-center' type='submit'>
            {
                pending ? <ImSpinner8 className='animate-spin text-2xl' /> : text
            }
        </button>
    );
}

export default SubmitBtn;
