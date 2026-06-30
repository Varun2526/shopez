import { Heart } from 'lucide-react';
import { useAppContext } from '../Context';

const WishlistBtn = ({ productId }) => {
  const { wishlist, toggleWishlist, user } = useAppContext();

  if (!user) return null;

  // The backend returns populated product objects in getWishlist, 
  // but array of ObjectIds in addToWishlist / removeFromWishlist.
  // We handle both by checking item._id and item itself.
  const isWishlisted = wishlist?.some(item => item._id === productId || item === productId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
  };

  return (
    <button 
      onClick={handleClick}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: isWishlisted ? 'var(--error)' : 'var(--text-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s ease, color 0.2s ease',
        transform: isWishlisted ? 'scale(1.1)' : 'scale(1)',
      }}
      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
    >
      <Heart size={24} fill={isWishlisted ? 'currentColor' : 'none'} />
    </button>
  );
};

export default WishlistBtn;
