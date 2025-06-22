"use client"
import React, { useEffect, useState } from 'react';
import { FaChevronUp } from "react-icons/fa";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const toggleVisibility = () => {
            window.scrollY > 220 ? setIsVisible(true) : setIsVisible(false);
        }
        window.addEventListener("scroll", () => {
            toggleVisibility();
        })

    }, [])
    const scrolllToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <button type='button' title='scroll to top' onClick={scrolllToTop} className={`${isVisible ? "flex":"hidden"} justify-center items-center z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full fixed  bottom-5 right-5 sm:right-10 text-2xl bg-slate-200 text-zinc-800 shadow-md shadow-zinc-700 transition-all`}>
            <FaChevronUp />
        </button>
    );
}

export default ScrollToTop;