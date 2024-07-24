// src/components/viewers/PromotionViewer.tsx

import React from 'react';
import PromotionCard from '../cards/PromotionCard';

type Promotion = {
  id: number;
  title: string;
  description: string;
  discount: number;
};

interface PromotionViewerProps {
  promotions: Promotion[];
}

const PromotionViewer: React.FC<PromotionViewerProps> = ({ promotions = [] }) => {
  return (
    <div className="promotion-viewer">
      <h2 className="text-2xl font-bold">Promotions</h2>
      {promotions.length > 0 ? (
        promotions.map((promotion) => (
          <PromotionCard key={promotion.id} promotion={promotion} />
        ))
      ) : (
        <p>No promotions available</p>
      )}
    </div>
  );
};

export default PromotionViewer;
