import React from 'react';
import { FcPositiveDynamic } from "react-icons/fc";

const InfoBox = ({title , value}) => {
    return (
        <div className='px-3 py-6 mx-auto flex items-center justify-between border border-custom-dark-blue rounded-lg w-64'>
            <h2 className='flex items-center text-lg font-semibold text-zinc-800 border-b border-b-custom-light-blue'>{title} <FcPositiveDynamic className='ml-3 text-xl'/></h2>
            <p className='text-lg font-semibold text-zinc-800'>{value}</p>
        </div>
    );
}

export default InfoBox;
