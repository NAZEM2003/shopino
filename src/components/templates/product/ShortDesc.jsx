"use client"
import React, { useState } from 'react';
const ShortDesc = ({ desc }) => {
    const [showFullText, setShowFullText] = useState(false);
    const truncatedText = desc.split(" ").slice(0, 17).join(" ");

    return (
        <p className='text-zinc-700 text-lg my-3 border-b-zinc-400 border-b text-justify pb-3'>
            {showFullText ? desc : `${truncatedText}... `}
            <button className='text-zinc-950 font-semibold transition-all hover:text-custom-light-blue px-2'  onClick={() => setShowFullText(!showFullText)}>
                {
                    showFullText ? " Show less" : " Show more"
                }
            </button>
        </p>
    );
}

export default ShortDesc;
