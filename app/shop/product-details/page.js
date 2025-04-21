import moment from "moment";
import Link from "next/link";
import jwt from "jsonwebtoken";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import { cookies } from "next/headers";
import dbConnect from "@/utils/dbConnect";
import { ToastContainer } from "react-toastify";
import { BiChevronRight } from "react-icons/bi";
import Footer from "@/components/visitor/Footer";
import Header from "@/components/visitor/Header";
import Rating from "@/components/visitor/Rating";
import Review from "@/components/visitor/Review";
import { getReviews } from "@/actions/reviewActions";
import Pagination from "@/components/others/Pagination";
import ProductSlider from "@/components/visitor/ProductSlider";
import ProductDetails from "@/components/visitor/ProductDetails";
import ProductDetailsImages from "@/components/visitor/ProductDetailsImages";

const getUserInfo = async() => {
    const cookie = await cookies();
    const info = cookie.get("userInfo");
    if(info?.value) {
        const userInfo = jwt.verify(info.value, process.env.TOKEN_SECRET_KEY);
        return userInfo
    } else {
        return {error: "You are not access This page !"}
    }
}
const getData = async({ id }) => {
    try {
        dbConnect();
        const product = await Product.findById(id);
        const cart = await Cart.findOne({productId: id});
        const allProducts = await Product.find({ sellerId: product?.sellerId });
        return { product, cart, allProducts };
    } catch(err) {
        return [];
    }
}

export default async function Details({ searchParams }) {
    const user = await getUserInfo();
    const searchParam = await searchParams;
    const { product, cart, allProducts } = await getData({ id: searchParam?.id});
    const { totalCount, rating, reviews, countReviews, perPage } = await getReviews({ productId: product?._id, page: 1});

    console.log(cart);
    console.log(user);
    
    
    return (
        <main className="w-full bg-white">
            <Header />
            <ToastContainer position="top-right" limit={1} />
            
            <section className="w-full flex justify-center items-center relative">
                <img
                    className="w-full h-[40vh] object-cover"
                    src="/images/shop-details.jpg" 
                    alt="banner" 
                />
                <div className="absolute">
                    <h2 className="text-6xl font-semibold">Dream Shop</h2>
                </div>
            </section>
            
            <section className="max-md:hidden flex items-center text-xl text-blue-900 font-semibold bg-gray-300 py-3 px-4">
                <Link href="/">Home</Link>
                <span className="mt-1 text-3xl"><BiChevronRight /></span>
                <Link href={`/product/category/${product?.category}`}>{product?.category}</Link>
                <span className="mt-1 text-3xl"><BiChevronRight /></span>
                <Link href={`/product/details/${product?._id}`}>{product?.name?.slice(0, 50)}</Link>
            </section>
             
            <section className="lg:grid grid-cols-2 gap-6 bg-white p-4 text-black">
                <div>
                    <ProductDetailsImages image={product?.images} />
                </div>
                <div className="text-2xl">
                    <h2 className="text-2xl">{product?.name}</h2>
                    <div className="flex gap-2 items-center">
                        <Rating ratingNum={product?.rating} />
                        {product?.rating && <span className="text-green-900 text-xl">( {product.rating} reviews )</span>}
                    </div>
                    {product?.discount ? (
                        <div className="flex gap-4">
                            <del className="text-gray-700">${product.price}</del>
                            <span className="font-semibold">${product.price - Math.floor((product.price * product.discount) / 100)}</span>
                            <span>-{product?.discount}%</span>
                        </div>
                        ) : (
                        <p>${product?.price}</p>
                    )}
                    
                    <p className="text-xl mt-4">{product?.description}</p>

                    <ProductDetails
                        userId={user?.id}
                        cartQty={cart?.quantity}
                        cartId={cart?._id?.toString()}
                        userRole={user?.role}
                        productId={product?._id?.toString()}
                        sellerId={product?.sellerId?.toString()}
                        stock={product?.stock}
                    />
                </div>
            </section>

            <section className="lg:flex gap-2 justify-between mt-3 py-5 sm:px-6 w-full">
                <div className="w-[65vw]">
                    <div className="text-black">
                        <h3 className="text-3xl border-t-2 pt-2">Reviews</h3>
                        <div className="lg:grid grid-cols-5 gap-4 items-center mt-5 text-2xl px-8 text-black bg-gray-100 p-2">
                            <div className="col-span-2">
                                <span className="font-semibold text-4xl">{rating ? rating : 0}/</span><span>5</span>
                                <div className="text-4xl">
                                    <Rating ratingNum={rating} />
                                </div>
                                <p>{totalCount} reviews</p>
                            </div>
                                    
                            <div className="col-span-3">
                            {countReviews?.length > 0 ? countReviews?.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 w-full">
                                    <Rating ratingNum={parseInt(item._id)} />
                                
                                    <div className="h-[14px] w-full bg-gray-300">
                                        <div 
                                            style={{width: `${Math.round((item?.count * 100)/totalCount)}%`}}
                                            className="h-[14px] bg-yellow-500" 
                                        />
                                    </div>
                                    <p className="text-gray-800 text-xl w-10">{item?.count}</p>
                                </div> )) : [5, 4, 3, 2, 1].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 w-full">
                                        <Rating ratingNum={item} />
                                        <div className="h-[14px] w-full bg-gray-300">
                                            <div className={`w-[1px] h-[14px] bg-yellow-500`} />
                                        </div>
                                        <p className="text-gray-800 text-xl w-10">{item}</p>
                                    </div> )
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl mt-4 text-black">Product Reviews</h2>
                        {reviews?.map((item, i) => (
                            <div key={i} className="p-3 flex justify-between gap-5 items-center border-2 mt-1 rounded-xl">
                                <div>
                                    <p className="text-xl font-semibold text-black">{item?.name}</p>
                                    <p className="text-lg text-black">{item?.message}</p>
                                    <div className="text-2xl">
                                        <Rating ratingNum={item?.rating} />
                                    </div>
                                </div>
                                <div>
                                    <span className="text-black">{moment(item?.createdAt).format("LL")}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalCount > perPage && 
                        <Pagination 
                            total={totalCount}
                            perPage={perPage}
                            path={`/product/details/${product?._id}`}
                        />
                    }
                    <Review 
                        user={user} 
                        productId={product?._id?.toString()} 
                    />
                </div>

                {allProducts?.length > 0 && <div className="w-[25vw]">
                    <div className='text-2xl py-2 px-6 bg-green-600 text-white duration-500'>From {product?.shopName}</div>
                    <div className="mt-4">
                        <ProductSlider
                            data={JSON.stringify(allProducts)}
                            perShow={1}
                        />
                    </div>
                </div>}
            </section>
            <Footer />
        </main>
    )
}
