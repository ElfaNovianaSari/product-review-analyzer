const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000/api';

async function handleResponse(response) {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }
  return response.json();
}

export async function analyzeReview(productName, reviewText) {
  const response = await fetch(`${API_BASE_URL}/analyze-review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ review_text: reviewText }),
  });

  const data = await handleResponse(response);

  return {
    data: {
      ...data,
      product_name: productName || data.product_name || 'Unknown Product',
    },
  };
}

export async function getReviews(limit = 50, sentiment = null) {
  const params = new URLSearchParams();
  if (limit) params.append('limit', limit);
  if (sentiment) params.append('sentiment', sentiment);

  const url = `${API_BASE_URL}/reviews${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await fetch(url);
  const data = await handleResponse(response);

  return {
    data: data.map((review) => ({
      ...review,
      product_name: review.product_name || 'Unknown Product',
    })),
  };
}
