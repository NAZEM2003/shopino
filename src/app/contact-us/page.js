import ContactUsForm from '@/components/templates/contact-us/ContactUsForm';
import Footer from '@/modules/footer/Footer';
import Navbar from '@/modules/navbar/Navbar';
import Link from 'next/link';
import React from 'react';
import { FaInstagram, FaTelegram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { FcCallback, FcFeedback } from 'react-icons/fc';
import { FaInternetExplorer } from "react-icons/fa";

export const metadata = {
    title: "Shopino | Contact Us",
};

const ContactUs = () => {
    return (
        <div>
            <Navbar />
            <main className='mt-28 mb-10 flex flex-col items-center md:flex-row md:items-start justify-between'>
                <div className='w-full'>
                    <ContactUsForm />
                </div>
                <div className='w-full'>
                    <h2 className='text-lg font-semibold text-zinc-800 mt-10 md:mt-2 mb-6 w-max mx-auto'>Contact Information</h2>
                    <address className='mt-8 w-64 mx-auto'>
                        <p className='text-lg flex items-center my-5'>+989936920384 <FcCallback className='ml-2' /></p>
                        <p className='text-lg flex items-center my-5'>shopino.store@gmail.com <FcFeedback className='ml-2' /></p>
                        <p className='text-lg flex items-center my-5'>shopino.info@gmail.com <FcFeedback className='ml-2' /></p>
                        <p className='text-lg flex items-center my-5'>shopino.ir<FaInternetExplorer className='ml-2 text-cyan-500' /></p>
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
            </main>
            <Footer />
        </div>
    );
}

export default ContactUs;
