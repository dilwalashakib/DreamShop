"use client";

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

export default function CategorySlider({ categorys}) {
    
    return (
        <Swiper
            slidesPerView={5}
            spaceBetween={20}
            pagination={{
                clickable: true,
            }}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            
            modules={[Autoplay, Pagination]}
            className="mySwiper"
        >
            {JSON.parse(categorys)?.map((item) => (
                <SwiperSlide key={item?._id}>
                    <div className='relative'>
                        <Link href={`/category/${item?.slug}`}>
                            <img 
                                className='w-full h-[30vh] border-2 border-gray-400 rounded-lg' 
                                src={item?.image} 
                                alt='image' 
                            />
                            <p className='absolute top-0 right-0 bg-green-600 text-xl font-semibold px-4 py-2 rounded-md'>{item?.name}</p>
                        </Link>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
