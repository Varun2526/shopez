import express from 'express';
import { registerUser, authUser, logoutUser, getWishlist, addToWishlist, removeFromWishlist } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.route('/wishlist').get(protect, getWishlist).post(protect, addToWishlist);
router.route('/wishlist/:productId').delete(protect, removeFromWishlist);

export default router;
