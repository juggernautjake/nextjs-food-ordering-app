// src/pages/promotions.tsx

import React, { useEffect, useState } from 'react';
import PromotionViewer from '../components/viewers/PromotionViewer';

type Promotion = {
  id: number;
  title: string;
  description: string;
  discount: number;
  // Add other fields as necessary
};

const PromotionsPage = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    // Fetch promotions from your backend API
    const fetchPromotions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotions`);
        const data = await response.json();
        setPromotions(data);
      } catch (error) {
        console.error('Error fetching promotions:', error);
      }
    };

    fetchPromotions();
  }, []);

  return (
    <div>
      <h1>Promotions</h1>
      <PromotionViewer promotions={promotions} />
    </div>
  );
};

export default PromotionsPage;
