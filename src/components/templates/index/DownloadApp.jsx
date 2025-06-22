import Link from 'next/link';
import React from 'react';
import { FcDownload } from 'react-icons/fc';
import { SiAppstore, SiGoogleplay } from "react-icons/si";
const DownloadApp = () => {
    return (
        <div className='w-full py-4 px-1 sm:p-4 my-10 flex flex-col lg:flex-row items-center justify-between bg-slate-600 text-slate-200'>

            <h2 className='text-xl flex items-center'>Download the Shopino App <FcDownload className='ml-2 text-3xl' /> <span>(coming soon...)</span> </h2>

            <div className='flex items-center flex-col md:flex-row mt-16 lg:mt-0'>

                <Link className='flex w-full sm:w-72 items-center sm:mx-10 mb-10 md:mb-0 bg-slate-200 text-zinc-800 p-3 rounded-md sm:text-lg' href="/">
                    Download From Googlepaly <SiGoogleplay className='ml-2' />
                </Link>

                <Link className='flex w-full sm:w-72 items-center bg-slate-200 text-zinc-800 p-3 rounded-md sm:text-lg' href="/">
                    Download From App Store  <SiAppstore className='ml-2' />
                </Link>
            </div>
        </div>
    );
}

export default DownloadApp;
