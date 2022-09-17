import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

const Cart = () => {
    const cartRef = useRef();
    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();

    const handleCheckout = async () => {
        const stripe = await getStripe();
        // Creating an API request from our very own backend available in the api section from stripe.js
        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItems),
            // Unknown just copied code
        });

        if (response.statusCode === 500) return;

        const data = await response.json();

        toast.loading('Redirecting...');

        stripe.redirectToCheckout({ sessionId: data.id });
        // this is done for when just in case if the user wants to go back and even if he/she comes back for making the purchase they can make the purchase some time later
    }

    return (
        <div className="cart-wrapper" ref={cartRef}>
            <div className="cart-container">
                <button
                    type="button"
                    className="cart-heading"
                    onClick={() => setShowCart(false)}>
                    <AiOutlineLeft />
                    <span className="heading">Your Cart</span>
                    <span className="cart-num-items">({totalQuantities} items)</span>
                </button>

                {cartItems.length < 1 && (
                    <div className="empty-cart">
                        <AiOutlineShopping size={150} />
                        <h3>Your shopping bag is empty</h3>
                        <Link href="/">
                            <button
                                type="button"
                                onClick={() => setShowCart(false)}
                                className="btn"
                            >
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}

                <div className="product-container">
                    {cartItems.length >= 1 && cartItems.map((item) => (
                        <div className="product" key={item._id}>
                            <img src={urlFor(item?.image[0])} className="cart-product-image" />
                            <div className="item-desc">
                                <div className="flex top">
                                    <h5>{item.name}</h5>
                                    <h4>₹{item.price}</h4>
                                </div>
                                <div className="flex bottom">
                                    <div>
                                        <p className="quantity-desc">
                                            <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec')}>

                                                <AiOutlineMinus />
                                            </span>
                                            <span className="num" onClick="">{item.quantity}</span>

                                            <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc')}><AiOutlinePlus /></span>

                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className="remove-item"
                                        onClick={() => onRemove(item)}

                                    >
                                        <TiDeleteOutline />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {cartItems.length >= 1 && (
                    <div className="cart-bottom">
                        <div className="total">
                            <h3>Subtotal:</h3>
                            <h3>₹{totalPrice}</h3>
                        </div>
                        <div className="btn-container">
                            <button type="button" className="btn" onClick={handleCheckout}>
                                Pay with Stripe
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart

// Biggest logic envolved took around 3 hours to learn about all the hooks used here.