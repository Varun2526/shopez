import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
    {
        categories: [
            {
                type: String,
                trim: true,
            },
        ],
        banner: {
            type: String, // URL to the banner image
        },
    },
    {
        timestamps: true,
    }
);

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
