import CartTable from '@/templates/cart/CartTable';
import Footer from '@/modules/footer/Footer';
import Navbar from '@/modules/navbar/Navbar';
import React from 'react';

const Cart = () => {
    return (
        <>
            <Navbar />
            <main className='p-3'>
                <CartTable />
            </main>
            <Footer />
        </>
    );
}

export default Cart;
