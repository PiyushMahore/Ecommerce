import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FaSearch, FaUser, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa"
import logo from '/imgs.png'
import { useSelector } from 'react-redux'
import { useAuth0 } from "@auth0/auth0-react"

export const Navbar = () => {
    const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
    const cartItems = useSelector((state) => state.Estore.Card)
    const [searchbar, setsearchbar] = useState(false)
    const [isMenuOpen, setMenuOpen] = useState(false)
    const [cart, setCart] = useState(cartItems)

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

    const enableSearch = () => {
        setsearchbar(!searchbar)
    }

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen)
    }

    const navItems = [
        {title: 'Jawelery & Accessories', path: '/'},
        {title: 'Clothing & Shoes', path: '/'},
        {title: 'Home & Living', path: '/'},
        {title: 'Wedding & Party', path: '/'},
        {title: 'Toys & Entertainment', path: '/'},
        {title: 'Art & Collectibles', path: '/'},
        {title: 'Craft Supplies & Tools', path: '/'},
    ]
  return (
    <header className='max-w-screen-2xl xl:px-2.5 px-4 absolute top-0 right-0 left-0'>
        <nav className='flex justify-between items-center container md:py-4 pt-6 pb-3'>
           <div className='lg:flex lg:flex-row md:items-center'>
           <FaSearch onClick={enableSearch} className='text-Black w-5 h-10 cursor-pointer hidden md:block' />
           <input type="text" name="search" id="search" className={`hidden ${searchbar ? "md:block ml-1 h-7 md:w-80 " : "hidden"}`}/>
           </div>
           <NavLink to='/'><img src={logo} height={125} width={125} alt='LOGO' /></NavLink>

            <div className='text-lg text-Black sm:flex items-center gap-4 hidden'>
                <button onClick={() =>isAuthenticated ? logout({ logoutParams: { returnTo: window.location.origin } }) : loginWithRedirect()} className='flex items-center gap-2'><FaUser />{isAuthenticated ? user.name : "Account"}</button>
                <NavLink to={`/card`} className='flex items-center gap-2'><FaShoppingBag /> Shoping<sup>{cart.length}</sup></NavLink>
            </div>

            <div className='sm:hidden'>
                <button onClick={toggleMenu}>
                    {
                        isMenuOpen ? <FaTimes className='w-5 h-5 text-Black' /> : <FaBars className='w-5 h-5 text-Black' />
                    }
                </button>
            </div>
        </nav>

        <hr />

        <div className='pt-4'>
            <ul className='lg:flex items-center justify-between text-Black hidden'>
                {navItems.map(({title, path}) => (<li key={title} className='hover:bg-orange-500 hover:scale-105 p-1.5 md:px-3.5 rounded-lg duration-200'>
                    <NavLink to={path}>{title}</NavLink>
                </li>))}
            </ul>
        </div>

        <div className=''>
        <ul className={`bg-Black text-white px-4 py-2 rounded ${isMenuOpen ? "" : "hidden"}`}>
                {navItems.map(({title, path}) => (<li key={title} className='hover:text-orange-500 my-3 cursor-pointer'>
                    <NavLink to={path}>{title}</NavLink>
                </li>))}
            </ul>      
        </div>
    </header>
  )
}
