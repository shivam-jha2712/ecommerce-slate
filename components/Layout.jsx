import React from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Head>
                <title>Boat Head Store</title>
            </Head>
            <header>
                <Navbar />
            </header>
            <main className="main-container">
                {children}
                {/* This is imported from _app.js components section in the children section which is being imported */}
            </main>
            <footer>
                <Footer />
                {/* To import this we need to press ctrl + space and then click */}
            </footer>
        </div>
    )
}

export default Layout