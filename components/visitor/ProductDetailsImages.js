"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function ProductDetailsImages({ image }) {
    const [imgUrl, setImgUrl] = useState(image?.[0].url);

    return (
        <div>
            <div className="w-full">
                <img
                    className="w-full object-cover"
                    src={imgUrl}
                    alt="banner" 
                />
            </div>

            <div className="w-full mt-6">
                <Swiper
                    slidesPerView={5}
                    spaceBetween={6}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {image?.map((item, i) => (
                        <SwiperSlide key={i}>
                            <img 
                                onClick={(e) => setImgUrl(item.url)}
                                className={`h-[100px] w-full rounded-lg object-cover cursor-pointer`} 
                                src={item.url} 
                                alt='image'
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}