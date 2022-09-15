import React from 'react'
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';


const Navbar = () => {
    return (
        <div className="navbar-container">
            <p className="logo">
                <a href="/">Boat HeadPhones</a>
            </p>

            <button type="button" className="cart-icon" onClick="">
                <AiOutlineShopping />
                <span className="cart-item-qty">1</span>
                {/* Quanity of the item will be updated dynamically from fetching data from corresponding server */}
            </button>
        </div>
    )
}

export default Navbar