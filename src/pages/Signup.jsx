import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useContext(AppContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signup(name, email, password);
        if (result.success) {
            navigate('/account');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Create Account</h2>
                {error && <p style={{ color: '#e53e3e', textAlign: 'center', marginBottom: '1rem', background: '#fff5f5', padding: '0.5rem', borderRadius: '4px' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-input" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Create Password</label>
                        <input type="password" className="form-input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Signup and Login</button>
                    <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--accent-color)', fontWeight: 600 }}>Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
