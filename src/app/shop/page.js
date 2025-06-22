import ShopProductsContainer from '@/components/templates/shop/ShopProductsContainer';
import Footer from '@/modules/footer/Footer';
import Navbar from '@/modules/navbar/Navbar';
import React from 'react';

const Shop = async () => {
 
    
    return (
        <div>
            <Navbar />
            <ShopProductsContainer/>
            <Footer />
        </div>
    );
}

export default Shop;
