import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
// This is going to push a pop up when any action is performed.

const Context = createContext(); // Hook has been created

// This is a prop inside of the StateContext which is children that is going to fetch the output/render it out for the query when it is called in .

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    // ShowCart is used to show whether it going in the cart or not.
    const [cartItems, setCartItems] = useState([]);
    //CartItems is used to show what is going in the cart. This keeps the data of the user with the cart even if he comes back after they dismiss the session once

    // Same for  Price and Quantity and is filled with dynamic values fetched from sanity in the backend
    const [totalPrice, setTotalPrice] = useState();
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    // Add to cart items Logic and Function 
    const onAdd = (product, quantity) => {
        // now we check whether the product is there in the cart or not and also what is its quantity so as to accordingly increase and decrease the quantity of the cart item
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        // this is the logic for finding the item in the cart and also match it with the product id

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((preTotalQuantites) => preTotalQuantites + quantity);
        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
        }
        else {
            product.quantity = quantity;

            setCartItems([...cartItems, { ...product }]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`);

    }


    // Logic for Shopping cart number
    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }
    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;

            return prevQty - 1;
        });
    }

    // Context provider is created in the return statment
    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd
            }}
        >
            {children}
        </Context.Provider> // Intitally we are just wrapping the children all the way folllowed by passing values to it 

        // Now to access these values from the context.provider we need to code in app.js
    )

};
export const useStateContext = () => useContext(Context);

// Function created for grabbing the state in a much easier manner using useStateContext