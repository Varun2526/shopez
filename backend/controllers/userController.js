import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const user = await User.create({
            username,
            email,
            password,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Logout user / clear cookie or token on client side
// @route   POST /api/users/logout
// @access  Public
export const logoutUser = (req, res) => {
    res.json({ message: 'User logged out successfully. Please clear your token on the client.' });
};

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
export const getWishlist = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist');
        if (user) {
            res.json(user.wishlist);
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Add product to wishlist
// @route   POST /api/users/wishlist
// @access  Private
export const addToWishlist = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user._id);

        if (user) {
            if (!user.wishlist.includes(productId)) {
                user.wishlist.push(productId);
                await user.save();
            }
            res.json(user.wishlist);
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/users/wishlist/:productId
// @access  Private
export const removeFromWishlist = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        
        if (user) {
            user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.productId);
            await user.save();
            res.json(user.wishlist);
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        next(error);
    }
};
