import React, { useState, useEffect } from 'react';
import ReviewForm from './components/ReviewForm';
import ReviewResult from './components/ReviewResult';
import ReviewsList from './components/ReviewsList';
import { analyzeReview, getReviews } from './services/api';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
  fetchReviews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [filter]);


  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const sentiment = filter === 'all' ? null : filter;
      const data = await getReviews(50, sentiment);
      setReviews(data.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleSubmit = async (productName, reviewText) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeReview(productName, reviewText);
      setResult(data.data);
      // Refresh reviews list
      fetchReviews();
    } catch (err) {
      const message = err?.message || 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Product Review Analyzer</h1>
        <p>Analyze product reviews with AI-powered sentiment analysis</p>
      </header>

      <main className="app-main">
        <div className="container">
          <ReviewForm onSubmit={handleSubmit} loading={loading} />
          
          {error && (
            <div className="error-alert">
              <strong>Error:</strong> {typeof error === 'string' ? error : 'Unexpected error'}
            </div>
          )}

          {loading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Analyzing review... This may take a few seconds</p>
            </div>
          )}

          {result && <ReviewResult result={result} />}

          <div className="reviews-section">
            <div className="filter-bar">
              <button 
                className={filter === 'all' ? 'active' : ''}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={filter === 'positive' ? 'active' : ''}
                onClick={() => setFilter('positive')}
              >
                Positive
              </button>
              <button 
                className={filter === 'negative' ? 'active' : ''}
                onClick={() => setFilter('negative')}
              >
                Negative
              </button>
              <button 
                className={filter === 'neutral' ? 'active' : ''}
                onClick={() => setFilter('neutral')}
              >
                Neutral
              </button>
            </div>

            <ReviewsList reviews={reviews} loading={reviewsLoading} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
