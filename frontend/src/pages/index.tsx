// src/pages/index.tsx

import React from 'react';
import Head from 'next/head';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import RestaurantViewer from '../components/viewers/RestaurantViewer';
import PromotionViewer from '../components/viewers/PromotionViewer';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Next.js Food Ordering App</title>
        <meta name="description" content="Order food from your favorite restaurants" />
      </Head>
      <Header />
      <main>
        <RestaurantViewer />
        <PromotionViewer />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
