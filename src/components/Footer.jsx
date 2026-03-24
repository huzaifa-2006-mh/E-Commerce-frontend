import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, ExternalLink } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
                <div>
                    <h2 style={{ color: 'white', fontFamily: 'var(--font-serif)' }}>AURA.</h2>
                    <p style={{ color: '#E2E8F0', marginTop: '1rem', fontSize: '0.95rem', lineHeight: '1.8' }}>
                        Premium clothing for the modern era. Designed for those who appreciate the finer details in minimalist fashion.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}><Instagram size={20} /></a>
                        <a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}><Twitter size={20} /></a>
                        <a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}><Facebook size={20} /></a>
                    </div>
                </div>
                <div>
                    <h4 style={{ color: 'white', marginBottom: '1.5rem', fontWeight: 600 }}>Shop</h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: '#CBD5E0' }}>
                       <li><Link to="/shop">New Arrivals</Link></li>
                       <li><Link to="/shop">Men's Collection</Link></li>
                       <li><Link to="/shop">Women's Collection</Link></li>
                       <li><Link to="/shop">Accessories</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 style={{ color: 'white', marginBottom: '1.5rem', fontWeight: 600 }}>Help</h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: '#CBD5E0' }}>
                       <li><Link to="/contact">Contact Us</Link></li>
                       <li><Link to="/shipping">Shipping Info</Link></li>
                       <li><Link to="/returns">Returns & Exchanges</Link></li>
                       <li><Link to="/faq">FAQs</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 style={{ color: 'white', marginBottom: '1.5rem', fontWeight: 600 }}>Newsletter</h4>
                    <p style={{ color: '#E2E8F0', fontSize: '0.9rem', marginBottom: '1.2rem' }}>Subscribe to get special offers and a first look at new arrivals.</p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input type="email" placeholder="Email address" style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', border: 'none', width: '100%', background: 'rgba(255,255,255,0.1)', color: 'white' }} />
                        <button className="btn btn-accent" style={{ padding: '0.85rem' }}>Join</button>
                    </div>
                </div>
            </div>
            
            <div className="container" style={{ marginTop: '5rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                <p style={{ color: '#CBD5E0', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    &copy; 2026 AURA Clothing Co. | Proudly Made by 
                    <a 
                        href="https://huzaifa-portfolio-ten-eosin.vercel.app/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: 'var(--accent-color)', fontWeight: 700, textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                        Muhammad Huzaifa <ExternalLink size={14} />
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
