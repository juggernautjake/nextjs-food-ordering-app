// src/components/cards/PromotionCard.tsx

import React from 'react';

type Promotion = {
  id: number;
  title: string;
  description: string;
  discount: number;
  // Add other fields as necessary
};

interface PromotionCardProps {
  promotion: Promotion;
}

const PromotionCard: React.FC<PromotionCardProps> = ({ promotion }) => {
  return (
    <div className="promotion-card">
      <h3>{promotion.title}</h3>
      <p>{promotion.description}</p>
      <p>Discount: {promotion.discount}%</p>
    </div>
  );
};

export default PromotionCard;
