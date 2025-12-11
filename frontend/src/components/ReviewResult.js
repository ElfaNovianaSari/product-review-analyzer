import React from 'react';
import './ReviewResult.css';

function ReviewResult({ result }) {
  if (!result) return null;

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return '#22c55e';
      case 'negative':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getSentimentEmoji = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😞';
      default:
        return '😐';
    }
  };

  return (
    <div className="review-result">
      <h3>Analysis Results</h3>
      
      <div className="result-section">
        <h4>Product</h4>
        <p>{result.product_name || 'Unknown Product'}</p>
      </div>

      <div className="result-section">
        <h4>Sentiment Analysis</h4>
        <div 
          className="sentiment-badge"
          style={{ backgroundColor: getSentimentColor(result.sentiment) }}
        >
          <span className="sentiment-emoji">{getSentimentEmoji(result.sentiment)}</span>
          <span className="sentiment-text">{result.sentiment.toUpperCase()}</span>
          <span className="sentiment-score">
            {(result.sentiment_score * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="result-section">
        <h4>Key Points</h4>
        <div className="key-points">
          {result.key_points.split('\n').map((point, index) => (
            point.trim() && <p key={index}>{point}</p>
          ))}
        </div>
      </div>

      <div className="result-section">
        <h4>Original Review</h4>
        <p className="original-review">{result.review_text}</p>
      </div>
    </div>
  );
}

export default ReviewResult;