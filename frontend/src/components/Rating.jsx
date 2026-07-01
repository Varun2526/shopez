import { Star, StarHalf } from 'lucide-react';

const Rating = ({ value, text, color = '#f8e825' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
      <span style={{ display: 'flex', color }}>
        {value >= 1 ? (
          <Star size={16} fill="currentColor" />
        ) : value >= 0.5 ? (
          <StarHalf size={16} fill="currentColor" />
        ) : (
          <Star size={16} />
        )}
        {value >= 2 ? (
          <Star size={16} fill="currentColor" />
        ) : value >= 1.5 ? (
          <StarHalf size={16} fill="currentColor" />
        ) : (
          <Star size={16} />
        )}
        {value >= 3 ? (
          <Star size={16} fill="currentColor" />
        ) : value >= 2.5 ? (
          <StarHalf size={16} fill="currentColor" />
        ) : (
          <Star size={16} />
        )}
        {value >= 4 ? (
          <Star size={16} fill="currentColor" />
        ) : value >= 3.5 ? (
          <StarHalf size={16} fill="currentColor" />
        ) : (
          <Star size={16} />
        )}
        {value >= 5 ? (
          <Star size={16} fill="currentColor" />
        ) : value >= 4.5 ? (
          <StarHalf size={16} fill="currentColor" />
        ) : (
          <Star size={16} />
        )}
      </span>
      {text && <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{text}</span>}
    </div>
  );
};

export default Rating;
