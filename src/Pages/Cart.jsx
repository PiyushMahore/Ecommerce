import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeCard } from '../Redux-Toolkit/StoreSlice';
import { NavLink } from 'react-router-dom';

export const Cart = () => {
  const cartItems = useSelector((state) => state.Estore.Card)
  const [cart, setCart] = useState(cartItems)
  const dispatch = useDispatch()

  useEffect(() => {
    const updatedCart = cartItems.reduce((acc, currentItem) => {
      const existingItem = acc.find((item) => item.id === currentItem.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        acc.push({ ...currentItem})
      }
      return acc
    }, [])

    setCart(updatedCart)
  }, [cartItems])

  const removeCartItem = (id) => {
    dispatch(removeCard(id))
  }

  return (
    <div className='mt-32 max-w-screen-2xl container mx-auto px-4 flex justify-center items-center flex-col lg:justify-start lg:flex-row'>
      {cart.map((cartItem, index) => (
        <NavLink to={`/shop/${cartItem.id}`} className='m-1' key={index}>
          <img className='rounded-xl' height={400} width={400} src={cartItem.image} alt='' />
          <div className='grid grid-cols-2 justify-items-center'>
            <h3>Price ${cartItem.price}</h3>
            <p>Quantity {cartItem.quantity}</p>
            <button className=' py-3 bg-green-500 text-white font-bold border border-red-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-red-500 md:px-6 border-none'>
              Order Now
            </button>
            <button className=' text-sm py-3 bg-red-500 text-white font-bold border border-red-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-red-500 md:px-6 border-none' onClick={() => removeCartItem(cartItem.id)}>Remove</button>
          </div>
        </NavLink>
      ))}
    </div>
  );
};
