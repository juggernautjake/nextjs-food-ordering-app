// src/components/viewers/RestaurantViewer.tsx

import React, { useEffect, useState } from 'react';

interface Restaurant {
  id: number;
  name: string;
  description: string;
  // Add other fields as necessary
}

interface Location {
  latitude: number;
  longitude: number;
}

interface RestaurantViewerProps {
  query?: string;
  location?: Location | null;
  favorited?: boolean;
  id?: string | string[];
}

const RestaurantViewer: React.FC<RestaurantViewerProps> = ({ query, location, favorited, id }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurants`);
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      }
    };

    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurants/${id}`);
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      }
    };

    if (id) {
      fetchRestaurant();
    } else {
      fetchRestaurants();
    }
  }, [query, location, favorited, id]);

  if (id && restaurant) {
    return (
      <div>
        <h2 className="text-2xl font-bold">{restaurant.name}</h2>
        <p>{restaurant.description}</p>
      </div>
    );
  }

  if (!restaurants.length) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {restaurants.map((restaurant) => (
        <div key={restaurant.id}>
          <h2 className="text-2xl font-bold">{restaurant.name}</h2>
          <p>{restaurant.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RestaurantViewer;
