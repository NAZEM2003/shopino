"use client"
import React, { useState } from 'react';
import ShopCategoriesContainer from './ShopCategoriesContainer';
import ProductSearch from './ProductSearch';

const ShopProductsContainer = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);


    return (
        <main className='mt-20 min-h-screen'>
            <ProductSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchResult={JSON.parse(JSON.stringify(searchResult))} setSearchResult={setSearchResult}/>
            {
                searchResult.length ? ""
                :<ShopCategoriesContainer />
            }
        </main>
    );
}

export default ShopProductsContainer;
