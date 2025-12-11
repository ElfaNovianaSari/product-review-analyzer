import React, { useState } from 'react';
import './ReviewForm.css';

function ReviewForm({ onSubmit, loading }) {
  const [productName, setProductName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!reviewText.trim() || reviewText.trim().length < 10) {
      setError('Review must be at least 10 characters long');
      return;
    }

    onSubmit(productName, reviewText);
  };

  return (
    <div className="review-form-container">
      <h2>Submit Product Review</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g., iPhone 15 Pro"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="reviewText">Review *</label>
          <textarea
            id="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your product review here..."
            rows="6"
            disabled={loading}
            required
          />
          <small>{reviewText.length} characters</small>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Analyzing...' : 'Analyze Review'}
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;