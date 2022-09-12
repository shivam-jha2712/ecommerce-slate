import React from 'react'
import Link from 'next/link';

import { urlFor } from '../lib/client';
// Every import in this is for a seperate componenet and each of it is dynamic and can be managed easily by the help of sanity framework. 

const HeroBanner = ({ heroBanner }) => {
    return (
        <div className="hero-banner-container">
            <div>
                <p className="beats-solo">{heroBanner.smallText}</p>
                <h3>{heroBanner.midText}</h3>
                <h1>{heroBanner.largeText}</h1>
                <img src={urlFor(heroBanner.image)} alt="headphones" className="hero-banner-image" />
                <div>
                    <a herf={'/product/${heroBanner.product}'}>
                        <button type="button">{heroBanner.buttonText}</button>
                    </a>
                    <div className="desc">
                        <h5>Description</h5>
                        <p>{heroBanner.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner