// src/pages/restaurant-profile.tsx

import Sidebar from '../components/layout/Sidebar';
import MenuItemCard from '../components/cards/MenuItemCard';
import OrderManagementDashboard from '../components/viewers/OrderManagementDashboard';
import ReviewViewer from '../components/viewers/ReviewViewer';

const sampleItem = {
  id: 1,
  name: 'Sample Item',
  description: 'This is a sample menu item.',
  price: 9.99,
};

const sampleReviews = [
  { id: 1, user: 'User1', comment: 'Great food!', rating: 5 },
  { id: 2, user: 'User2', comment: 'Nice ambiance.', rating: 4 },
  { id: 3, user: 'User3', comment: 'Average service.', rating: 3 },
];

const RestaurantProfilePage = () => (
  <div>
    <Sidebar />
    <h1>Restaurant Profile</h1>
    <MenuItemCard item={sampleItem} />
    <OrderManagementDashboard />
    <ReviewViewer reviews={sampleReviews} />
  </div>
);

export default RestaurantProfilePage;
