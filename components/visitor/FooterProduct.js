"use client";

import React, { useEffect, useState } from 'react';
import ProductSlider from './ProductSlider';

export default function FooterProduct() {
    const [latestProduct, setLatestProduct] = useState([]);
    const [topProduct, setTopProduct] = useState([]);
    const [discountProduct, setDiscountProduct] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            const data = await fetch(`${process.env.SHOP_URL}/api/product/all`);
            const json = await data.json();

            setLatestProduct(json?.latestProduct);
            setTopProduct(json?.topProduct);
            setDiscountProduct(json?.discountProduct);
        }
        fetchData();
    }, []);

    return (
        <div>
            <div>
                <h2 className="text-3xl mb-4 text-center">Latest Product</h2>
                <ProductSlider list={true} data={latestProduct} />
            </div>

            <div className='mt-6'>
                <h2 className="text-3xl mb-4 text-center">Top Product</h2>
                <ProductSlider list={true} data={topProduct} />
            </div>

            <div className='mt-6'>
                <h2 className="text-3xl mb-4 text-center">Discount Product</h2>
                <ProductSlider list={true} perShow={4} data={discountProduct} />
            </div>
        </div>
        
    );
}
