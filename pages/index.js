import React from 'react'

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

const Home = ({ products, bannerData }) => (// data here is passed which is passed at the bottom 

  <div>

    <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

    <div className="products-heading">
      <h2>
        BestSelling Product
      </h2>
      <p>
        Different types of speakers
      </p>
    </div>


    <div className="products-container">
      {products?.map((product) => <Product key={product._id} product={product} />)}
      {/* In products?.map((product) =>product), ?.map is used to identify and map that there is a product there */}
    </div>

    <FooterBanner />

  </div>


)

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  // fetching all the query regarding the type product product
  // products will wait unless the client requests for this query

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }

  // whenever getServerSideProps returns the result is populated in the respective function.
};


// getServerSideProps is used to fetch data from the server in nextJs unlike react it does fetch data from an api or a cms this function pre renders each request using the data returned by getServerSideProps (NOTE : IT IS AN ASYNCHRONOUS FUNCTION)

export default Home