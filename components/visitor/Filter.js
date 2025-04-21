"use client"

import { useEffect, useState } from "react";
import Rating from "@/components/visitor/Rating";
import { useSearchParams } from "next/navigation";
import Product from "@/components/visitor/Product";
import Pagination from "@/components/others/Pagination";
import { getFilterProducts } from "@/actions/productActions";

export default function Filter({ categorys, categoryName, searchValue, userId }) {
    const [low, setLow] = useState("");
    const [high, setHigh] = useState("");
    const [sort, setSort] = useState(1);
    const [rating, setRating] = useState('');
    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(1);
    const [checked, setChecked] = useState(categoryName);
    const [products, setProducts] = useState([]);
    const [countProduct, setCountProduct] = useState(0);

    const pageNum = useSearchParams().get("page");
    const page = pageNum ? parseInt(pageNum) : 1;

    const ratings = [5, 4, 3, 2, 1];

    const ratingHandler = (id) => {
        if(id === rating) {
            setRating("");
        } else {
            setRating(id)
        }
    }

    useEffect(() => {
        let timer = null;
        const fetchData = async() => {
            const response = await getFilterProducts({
                search: search || searchValue,
                category: checked || categoryName,
                rating,
                low,
                high,
                sort,
                page
            });

            if(response?.success) {
                const parseProducts = JSON.parse(response?.products);

                setCountProduct(response.countProduct);
                setPerPage(response.perPage)
                setProducts(parseProducts);
            }
        }
        // debounce system implement
        timer = setTimeout(() => {
            fetchData();
        }, 500);

        return () => {
            clearTimeout(timer);
        }
    }, [search, checked, rating, low, high, sort, page]);

    const sortBy = [
        {
            name: "High to Low",
            value: -1
        },
        {
            name: "Low to High",
            value: 1
        }    
    ]

    const checkboxHandler = (e) => {
        if(e.target.checked) {
            setChecked(e.target.value);
        } else {
            setChecked("");
        }
      }

    return (
        <div className="lg:flex gap-8 px-6 py-4 bg-white text-black">
            <div className="lg:w-3/12">
                {!searchValue && <div className="w-full mb-2">
                    <h3 className="text-3xl mb-2">Search</h3>
                    
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full py-2 px-3 border-2 border-gray-400 text-xl rounded-lg" 
                        type="text" 
                        placeholder="search" 
                    />
                </div>}

                {!categoryName && <div>
                    <h2 className="text-3xl mb-1">Category</h2>
                    <ul>
                        {categorys && JSON.parse(categorys)?.map((item) => (
                            <li key={item?._id} className="text-xl">
                                <input
                                    onChange={checkboxHandler}
                                    checked={item?.slug === checked ? true : false}
                                    value={item?.slug}
                                    className="h-4 w-4 mr-2 cursor-pointer" 
                                    type="checkbox"
                                    id={item?.name}
                                />
                                <label 
                                    className="cursor-pointer" 
                                    htmlFor={item?.name}>
                                    {item?.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>}

                <div className="py-3 w-full text-lg">
                    <h2 className="text-3xl">Price</h2>
                    <div className="flex items-end gap-2 py-2 w-full">
                        <div>
                            <label htmlFor="min" className="text-lg">Min</label>
                            <input
                                className="p-2 mt-1 w-full rounded-lg border-2 border-gray-400"
                                value={low}
                                onChange={(e) => setLow(e.target.value)}
                                type="number"
                                placeholder="Min"
                            />
                        </div>
                    
                        <div>
                            <label htmlFor="max" className="text-lg">Max</label>
                            <input
                                className="p-2 mt-1 w-full rounded-lg border-2 border-gray-400"
                                value={high}
                                onChange={(e) => setHigh(e.target.value)}
                                type="number"
                                placeholder="Max"
                            />
                        </div>
                    </div>
                </div>

                <div className="text-3xl my-2">
                    <h2>Rating</h2>
                    <div className="mt-2">
                    {ratings?.map((item) => (
                        <button
                            key={item}
                            onClick={(e) => ratingHandler(item)}
                            className={`${rating === item && "border-2 border-yellow-400"} block w-[50%] hover:bg-green-100 rounded-lg cursor-pointer px-3`}>
                                <Rating ratingNum={item} />
                        </button>
                    ))}
                    </div>
                </div>
            </div>

            <div className="lg:w-9/12">
                <div className="flex justify-between items-center rounded-md border-gray-300 border-2 pl-4 mb-5">
                    <div className="text-xl font-semibold text-black">
                        <h3>{countProduct} Products</h3>
                    </div>
                    
                    <div className="flex gap-4 items-center">
                        <select 
                            value={sort} 
                            onChange={(e) => setSort(e.target.value)} 
                            className="p-3 outline-hidden text-lg bg-gray-300 rounded-xs">
                            {sortBy?.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products?.map((item, i) => (
                        <Product
                            key={i}
                            userId={userId}
                            productId={item?._id}
                            discount={item?.discount}
                            title={item?.name}
                            price={item?.price}
                            rating={item?.rating}
                            imgUrl={item?.images[0].url}
                        />
                    ))}
                </div>

                {countProduct > perPage && (
                    <Pagination 
                        total={countProduct}
                        perPage={perPage}
                        path="/shop"
                    />
                )}
            </div>
        </div>
    )
}