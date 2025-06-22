import Details from '@/templates/product/Details';
import MoreProducts from '@/templates/product/MoreProducts';
import Navbar from '@/modules/navbar/Navbar';
import Footer from '@/modules/footer/Footer';
import React from 'react';
import Comments from '@/templates/product/Comments';
import { getProduct } from '@/utils/actions';

const Product = async ({ params }) => {
    const productID = params.id;
    const product = await getProduct(productID);

    return (
        <div>
            <Navbar />
            <Details product={JSON.parse(JSON.stringify(product))} />
            <MoreProducts product={JSON.parse(JSON.stringify(product))} />
            <Comments product={JSON.parse(JSON.stringify(product))} />
            <Footer />
        </div>
    );
}

export default Product;
