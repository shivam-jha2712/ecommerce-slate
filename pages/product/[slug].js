// Since the name of the file is inside of square brackets it determines it is going to ber dynamic.
import React, { useState } from 'react'
import { client, urlFor } from '../../lib/client';

import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { Product } from '../../components';

import { useStateContext } from '../../context/StateContext';

// The question is that if the product is clicked how is it going to specify which product needs to be called whether a speakker is clicked or a headphones.

// **For that we need to make an API call which we have already made in the case of getServerSideProps for all the function in the index.js file of this project
const ProductDetails = ({ product, products }) => {
    const { image, name, details, price } = product;
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty } = useStateContext();

    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <img src={urlFor(image && image[index])}
                            className="product-detail-image"
                        />
                    </div>
                    <div className="small-images-container">
                        {image?.map((item, i) => (
                            <img
                                src={urlFor(item)}
                                className={i === index ? 'small-image selected-image' : 'small-image'}
                                onMouseEnter={() => setIndex(i)}
                            />
                        ))}
                    </div>
                    {/* A dynamic set of code is put that is going to be used to select diffrent product from the list of all the products */}
                </div>
                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div >
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>
                            (20)
                        </p>
                    </div>
                    <h4>Details</h4>
                    <p>{details}</p>
                    <p className="price">₹{price}</p>
                    <div className="quantity">
                        <h3>Quanity:</h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick="">
                                {decQty}<AiOutlineMinus />
                            </span>
                            <span className="num" onClick="">
                                {qty}
                            </span>
                            <span className="plus" onClick="">
                                {incQty}<AiOutlinePlus />
                            </span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type="button" className="add-to-cart" onClick="">Add To Cart</button>
                        <button type="button" className="buy-now" onClick="">Buy Now</button>
                    </div>
                </div>
            </div>

            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products.map((item) => (
                            <Product key={item._id}
                                product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>

        // Dynamically created a section that is going to act as the coming page for the product when it will clicked on.
    )
}

// NOTE: This is an important error that next.js pushed that when I had to do work with getStaticProp we do need to define a list of Paths that are statically generated for which we need "getStaticPaths"

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug{
            current 
        }
    }`;
    // Passing the current slug which is to be used for the product

    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}
// A lot about all is mentioned in the documentation I will not use is here just review once.
export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`; // Finding the first current slug having the product asked by the query. 
    const productsQuery = '*[_type == "product"]'; // This is used to fetch all kind of productrs of the same category if searched for. 
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    return {
        props: { products, product }
    }
    // another beifit of getStaticProps is we can populate is using params and then fill it with slug as [] brackets are fetching whatever content is available in the response.

    // getStaticProps in Next.js will pre-render at build time using the props returned by it in real time.

    // getStaticProps is used when the data required to render the page is already available at the build time ahead of a user's request.

    //And when the data is coming from a headless CMS*


    // File based routing is  applicable in next.js unlike react router we didn't put anykind of libraries in implementing it here

    // whenever getServerSideProps returns the result is populated in the respective function.
};


export default ProductDetails