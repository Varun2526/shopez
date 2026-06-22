import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const { login, register } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success;
    if (isLogin) {
      success = await login(formData.email, formData.password);
    } else {
      success = await register(formData.username, formData.email, formData.password);
    }
    if (success) navigate('/');
  };

  return (
    <div className="container mt-8" style={{ maxWidth: '400px' }}>
      <div className="glass-card animate-fade-in">
        <h2 className="text-center mb-4">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Username</label>
              <input type="text" className="form-input" required value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-muted">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontSize: '0.875rem' }}>
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
