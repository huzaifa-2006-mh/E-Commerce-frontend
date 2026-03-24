import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AppContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.success) {
            navigate('/account');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Welcome Back</h2>
                {error && <p style={{ color: '#e53e3e', textAlign: 'center', marginBottom: '1rem', background: '#fff5f5', padding: '0.5rem', borderRadius: '4px' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-input" placeholder="admin@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-input" placeholder="1234" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Sign In</button>
                    <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)' }}>
                        Don't have an account? <Link to="/signup" style={{ color: 'var(--accent-color)', fontWeight: 600 }}>Signup First</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
