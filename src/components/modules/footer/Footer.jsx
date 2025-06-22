import Newsletter from '@/templates/footer/Newsletter';
import Link from 'next/link';
import React from 'react';
import { FcAbout, FcHome, FcLink, FcShop, FcVoicePresentation, FcCallback, FcFeedback } from "react-icons/fc";
import { FaTelegram, FaWhatsapp, FaTwitter, FaInstagram } from "react-icons/fa";
const Footer = () => {
    return (
        <footer className='w-full bg-slate-700 text-slate-200 p-1 sm:p-4 '>
            <div className='flex flex-col md:flex-row justify-around items-center'>
                <Newsletter />
                <div className='w-3/12 p-2 max-w-96 min-w-56 mt-16 md:mt-0'>
                    <h2 className='flex items-center text-2xl'>Useful Links <FcLink className='ml-2' /> </h2>
                    <nav>
                        <ul className='flex flex-col mt-1 justify-center [&>*]:p-3 [&>*]:[&>*]:transition-all  [&>*]:text-slate-200'>
                            <li>
                                <Link className='hover:text-custom-light-blue flex items-center' href="/">Home <FcHome className="ml-1" /></Link>
                            </li>
                            <li>
                                <Link className='hover:text-custom-light-blue flex items-center' href="/shop">Shop <FcShop className="ml-1" /></Link>
                            </li>
                            <li>
                                <Link className='hover:text-custom-light-blue flex items-center' href="/contact-us">Contact Us <FcVoicePresentation className="ml-1" /></Link>
                            </li>
                            <li>
                                <Link className='hover:text-custom-light-blue flex items-center' href="/about-us">About Us <FcAbout className="ml-1" /></Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='w-3/12 p-2 max-w-96 min-w-56 mt-16 md:mt-0'>
                    <h2 className='flex items-center text-2xl'>Contact Us <FcVoicePresentation className='ml-2' /> </h2>
                    <address className='mt-8'>
                        <p className='text-lg flex items-center my-3'>+989936920384 <FcCallback className='ml-2' /></p>
                        <p className='text-lg flex items-center my-3'>shopino.store@gmail.com <FcFeedback className='ml-2' /></p>
                        <p className='text-lg flex items-center my-3'>shopino.info@gmail.com <FcFeedback className='ml-2' /></p>
                        <ul className='flex items-center justify-around mt-12 [&>*]:text-3xl'>
                            <li>
                                <Link className='transition-all hover:text-sky-500' href="https://web.telegram.org"><FaTelegram /></Link>
                            </li>
                            <li>
                                <Link className='transition-all hover:text-green-600' href="https://web.whatsapp.com"><FaWhatsapp /></Link>
                            </li>
                            <li>
                                <Link className='transition-all hover:text-sky-500' href="https://twitter.com"><FaTwitter /></Link>
                            </li>
                            <li>
                                <Link className='transition-all hover:text-violet-700' href="https://www.instagram.com"><FaInstagram /></Link>
                            </li>
                        </ul>
                    </address>
                </div>
            </div>
            <p className='text-center mt-12 tracking-wider border-t border-slate-500 p-3'>All rights of this website are reserved for Shopino &copy;</p>
        </footer>
    );
}

export default Footer;
