import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';

export const Cards = () => {
  const Products = useSelector((state) => state.Estore.Products)

  return (
    <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center justify-center gap-12 shadow-sm'>
      {
        Products && Products.slice(0, 8).map((item, index) => (
          <div key={index}>
            <NavLink to={`/shop/${item.id}`}>
              <img src={item.image} alt="" className='mx-auto w-full
               hover:scale-105 transition-all duration-300' />
            </NavLink>
            <div className='mt-4 px-4'>
              <h4 className='text-base font-semibold mb-2'>{item.title}</h4>
              <div className='flex justify-between'>
                <p className='text-black/50'>{item.category}</p>
                <p className='font-semibold'>$ {item.price}</p>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}
