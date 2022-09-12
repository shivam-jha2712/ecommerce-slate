import React from 'react'

import { Product, FooterBanner, HeroBanner } from '../components';

const Home = () => {
  return (
    <>
      HeroBanner
      <div className="products-heading">
        <h2>
          BestSelling Product
        </h2>
        <p>
          Different types of speakers
        </p>
      </div>


      <div className="products-container">
        {['Product 1', 'Product 2'].map((product) => product)}
      </div>


      Footer
    </>

  )
}

export default Home