// src/components/viewers/PromotionViewer.tsx

import React from 'react';
import PromotionCard from '../cards/PromotionCard';

type Promotion = {
  id: number;
  title: string;
  description: string;
  discount: number;
  // Add other fields as necessary
};

interface PromotionViewerProps {
  promotions: Promotion[];
}

const PromotionViewer: React.FC<PromotionViewerProps> = ({ promotions }) => {
  return (
    <div className="promotion-viewer">
      <h2>Promotions</h2>
      {promotions.length > 0 ? (
        promotions.map(promotion => (
          <PromotionCard key={promotion.id} promotion={promotion} />
        ))
      ) : (
        <p>No promotions available</p>
      )}
    </div>
  );
};

export default PromotionViewer;
