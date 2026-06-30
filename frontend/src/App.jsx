import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './Context';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import ProductDetail from './pages/ProductDetail';
import Auth from './pages/Auth';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import Wishlist from './pages/Wishlist';



const AppContent = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </BrowserRouter>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
