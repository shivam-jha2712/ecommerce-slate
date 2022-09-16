import React, { useRef } from 'react';// hook used for ref
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
// Biggest logic envolved took around 3 hours to learn about all the hooks used here.

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
// import images and useStateContext

const Cart = () => {
    const cartRef = useRef();
    const { totalPrice, totalQuantities, cartItems, setShowCart } = useStateContext();
    return (
        <div className="cart-wrapper" ref={cartRef}>
            <div className="cart-container">
                <button type="button"
                    className="cart-heading"
                    onClick={() => setShowCart(false)}>
                    <AiOutlineLeft />
                    <span className="heading">Your Cart</span>
                    <span className="cart-num-items">({totalQuantities} items)</span>
                </button>

                {/* Placeholder for cart items */}
                {cartItems.length < 1 && (
                    <div className="empty-cart">
                        <AiOutlineShopping size={150} />
                        <h3>Your shopping bag is empty</h3>
                        <a href="/">
                            <button
                                type="button"
                                onClick={() => setShowCart(false)}
                                className="btn"
                            >
                                Continue Shopping
                            </button>
                        </a>
                    </div>
                )}
                {/* For empty cart and no products above code is used to push back the customer to the home page. 
                
                And the logic for redirecting him to some other page if products are available then is shown below*/}
                <div className="product-container">
                    {cartItems.length >= 1 && cartItems.map((item) => (
                        <div className="product" key={item._id}>
                            <img src={urlFor(item?.image[0])}
                                className="cart-product-image" />
                            <div className="item-desc">
                                <div className="flex top">
                                    <h5>{item.name}</h5>
                                    <h4>₹{item.price}</h4>
                                </div>
                                <div className="flex bottom">
                                    <div>
                                        <p className="quantity-desc">
                                            <span className="minus"
                                                onClick="">
                                                <AiOutlineMinus />
                                            </span>
                                            <span className="num"
                                                onClick="">
                                                0
                                            </span>
                                            <span className="plus"
                                                onClick="">
                                                <AiOutlinePlus />
                                            </span>

                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className="remove-item"
                                        onClick="">
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
                    </div>
                )}
            </div>
        </div>
    )
}
{/* There is a problem that decQty was although not defined at first but even if it was defined then too it is difficult to get this correctly that which product is being asked for to be decreased or increased in quantity and in order to do that we need the following additional steps  */ }

export default Cart