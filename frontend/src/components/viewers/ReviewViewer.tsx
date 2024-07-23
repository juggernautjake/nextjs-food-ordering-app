// src/components/viewers/ReviewViewer.tsx

import React from 'react';

type Review = {
  id: number;
  user: string;
  comment: string;
  rating: number;
};

type ReviewViewerProps = {
  reviews: Review[];
};

const ReviewViewer: React.FC<ReviewViewerProps> = ({ reviews }) => {
  return (
    <div className="review-viewer">
      <h2>Reviews</h2>
      {reviews.map(review => (
        <div key={review.id} className="review-card">
          <p><strong>{review.user}</strong></p>
          <p>{review.comment}</p>
          <p>Rating: {review.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewViewer;
