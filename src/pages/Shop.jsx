import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Shop = () => {
    const { products, addToCart } = useContext(AppContext);
    const [filter, setFilter] = React.useState('All');

    const filteredProducts = filter === 'All' 
        ? products 
        : products.filter(p => p.category.toLowerCase() === filter.toLowerCase());

    return (
        <div className="section container">
            <h1 className="section-title">Collections</h1>
            
            {/* Filter Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '2rem 0 3rem' }}>
                {['All', 'Men', 'Women'].map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setFilter(cat)}
                        style={{
                            padding: '0.6rem 1.5rem',
                            borderRadius: '25px',
                            border: '1px solid var(--border-color)',
                            background: filter === cat ? 'var(--primary-color)' : 'transparent',
                            color: filter === cat ? 'white' : 'var(--text-secondary)',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
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
                    <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '5rem' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Our inventory is currently empty. Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
