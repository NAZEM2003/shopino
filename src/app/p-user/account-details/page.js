import ChangePasswordForm from '@/templates/p-user/account-details/ChangePasswordForm';
import UserDataForm from '@/templates/p-user/account-details/UserDataForm';
import { authUser } from '@/utils/actions';
import { loginRegisterMethods } from '@/utils/constants';
import { redirect } from 'next/navigation';
import React from 'react';

const AccountDetails =async () => {
    const user = await authUser();
    if (!user) {
        redirect(`/login-register?method=${loginRegisterMethods.signin}`);
    }
    return (
        <main className='px-3'>
            <h1 className='text-3xl sm:text-4xl text-zinc-800 font-semibold p-2 mt-5 border-b border-b-zinc-400'>Account Details</h1>
            <div className='flex flex-col md:flex-row flex-wrap justify-between xl:justify-around'>
                <UserDataForm user={user}/>
                <ChangePasswordForm />
            </div>
        </main>
    );
}

export default AccountDetails;
