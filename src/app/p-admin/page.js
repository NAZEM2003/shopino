import React from 'react';
import SaleChart from '@/components/templates/p-admin/index/SaleChart';
import GrowthRate from '@/components/templates/p-admin/index/GrowthRate';
import InfoContainer from '@/components/templates/p-admin/index/InfoContainer';
const AdminPanel = () => {
    return (
        <main className='px-3'>
            <InfoContainer/>
            <section className='flex flex-col items-center '>
                <SaleChart/>
                <GrowthRate/>
            </section>
        </main>
    );
}

export default AdminPanel;
