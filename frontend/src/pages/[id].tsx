// src/pages/[id].tsx

import { useRouter } from 'next/router';
import React from 'react';
import RestaurantViewer from '../components/viewers/RestaurantViewer';

const RestaurantDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Restaurant Details</h1>
      <RestaurantViewer id={id} />
    </div>
  );
};

export default RestaurantDetailsPage;
