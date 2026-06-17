import express from 'express';
import {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllOrders,
    updateOrderStatus,
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Product Management
router.post('/products', protect, admin, addProduct);
router.route('/products/:id')
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

// Order Management
router.get('/orders', protect, admin, getAllOrders);
router.put('/orders/:id/status', protect, admin, updateOrderStatus);

export default router;
