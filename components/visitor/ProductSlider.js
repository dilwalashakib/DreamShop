"use client";

import Link from 'next/link';
import Rating from './Rating';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

export default function ProductSlider({ data, perShow }) {
 
    return (
        <Swiper
            slidesPerView={perShow || 1}
            navigation={true}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            
            modules={[Autoplay, Navigation]}
            className="mySwiper"
        >
            {JSON.parse(data)?.map((item, i) => (
                <SwiperSlide key={i} className='mr-4'>
                    <div className="p-1 shadow-xl shadow-gray-200 rounded-lg cursor-pointer">
                        <div className="relative ">
                            {item?.discount && <div className="absolute top-0 left-0 px-4 py-2 bg-green-600 rounded-lg text-xl text-center font-semibold text-white">-{item.discount}%</div>}
                            
                            <img className="w-full h-[40vh] object-container rounded-lg" src={item?.images[0].url} alt="Product" />
                        </div>
        
                        <div className="pt-2 px-2">
                            <Link href={`/shop/product-details?id=${item?._id}`}>
                                <span className="mb-2 text-xl text-blue-900 hover:text-green-700 duration-500">{item?.name?.slice(0, 50)}</span>
                            </Link>
                            
                            <div className="flex gap-3 items-center text-xl">
                                <p className="font-semibold text-gray-800">${item?.price}</p>
                                <Rating ratingNum={item?.rating} showNum={item?.rating ? true : false} />
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
