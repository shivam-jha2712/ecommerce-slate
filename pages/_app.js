import React from 'react'
//Now for notification pop up we again import 
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';
import '../styles/globals.css';

import { StateContext } from '../context/StateContext';


function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>

    // Wrapping then entire Layout in the StateContext


    // Here we are returning a single component but that component doesn't have a footer Now we need to import Layout from components 

    // Whatever you pass to inside of your component you get access to that through a prop called children. Here we get the access using the Layout.jsx and passing children component in it 


  )
}

export default MyApp
