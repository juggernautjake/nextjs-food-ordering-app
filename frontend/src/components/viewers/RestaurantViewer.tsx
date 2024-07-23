// src/components/viewers/RestaurantViewer.tsx

import React from 'react';

interface RestaurantViewerProps {
  id: string | string[] | undefined;
}

const RestaurantViewer: React.FC<RestaurantViewerProps> = ({ id }) => {
  // Your logic here to fetch and display restaurant details based on id
  return (
    <div>
      <h2>Restaurant ID: {id}</h2>
      {/* Render restaurant details */}
    </div>
  );
};

export default RestaurantViewer;
