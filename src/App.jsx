import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Account from './pages/Account';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account/*" element={<Account />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
