import React from 'react';
import Tickets from '@/templates/p-user/index/Tickets';
import Orders from '@/components/templates/p-user/index/Orders';
import Infos from '@/components/templates/p-user/index/Infos';
import { authUser } from '@/utils/actions';
import { loginRegisterMethods } from '@/utils/constants';
import { redirect } from 'next/navigation';

const UserPanel = async () => {
    const user = await authUser();
    if (!user) {
        redirect(`/login-register?method=${loginRegisterMethods.signin}`);
    }
    return (
        <main className='px-3'>
            <Infos userID={user?._id}/>
            <Tickets />
            <Orders userID={user?._id}/>
        </main>
    );
}

export default UserPanel;
