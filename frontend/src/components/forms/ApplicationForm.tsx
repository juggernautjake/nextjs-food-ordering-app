import React, { useState } from 'react';

const ApplicationForm: React.FC = () => {
  const [restaurantName, setRestaurantName] = useState('');

  return (
    <form>
      <div>
        <label htmlFor="restaurantName">Restaurant Name:</label>
        <input
          type="text"
          id="restaurantName"
          name="restaurantName"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ApplicationForm;
