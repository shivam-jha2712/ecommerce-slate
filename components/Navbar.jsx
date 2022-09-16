import React from 'react'
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';


// Working with cart things now
import { Cart } from './';

// iMPORTING THE useStateContext IS SIMILAR
import { useStateContext } from '../context/StateContext'

const Navbar = () => {
    const { showCart, setShowCart, totalQuantities } = useStateContext();
    return (
        <div className="navbar-container">
            <p className="logo">
                <a href="/">Boat HeadPhones</a>
            </p>

            <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
                <AiOutlineShopping />
                <span className="cart-item-qty">{totalQuantities}</span>
                {/* Quanity of the item will be updated dynamically from fetching data from corresponding server */}
            </button>

            {showCart && <Cart />}
            {/* We only want to display the cart when the showCart component is set to true */}
        </div>
    )
}

export default Navbar