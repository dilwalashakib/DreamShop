"use client";

import Link from 'next/link';
import React from 'react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';

export default function Slider({ image }) {
  return (
    <Swiper
        spaceBetween={6}
        centeredSlides={true}
        autoplay={{
            delay: 4000,
            disableOnInteraction: false,
        }}
        pagination={{
            clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
    >
        {JSON?.parse(image).map((item, i) => (
            <SwiperSlide key={i}>                
                <Link href={`/shop/product-details?id=${item?.productId}`}>
                    <img className={`h-[70vh] w-full rounded-lg object-cover cursor-pointer`} src={item?.url} alt='image' />
                </Link>
            </SwiperSlide>
        ))}
        
    </Swiper>
  );
}
