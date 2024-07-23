import React from 'react';

interface RestaurantCardProps {
  restaurant: {
    image: string;
    name: string;
    cuisine: string;
    rating: number;
  };
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => (
  <div className="restaurant-card">
    <img src={restaurant.image} alt={restaurant.name} />
    <h3>{restaurant.name}</h3>
    <p>{restaurant.cuisine}</p>
    <p>{restaurant.rating} stars</p>
  </div>
);

export default RestaurantCard;
