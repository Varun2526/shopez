import Cart from '../models/Cart.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) {
            cart = await Cart.create({ userId: req.user._id, products: [] });
        }
        res.json(cart);
    } catch (error) {
        next(error);
    }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res, next) => {
    try {
        const { productId, name, quantity, size } = req.body;

        let cart = await Cart.findOne({ userId: req.user._id });

        if (!cart) {
            cart = new Cart({ userId: req.user._id, products: [] });
        }

        const existingProductIndex = cart.products.findIndex((p) => p.productId.toString() === productId);

        if (existingProductIndex >= 0) {
            // Update quantity if already exists
            cart.products[existingProductIndex].quantity += Number(quantity);
            if (size) cart.products[existingProductIndex].size = size;
        } else {
            // Add new product
            cart.products.push({ productId, name, quantity, size });
        }

        const updatedCart = await cart.save();
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeFromCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ userId: req.user._id });

        if (cart) {
            cart.products = cart.products.filter(
                (p) => p.productId.toString() !== req.params.productId
            );
            const updatedCart = await cart.save();
            res.json(updatedCart);
        } else {
            res.status(404);
            throw new Error('Cart not found');
        }
    } catch (error) {
        next(error);
    }
};
