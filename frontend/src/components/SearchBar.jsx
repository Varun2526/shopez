import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const val = e.target.value;
    setKeyword(val);
    if (val.trim()) {
      navigate(`/search?q=${encodeURIComponent(val)}`);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?q=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-full)', padding: '0.25rem 0.5rem', width: '300px', border: '1px solid var(--border-color)' }}>
      <input 
        type="text" 
        placeholder="Search products..." 
        value={keyword}
        onChange={handleChange}
        style={{ border: 'none', background: 'transparent', color: 'var(--text-primary)', outline: 'none', padding: '0.25rem 0.5rem', flexGrow: 1 }}
      />
      <button type="submit" style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.25rem' }}>
        <Search size={18} />
      </button>
    </form>
  );
};

export default SearchBar;
