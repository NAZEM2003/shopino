import Link from 'next/link';
import React from 'react';

const TicketBox = ({ id, title, createdAt, hasAnswer, department }) => {
    return (
        <div className='p-2 my-14 max-w-3xl border border-zinc-400 rounded-lg shadow-lg shadow-zinc-400'>
            <Link className='sm:flex items-center justify-between' href={`/p-user/tickets/answer/${id}`}>
                <div>
                    <h2 className='text-xl font-semibold text-zinc-800 sm:mb-5'>{title}</h2>
                    <p className='font-semibold text-zinc-700 my-3 sm:my-0'>{department}</p>
                </div>

                <div className='flex flex-col-reverse sm:flex-col'>
                    <p className='font-semibold text-zinc-700 sm:mb-5'>{new Date(createdAt).toLocaleDateString()}</p>
                    <p className={`font-semibold my-3 sm:my-0 ${hasAnswer ? "text-green-600" : "text-red-600"}`}>
                        {
                            hasAnswer ? "Answered" : "Not Answered"
                        }
                    </p>
                </div>
            </Link>


        </div>
    );
}

export default TicketBox;
