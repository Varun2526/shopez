import { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../Context';
import Rating from './Rating';
import { MessageSquare } from 'lucide-react';

const ProductReviews = ({ product, setProduct }) => {
  const { user } = useAppContext();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) return alert('Please provide a rating and a comment.');

    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post(`/api/products/${product._id}/reviews`, { rating, comment }, config);
      
      // We don't get the updated product back directly, so we re-fetch it to update UI
      const { data } = await axios.get(`/api/products/${product._id}`);
      setProduct(data);

      setRating(0);
      setComment('');
      alert('Review submitted successfully!');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '3rem' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <MessageSquare size={24} /> Reviews ({product.numReviews})
      </h2>
      
      {product.reviews && product.reviews.length === 0 && <p className="text-muted" style={{ marginBottom: '2rem' }}>No reviews yet. Be the first to review!</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        {product.reviews && product.reviews.map((review) => (
          <div key={review._id} className="glass-card" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong style={{ color: 'var(--text-primary)' }}>{review.name}</strong>
              <Rating value={review.rating} />
            </div>
            <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary)' }}>{review.comment}</p>
            <small className="text-muted">{new Date(review.createdAt).toLocaleDateString()}</small>
          </div>
        ))}
      </div>

      <div className="glass-card animate-fade-in">
        <h3>Write a Customer Review</h3>
        {user ? (
          <form onSubmit={submitHandler} style={{ marginTop: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Rating</label>
              <select className="form-input" value={rating} onChange={(e) => setRating(e.target.value)} required>
                <option value="">Select...</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Comment</label>
              <textarea
                className="form-input"
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        ) : (
          <p className="text-muted" style={{ marginTop: '1rem' }}>
            Please <a href="/login" style={{ color: 'var(--accent-primary)' }}>sign in</a> to write a review.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
