import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Cart from './models/Cart.js';
import Order from './models/Order.js';

dotenv.config();

connectDB();

const users = [
  {
    username: 'Admin User',
    email: 'admin@example.com',
    password: 'password123', // Will be hashed by pre-save hook
    isAdmin: true,
  },
  {
    username: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  },
];

const products = [
  {
    name: 'Wireless Noise-Canceling Headphones',
    description: 'Experience premium sound quality with active noise cancellation. Features 30-hour battery life and an ergonomic design for all-day comfort.',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
    category: 'Electronics',
    stock: 50,
  },
  {
    name: 'Minimalist Mechanical Keyboard',
    description: 'A sleek, compact mechanical keyboard with tactile switches, customizable RGB backlighting, and a premium aluminum frame.',
    price: 129.50,
    imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=2071&auto=format&fit=crop',
    category: 'Electronics',
    stock: 25,
  },
  {
    name: 'Artisan Coffee Beans',
    description: 'Medium roast coffee beans sourced directly from fair-trade farms in Colombia. Notes of caramel, dark chocolate, and toasted almond.',
    price: 18.00,
    imageUrl: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1965&auto=format&fit=crop',
    category: 'Groceries',
    stock: 100,
  },
  {
    name: 'Matte Black Smartwatch',
    description: 'Track your fitness goals and stay connected with this elegant smartwatch. Features heart rate monitoring, GPS, and water resistance up to 50 meters.',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop',
    category: 'Wearables',
    stock: 15,
  }
];

const importData = async () => {
  try {
    await Order.deleteMany();
    await Cart.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    for (const user of users) {
      await User.create(user);
    }
    
    // We don't really need to associate products with a specific user in this simple model,

    await Product.insertMany(products);

    console.log('Data Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Cart.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
