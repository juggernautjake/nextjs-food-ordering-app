import React from 'react';
import Image from 'next/image';

interface RestaurantCardProps {
  restaurant: {
    image: string;
    name: string;
    cuisine: string;
    rating: number;
  };
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => (
  <div className="restaurant-card bg-white rounded-lg shadow-md p-4">
    <Image 
      src={restaurant.image} 
      alt={restaurant.name} 
      width={500} 
      height={300} 
      className="w-full h-48 object-cover rounded-lg mb-4" 
    />
    <h3 className="text-xl font-bold text-gray-800">{restaurant.name}</h3>
    <p className="text-gray-600">{restaurant.cuisine}</p>
    <p className="text-yellow-500">{restaurant.rating} stars</p>
  </div>
);

export default RestaurantCard;