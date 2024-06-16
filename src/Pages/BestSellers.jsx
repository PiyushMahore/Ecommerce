import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { NavLink } from 'react-router-dom';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export const BestSellers = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch("products.json").then(res => res.json()).then(data => setProducts(data))
    }, [])

    const bestSellers = products.filter((item) => item.status === "Best Selers")

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-28 px-4'>
        <div className='text-center'>
            <h2 className='text-3xl font-semibold capitalize mb-5'>Best Sellers</h2>
            <p className='text-Black/75 capitalize md:w-2/3 mx-auto mb-auto'>Discover our best sellers, the top picks our customers love! From trending items to timeless classics, these popular products are customer-approved favorites. Shop now to see why these must-haves are flying off the shelves!</p>
        </div>
        
        <div className='mb-16'>
        <Swiper
        slidesPerView={4}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {
            bestSellers.map((product) => (
                <SwiperSlide key={product.id}>
                    <NavLink to={`/shop/${product.id}`}>
                      <img src={product.image} alt="" className='mx-auto w-full
                       hover:scale-105 transition-all duration-300' />
                    </NavLink>
                    <div className='mt-4 px-4'>
                      <h4 className='text-base font-semibold mb-2'>{product.title}</h4>
                      <div className='flex justify-between'>
                        <p className='text-black/50'>{product.category}</p>
                        <p className='font-semibold'>{product.price}</p>
                      </div>
                    </div>
                </SwiperSlide>
            ))
        }
      </Swiper>
        </div>
    </div>
  )
}
