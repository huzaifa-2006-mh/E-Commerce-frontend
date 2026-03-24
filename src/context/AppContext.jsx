import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('aura_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem('store_user');
        return saved ? JSON.parse(saved) : null;
    });

    const API_URL = 'http://localhost:5000/api';

    // Persist cart
    useEffect(() => {
        localStorage.setItem('aura_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Fetch Products on load
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/products`);
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if(currentUser) localStorage.setItem('store_user', JSON.stringify(currentUser));
        else localStorage.removeItem('store_user');
    }, [currentUser]);

    // Cart Functions
    const addToCart = (product) => {
        setCartItems(prev => {
            const exists = prev.find(item => item._id === product._id);
            if (exists) {
                return prev.map(item => item._id === product._id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const updateCartQty = (id, newQty) => {
        if (newQty < 1) return;
        setCartItems(prev => prev.map(item => item._id === id ? { ...item, qty: newQty } : item));
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item._id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    // Orders Management
    const placeOrder = async (orderData) => {
        try {
            const { data } = await axios.post(`${API_URL}/orders`, orderData);
            clearCart();
            return { success: true, order: data };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Order failed' };
        }
    };

    // Admin Auth & Signup
    const signup = async (name, email, password) => {
        try {
            const { data } = await axios.post(`${API_URL}/users/signup`, { name, email, password });
            setCurrentUser(data);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Signup failed' };
        }
    };

    const login = async (email, password) => {
        try {
            const { data } = await axios.post(`${API_URL}/users/login`, { email, password });
            setCurrentUser(data);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const logout = () => {
        setCurrentUser(null);
    };

    // Profile Management
    const updateProfile = async (userData) => {
        try {
            const { data } = await axios.put(`${API_URL}/users/profile`, { ...userData, id: currentUser._id });
            setCurrentUser(data);
            alert('Profile saved!');
        } catch (error) {
            alert('Update failed');
        }
    };

    // Product Management
    const addProduct = async (product) => {
        try {
            await axios.post(`${API_URL}/products`, product);
            fetchProducts();
            alert('Perfect! Your item is now live in the store.');
        } catch (error) {
            alert('Something went wrong while adding the product.');
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${API_URL}/products/${id}`);
            fetchProducts();
        } catch (error) {
            alert('Delete failed');
        }
    };

    const toggleFeatured = async (id) => {
        try {
            await axios.put(`${API_URL}/products/${id}/featured`);
            fetchProducts();
        } catch (error) {
            alert('Toggle failed');
        }
    };

    // Image Upload Function (for computer uploads)
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const { data } = await axios.post(`${API_URL}/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return data; // Return the path directly
        } catch (error) {
            const msg = error.response?.data?.message || 'Upload failed';
            alert(`Error: ${msg}`);
            return '';
        }
    };

    return (
        <AppContext.Provider value={{ 
            products, addProduct, deleteProduct, toggleFeatured, 
            currentUser, login, signup, logout, setCurrentUser, updateProfile, uploadImage,
            cartItems, addToCart, removeFromCart, clearCart, placeOrder, updateCartQty
        }}>
            {children}
        </AppContext.Provider>
    );
};
