import ProductCard from '../components/ProductCard';
import { useAppContext } from '../Context';

const Home = () => {
  const { products, loading } = useAppContext();

  if (loading) return <div className="container mt-8 text-center">Loading products...</div>;

  return (
    <div className="container mt-8">
      <h1 className="text-center mb-8">Discover Amazing Products</h1>
      <div className="grid grid-cols-4">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {products.length === 0 && <p className="text-center text-muted">No products found. Please add some via the admin dashboard.</p>}
    </div>
  );
};

export default Home;
