import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Trash2, Edit, Star, LayoutDashboard, User as UserIcon, LogOut, PackagePlus, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const { currentUser, products, addProduct, deleteProduct, toggleFeatured, updateProfile, uploadImage, logout } = useContext(AppContext);
    const navigate = useNavigate();
    
    const [name, setName] = useState(currentUser?.name || '');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState(currentUser?.profilePic || '');
    const [uploading, setUploading] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', image: '', description: '' });

    useEffect(() => {
        if (!currentUser) navigate('/login');
    }, [currentUser, navigate]);

    if (!currentUser) return null;

    const handleFileUpload = async (e, type) => {
        const file = e.target.files[0];
        setUploading(true);
        const imageUrl = await uploadImage(file);
        if (type === 'profile') setProfilePic(imageUrl);
        else setNewProduct({ ...newProduct, image: imageUrl });
        setUploading(false);
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        updateProfile({ id: currentUser._id, name, profilePic, password });
    };

    const handleAdd = (e) => {
        e.preventDefault();
        if (uploading) return alert('Please wait for the image to finish uploading');
        if (!newProduct.image) return alert('Product image is required. Please upload one first.');

        addProduct({ ...newProduct, price: parseFloat(newProduct.price) });
        setNewProduct({ name: '', price: '', category: '', image: '', description: '' });
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="section container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <h1 className="section-title" style={{ margin: 0 }}>
                    {currentUser.isAdmin ? 'Admin Control Center' : 'My Account'}
                </h1>
                <button onClick={handleLogout} className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', color: '#e53e3e', borderColor: '#e53e3e' }}>
                    <LogOut size={18} /> Logout
                </button>
            </div>

            <div className="dashboard" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {/* Profile Section */}
                <div style={{ flex: '1 1 300px' }}>
                    <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
                            <img 
                                src={profilePic || 'https://images.unsplash.com/photo-1560250097-0b93528c311a'} 
                                alt="Profile" 
                                style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--accent-color)' }} 
                            />
                            {currentUser.isAdmin && (
                                <div style={{ position: 'absolute', bottom: '5px', right: '5px', background: '#48BB78', color: 'white', padding: '4px 8px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800 }}>ADMIN</div>
                            )}
                        </div>
                        
                        <form onSubmit={handleUpdateProfile} style={{ textAlign: 'left', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                            <div className="form-group">
                                <label className="form-label" style={{ fontSize: '0.8rem' }}>Display Name</label>
                                <input type="text" className="form-input" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ fontSize: '0.8rem' }}>Upload New Photo (Laptop)</label>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input type="file" onChange={(e) => handleFileUpload(e, 'profile')} style={{ fontSize: '0.8rem' }} />
                                    {uploading && <small>...</small>}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ fontSize: '0.8rem' }}>New Password</label>
                                <input type="password" className="form-input" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '0.9rem' }}>Save Profile</button>
                        </form>
                    </div>
                </div>

                {/* Main Content */}
                <div style={{ flex: '2 1 500px' }}>
                    {currentUser.isAdmin ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                    <PackagePlus color="var(--accent-color)" />
                                    <h3 style={{ margin: 0 }}>List New Product</h3>
                                </div>
                                <form onSubmit={handleAdd}>
                                    <div className="form-group">
                                        <input type="text" className="form-input" placeholder="Product Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <div style={{ flex: 1 }}><input type="number" className="form-input" placeholder="Price ($)" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required /></div>
                                        <div style={{ flex: 1 }}><input type="text" className="form-input" placeholder="Category" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} required /></div>
                                    </div>
                                    
                                    <div className="form-group" style={{ marginTop: '1rem' }}>
                                        <label className="form-label" style={{ fontSize: '0.8rem' }}>Product Image (Admin Upload)</label>
                                        <input type="file" onChange={(e) => handleFileUpload(e, 'product')} />
                                        {newProduct.image && <p style={{ fontSize: '0.7rem', marginTop: '0.5rem', color: 'green' }}>✓ Image uploaded: {newProduct.image.substring(0, 30)}...</p>}
                                    </div>
                                    
                                    <textarea className="form-input" placeholder="Description..." value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} rows={2}></textarea>
                                    <button type="submit" className="btn btn-accent" style={{ width: '100%', marginTop: '1.5rem' }}>Confirm Add Product</button>
                                </form>
                            </div>

                            <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                                <h3 style={{ marginBottom: '1.5rem' }}>Inventory Overview ({products.length})</h3>
                                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    {products.map(p => (
                                        <div key={p._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                <img src={p.image.startsWith('http') ? p.image : `http://localhost:5000${p.image}`} style={{ width: '50px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} alt="" />
                                                <div>
                                                    <div style={{ fontWeight: 600 }}>{p.name}</div>
                                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>${p.price.toFixed(2)}</div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                                <button onClick={() => toggleFeatured(p._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                                    <Star size={20} color={p.featured ? '#D6BC97' : '#CBD5E0'} fill={p.featured ? '#D6BC97' : 'none'} />
                                                </button>
                                                <button onClick={() => { if(window.confirm('Delete?')) deleteProduct(p._id) }} style={{ background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer' }}>
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ background: 'var(--card-bg)', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                            <UserIcon size={48} color="var(--accent-color)" style={{ marginBottom: '1.5rem' }} />
                            <h3>Recent Orders</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Your order list is empty.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Account;
