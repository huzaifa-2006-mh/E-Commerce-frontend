import React from 'react';

const ContactUs = () => {
    return (
        <div className="section container" style={{ maxWidth: '600px' }}>
            <h1 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Contact Us</h1>
            <div className="auth-card" style={{ maxWidth: '100%' }}>
                <form>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-input" placeholder="Your Name" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-input" placeholder="you@example.com" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Message</label>
                        <textarea className="form-input" rows="5" placeholder="How can we help?"></textarea>
                    </div>
                    <button className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
