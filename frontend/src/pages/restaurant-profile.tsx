import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import MenuItemCard from '../components/cards/MenuItemCard';
import OrderManagementDashboard from '../components/viewers/OrderManagementDashboard';
import ReviewViewer from '../components/viewers/ReviewViewer';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface Review {
  id: number;
  user: string;
  comment: string;
  rating: number;
}

const sampleItem: MenuItem = {
  id: 1,
  name: 'Sample Item',
  description: 'This is a sample menu item.',
  price: 9.99,
};

const sampleReviews: Review[] = [
  { id: 1, user: 'User1', comment: 'Great food!', rating: 5 },
  { id: 2, user: 'User2', comment: 'Nice ambiance.', rating: 4 },
  { id: 3, user: 'User3', comment: 'Average service.', rating: 3 },
];

const RestaurantProfilePage: React.FC = () => (
  <div>
    <Sidebar />
    <h1>Restaurant Profile</h1>
    <MenuItemCard item={sampleItem} />
    <OrderManagementDashboard />
    <ReviewViewer reviews={sampleReviews} />
  </div>
);

export default RestaurantProfilePage;
