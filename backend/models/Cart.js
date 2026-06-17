import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true, // Typically one active cart per user
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                name: { type: String, required: true },
                quantity: { type: Number, required: true, min: 1, default: 1 },
                size: { type: String },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
