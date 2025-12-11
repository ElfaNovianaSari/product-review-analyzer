import React from 'react';
import './ReviewsList.css';

function ReviewsList({ reviews, loading }) {
  if (loading) {
    return <div className="loading">Loading reviews...</div>;
  }

  if (!reviews || reviews.length === 0) {
    return <div className="no-reviews">No reviews yet</div>;
  }

  const getSentimentClass = (sentiment) => {
    return `sentiment-${sentiment}`;
  };

  return (
    <div className="reviews-list">
      <h3>Recent Reviews ({reviews.length})</h3>
      <div className="reviews-grid">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <h4>{review.product_name || 'Unknown Product'}</h4>
              <span className={`sentiment-tag ${getSentimentClass(review.sentiment)}`}>
                {review.sentiment}
              </span>
            </div>
            <p className="review-text">
              {review.review_text.substring(0, 150)}
              {review.review_text.length > 150 ? '...' : ''}
            </p>
            <div className="review-meta">
              <span>Score: {(review.sentiment_score * 100).toFixed(0)}%</span>
              <span>{new Date(review.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsList;
