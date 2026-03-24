import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';

const Home = () => {
    const { products, addToCart } = useContext(AppContext);
    
    // Show featured products, or show latest 4 products if no featured ones exist
    const featuredProducts = products.filter(p => p.featured).length > 0 
        ? products.filter(p => p.featured) 
        : products.slice(-4).reverse();

    return (
        <div>
            {/* Hero Section */}
            <section className="hero">
                <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
                    <div className="hero-content">
                        <span className="hero-subtitle">New Collection 2026</span>
                        <h1 className="hero-title">Elevate Your Everyday Style.</h1>
                        <p className="hero-desc">Discover premium quality clothing crafted for the modern individual. Minimalist, comfortable, and timeless.</p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/shop" className="btn btn-primary">Shop Collection <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} /></Link>
                            <Link to="/about" className="btn btn-outline">Our Story</Link>
                        </div>
                    </div>
                </div>
                <img 
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80" 
                    alt="Fashion Hero" 
                    className="hero-image" 
                />
            </section>

            {/* Features Info Section (Bara Page / More Sections) */}
            <section className="section" style={{ background: '#fff', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                    <div>
                        <Truck size={36} color="var(--accent-color)" style={{ marginBottom: '1rem' }} />
                        <h4 style={{ marginBottom: '0.5rem' }}>Free Shipping</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>On all orders over $150</p>
                    </div>
                    <div>
                        <RefreshCw size={36} color="var(--accent-color)" style={{ marginBottom: '1rem' }} />
                        <h4 style={{ marginBottom: '0.5rem' }}>Easy Returns</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>30-day money back guarantee</p>
                    </div>
                    <div>
                        <ShieldCheck size={36} color="var(--accent-color)" style={{ marginBottom: '1rem' }} />
                        <h4 style={{ marginBottom: '0.5rem' }}>Secure Payment</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>100% encrypted SSL checkout</p>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="section container">
                <div className="section-header">
                    <span style={{ color: 'var(--accent-color)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Curated Selections</span>
                    <h2>Featured Pieces</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Handpicked selections from our latest arrivals</p>
                </div>
                
                <div className="product-grid">
                    {featuredProducts.length > 0 ? (
                        featuredProducts.map((product) => (
                            <div className="product-card" key={product._id || product.id}>
                                <div className="product-img-wrapper">
                                    <img 
                                        src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`} 
                                        alt={product.name} 
                                        className="product-img" 
                                    />
                                    <button 
                                        className="product-add-btn"
                                        onClick={() => addToCart(product)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                                <div className="product-info">
                                    <div className="product-category">{product.category}</div>
                                    <h3 className="product-name">{product.name}</h3>
                                    <div className="product-price">${product.price.toFixed(2)}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-secondary)' }}>No featured products currently. Admin can set these in the dashboard.</p>
                    )}
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link to="/shop" className="btn btn-outline">View All Products</Link>
                </div>
            </section>

            {/* Premium Section */}
            <section className="section" style={{ background: 'var(--primary-color)', color: 'white', overflow: 'hidden' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 500px' }}>
                        <h2 style={{ color: 'white', fontSize: '3.5rem' }}>The Essence of Minimalism.</h2>
                        <p style={{ color: '#E2E8F0', marginTop: '1.5rem', fontSize: '1.2rem', maxWidth: '500px' }}>
                            We believe that style is a reflection of your personality. Our 2026 collection focuses on clean lines, neutral palettes, and premium natural materials.
                        </p>
                        <ul style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Star size={20} fill="var(--accent-color)" stroke="none" /> 100% Sustainable Cotton</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Star size={20} fill="var(--accent-color)" stroke="none" /> Handcrafted Precision</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Star size={20} fill="var(--accent-color)" stroke="none" /> Timeless Durability</li>
                        </ul>
                    </div>
                    <div style={{ flex: '1 1 400px', height: '500px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                        <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Premium Style" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
