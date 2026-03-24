import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, LogOut, Menu, X } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const { currentUser, logout, cartItems } = useContext(AppContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button className="mobile-only nav-icon-btn" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>AURA.</Link>
                </div>
                
                <ul className="nav-links desktop-only">
                    <li><Link to="/" className="nav-link">Home</Link></li>
                    <li><Link to="/shop" className="nav-link">Shop</Link></li>
                    <li><Link to="/about" className="nav-link">About Us</Link></li>
                    <li><Link to="/contact" className="nav-link">Contact</Link></li>
                </ul>

                <div className="nav-icons">
                    <button className="nav-icon-btn desktop-only"><Search size={22} /></button>
                    {!currentUser ? (
                        <Link to="/login" className="nav-icon-btn"><User size={22} /></Link>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Link to="/account" style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                                {currentUser.name.split(' ')[0]}
                            </Link>
                        </div>
                    )}
                    <Link to="/cart" className="nav-icon-btn">
                        <ShoppingBag size={22} />
                        {cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {menuOpen && (
                <div style={{ position: 'fixed', top: '70px', left: 0, width: '100%', height: 'calc(100vh - 70px)', background: 'white', zIndex: 1000, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.3s ease' }}>
                    <Link to="/" className="nav-link" style={{ fontSize: '1.5rem' }} onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/shop" className="nav-link" style={{ fontSize: '1.5rem' }} onClick={() => setMenuOpen(false)}>Shop</Link>
                    <Link to="/about" className="nav-link" style={{ fontSize: '1.5rem' }} onClick={() => setMenuOpen(false)}>About Us</Link>
                    <Link to="/contact" className="nav-link" style={{ fontSize: '1.5rem' }} onClick={() => setMenuOpen(false)}>Contact</Link>
                    <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />
                    {currentUser && <button onClick={handleLogout} className="btn btn-outline" style={{ justifyContent: 'flex-start', color: 'red', borderColor: 'red' }}><LogOut size={18} style={{ marginRight: '0.5rem' }} /> Logout</button>}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
