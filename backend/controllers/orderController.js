import Order from '../models/Order.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = async (req, res, next) => {
    try {
        const { products, totalAmount } = req.body;

        if (products && products.length === 0) {
            res.status(400);
            throw new Error('No order items');
        } else {
            const order = new Order({
                userId: req.user._id,
                products,
                totalAmount,
            });

            const createdOrder = await order.save();

            res.status(201).json(createdOrder);
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ userId: req.user._id });
        res.json(orders);
    } catch (error) {
        next(error);
    }
};
