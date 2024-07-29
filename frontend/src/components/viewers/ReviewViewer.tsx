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

interface Review {
  id: number;
  user: string;
  comment: string;
  rating: number;
}

interface RestaurantViewerProps {
  query?: string;
  location?: Location | null;
  favorited?: boolean;
  id?: string | string[];
  reviews?: Review[];
}

const RestaurantViewer: React.FC<RestaurantViewerProps> = ({ query, location, favorited, id, reviews }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurants`);
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        // Use a logging service in production instead of console.error
        console.error('Error fetching restaurant details:', error);
      }
    };

    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurants/${id}`);
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        // Use a logging service in production instead of console.error
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
        {reviews && reviews.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold">Reviews</h3>
            {reviews.map((review) => (
              <div key={review.id}>
                <p><strong>{review.user}:</strong> {review.comment}</p>
                <p>Rating: {review.rating}/5</p>
              </div>
            ))}
          </div>
        )}
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
