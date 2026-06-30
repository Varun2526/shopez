/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({ products: [] });
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize App
  useEffect(() => {
    const initApp = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
      setLoading(false);
    };
    initApp();
  }, []);

  const fetchCart = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('/api/cart', config);
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart', error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('/api/users/wishlist', config);
      setWishlist(data);
    } catch (error) {
      console.error('Error fetching wishlist', error);
    }
  };

  // Sync cart and wishlist when user logs in
  useEffect(() => {
    if (user && user.token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchCart();
      fetchWishlist();
    } else {
      setCart({ products: [] });
      setWishlist([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/users/login', { email, password });
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Login error', error);
      return false;
    }
  };

  const register = async (username, email, password) => {
    try {
      const { data } = await axios.post('/api/users', { username, email, password });
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Register error', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCart({ products: [] });
    setWishlist([]);
  };

  const addToCart = async (productId, name, quantity) => {
    if (!user) return alert('Please login to add items to cart');
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post('/api/cart', { productId, name, quantity }, config);
      setCart(data);
    } catch (error) {
      console.error('Add to cart error', error);
    }
  };

  const toggleWishlist = async (productId) => {
    if (!user) return alert('Please login to use the wishlist');
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      // Check if product is already in wishlist
      const isWishlisted = wishlist.some(item => item._id === productId || item === productId);
      
      if (isWishlisted) {
        const { data } = await axios.delete(`/api/users/wishlist/${productId}`, config);
        setWishlist(data);
      } else {
        const { data } = await axios.post('/api/users/wishlist', { productId }, config);
        setWishlist(data);
      }
    } catch (error) {
      console.error('Toggle wishlist error', error);
    }
  };

  const value = {
    user,
    cart,
    wishlist,
    products,
    loading,
    login,
    register,
    logout,
    addToCart,
    toggleWishlist
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
