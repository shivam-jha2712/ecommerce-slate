import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';


const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } =
        useStateContext();

    // Clear the cart and make previous state values to 0
    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runFireworks();
    }, []);

    return (
        <div className="success-wrapper">
            <div className="success">
                <p className="icon">
                    <BsBagCheckFill />
                </p>
                <h2>Thanks for your Order!</h2>
                <p className="email-msg">Check your email for the recipt</p>
                <p className="description">
                    If you have any questions, please email
                    <a className="email" href="mailto:shivam.jha.2712@gmail.com">
                        shivam.jha.2712@gmail.com
                    </a>
                </p>
                <Link href="/">
                    <button type="button" width="300px" className="btn">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Success