import Image from 'next/image';
import React from 'react';

const TicketDetails = ({ user, isAnswer , createdAt, body }) => {
    return (
        <div className={`p-3 border border-zinc-400 rounded-lg shadow-lg shadow-zinc-400 max-w-xl my-14 ${isAnswer ?" bg-zinc-600 ml-auto text-slate-200":"text-zinc-800"}`}>
            <div className='flex justify-between'>
                <div className='flex items-center'>
                    <div className='w-16 h-16 relative rounded-full overflow-hidden'>
                        <Image src={decodeURIComponent(user.img)} alt='profile' sizes='' fill />
                    </div>
                    <div className='ml-5'>
                        <h1 className={`text-xl font-semibold ${isAnswer ? "text-slate-200":"text-zinc-800"} mb-2`}>{user.name}</h1>
                        <p className={`text-sm ${isAnswer ? "text-zinc-400":"text-zinc-800"}`}>{user.role}</p>
                    </div>
                </div>
                <p className={`text-lg ${isAnswer ? "text-zinc-400":"text-zinc-800"} mt-1`}>{new Date(createdAt).toLocaleDateString()}</p>
            </div>

            <p className='mt-4 text-lg p-2 text-justify'>{body}</p>
        </div>
    );
}

export default TicketDetails;
