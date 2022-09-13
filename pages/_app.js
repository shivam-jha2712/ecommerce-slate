import React from 'react'

import { Layout } from '../components';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
    // Here we are returning a single component but that component doesn't have a footer Now we need to import Layout from components 

    // Whatever you pass to inside of your component you get access to that through a prop called children. Here we get the access using the Layout.jsx and passing children component in it 
  )
}

export default MyApp
