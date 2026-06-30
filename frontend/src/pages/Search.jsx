import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../Context';
import ProductCard from '../components/ProductCard';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const { products, loading } = useAppContext();
  const filteredProducts = useMemo(() => {
    if (!query) return products;
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    );
  }, [products, query]);

  if (loading) return <div className="container mt-8 text-center">Searching...</div>;

  return (
    <div className="container mt-8">
      <h2 className="mb-8" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <SearchIcon size={28} /> 
        {query ? `Search Results for "${query}"` : 'All Products'}
      </h2>
      
      {filteredProducts.length === 0 ? (
        <div className="glass-card animate-fade-in text-center" style={{ padding: '3rem' }}>
          <p className="text-muted" style={{ fontSize: '1.25rem' }}>No products found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-4">
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
