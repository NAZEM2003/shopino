import Sidebar from '@/modules/p-user/Sidebar';
import Topbar from '@/modules/p-user/Topbar';
import React from 'react';
import styles from "@/styles/p-user/user-panel-layout/style.module.css";
import { authUser } from '@/utils/actions';
import { redirect } from 'next/navigation';
import { loginRegisterMethods } from '@/utils/constants';



export const metadata = {
    title: "Shopino | User Panel",
    description: "Shopino is a Grocery Store  where you can get the Groceries you need",
    icons: {
        icon: "/images/logo.svg"
    }
};

const UserPanelLayout = async ({ children }) => {
    const user = await authUser();
    if(!user){
        redirect(`/login-register?method=${loginRegisterMethods.signin}`);
    }

    return (
        <div className='overflow-hidden min-h-screen '>
            <Topbar user={user}/>
            <div className='flex lg:justify-end'>
                <div className='hidden lg:inline-block w-80 fixed top-20 left-0'>
                    <Sidebar user={user}/>
                </div>
                <div className={`${styles.main_content_container}`}>
                    {children}
                </div>
            </div>

        </div>
    );
}

export default UserPanelLayout;
