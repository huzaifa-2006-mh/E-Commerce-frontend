import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Trash2, ShoppingBag, CreditCard, Plus, Minus } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart, placeOrder, currentUser, updateCartQty, BASE_URL } = useContext(AppContext);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState('');
    const [isOrdering, setIsOrdering] = useState(false);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shipping = subtotal > 150 ? 0 : 15;
    const total = subtotal + shipping;

    const handleOrder = async (e) => {
        e.preventDefault();
        if (!currentUser) return alert('Please login to place an order');
        if (!address || !city || !postalCode || !phone) return alert('Please fill all details');

        setIsOrdering(true);
        const orderData = {
            user: currentUser._id,
            orderItems: cartItems.map(item => ({
                name: item.name,
                qty: item.qty,
                image: item.image,
                price: item.price,
                product: item._id
            })),
            shippingAddress: { address, city, postalCode, phone },
            totalPrice: total
        };

        const res = await placeOrder(orderData);
        setIsOrdering(false);
        if (res.success) {
            alert('Order Placed Successfully! (Cash on Delivery)');
        } else {
            alert(res.message);
        }
    };

    return (
        <div className="section container" style={{ minHeight: '80vh' }}>
            <h1 className="section-title">Your Shopping Bag</h1>
            
            {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '5rem' }}>
                    <ShoppingBag size={64} color="var(--secondary-color)" style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
                    <h2>Your bag is currently empty.</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Discover something special in our collection.</p>
                </div>
            ) : (
                <div className="cart-layout" style={{ display: 'flex', gap: '3rem', marginTop: '3rem', flexWrap: 'wrap' }}>
                    {/* Cart Items List */}
                    <div className="cart-items" style={{ flex: '1 1 500px' }}>
                        {cartItems.map((item) => (
                            <div key={item._id} className="cart-item" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                                <div className="cart-item-img-container" style={{ width: '100px', height: '120px', backgroundColor: '#F0F0F0', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                                    <img 
                                        src={item.image.startsWith('http') ? item.image : `${BASE_URL}${item.image}`} 
                                        alt={item.name} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', fontWeight: 600 }}>{item.name}</h4>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>${item.price.toFixed(2)}</p>
                                        </div>
                                        <button 
                                            onClick={() => removeFromCart(item._id)}
                                            style={{ background: 'none', border: 'none', color: '#E53E3E', cursor: 'pointer', padding: '5px' }}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#F7FAFC', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                            <button 
                                                onClick={() => updateCartQty(item._id, item.qty - 1)}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                                title="Decrease"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span style={{ fontWeight: 600, minWidth: '20px', textAlign: 'center', fontSize: '0.9rem' }}>{item.qty}</span>
                                            <button 
                                                onClick={() => updateCartQty(item._id, item.qty + 1)}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                                title="Increase"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <div style={{ fontWeight: 700 }}>Total: ${(item.price * item.qty).toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Order Summary / Checkout */}
                    <div className="cart-summary" style={{ flex: '1 1 350px' }}>
                        <div style={{ background: 'var(--card-bg)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-color)' }}>
                            <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <CreditCard size={24} color="var(--accent-color)" /> Order Summary
                            </h3>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.25rem', fontWeight: '800' }}>
                                <span>Grand Total</span>
                                <span style={{ color: 'var(--accent-color)' }}>${total.toFixed(2)}</span>
                            </div>

                            <div className="checkout-form" style={{ marginTop: '2rem' }}>
                                <h4 style={{ marginBottom: '1rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Shipping Details</h4>
                                <form onSubmit={handleOrder}>
                                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                                        <input type="text" className="form-input" placeholder="Full Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                        <input type="text" className="form-input" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                                        <input type="text" className="form-input" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                                    </div>
                                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                        <input type="text" className="form-input" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                    </div>
                                    
                                    <div style={{ background: '#F7FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px dashed var(--border-color)' }}>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                            Payment Method: <b>Cash on Delivery</b>
                                        </p>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="btn btn-primary" 
                                        style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                                        disabled={isOrdering}
                                    >
                                        {isOrdering ? 'Processing...' : 'Place My Order'}
                                    </button>
                                </form>
                                {!currentUser && (
                                    <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#E53E3E', textAlign: 'center' }}>
                                        * Login required to place order
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
