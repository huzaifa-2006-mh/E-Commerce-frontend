import React from 'react';
import { Target, Leaf, Heart, Gem } from 'lucide-react';

const AboutUs = () => {
    return (
        <div>
            {/* Minimalist Hero */}
            <section style={{ height: '60vh', background: '#F8F5F0', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <div className="container">
                    <span style={{ color: 'var(--accent-color)', fontWeight: 600, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>The Aura Way</span>
                    <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem' }}>Elegance in Every Fiber.</h1>
                    <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                        Redefining modern essentials through conscious design and unparalleled craftsmanship since 2026.
                    </p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="section container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <img 
                            src="https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=800&q=80" 
                            alt="Craftsmanship" 
                            style={{ width: '100%', height: '600px', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} 
                        />
                    </div>
                    <div>
                        <h2 style={{ marginBottom: '2rem' }}>Born From A Passion For Perfection.</h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                            AURA started in a small studio with one goal: to create clothing that lasts longer than a season. We were tired of fast fashion and disposable trends.
                        </p>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                            Every piece in our collection is the result of months of research, dozens of prototypes, and a rigorous selection of natural, sustainable fabrics. We believe that true luxury is found in the things you wear every day.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '3rem' }}>
                            <div>
                                <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-color)', margin: 0 }}>4+</h3>
                                <p style={{ fontWeight: 600 }}>Years of Quality</p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-color)', margin: 0 }}>10k</h3>
                                <p style={{ fontWeight: 600 }}>Happy Clients</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section style={{ background: 'var(--primary-color)', color: 'white', padding: '6rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ color: 'white' }}>Our Core Values</h2>
                        <p style={{ color: 'rgba(255,255,255,0.7)' }}>The principles that guide every stitch we make.</p>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <Leaf size={48} color="var(--accent-color)" style={{ marginBottom: '1.5rem' }} />
                            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Sustainability</h4>
                            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)' }}>We use 100% organic cotton and recycled materials in all our packaging.</p>
                        </div>
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <Gem size={48} color="var(--accent-color)" style={{ marginBottom: '1.5rem' }} />
                            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Quality First</h4>
                            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)' }}>Every garment undergoes a 12-point quality check before it leaves our warehouse.</p>
                        </div>
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <Heart size={48} color="var(--accent-color)" style={{ marginBottom: '1.5rem' }} />
                            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Ethical Practice</h4>
                            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)' }}>We partner only with factories that guarantee fair wages and safe working conditions.</p>
                        </div>
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <Target size={48} color="var(--accent-color)" style={{ marginBottom: '1.5rem' }} />
                            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Timeless Design</h4>
                            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)' }}>Our aesthetics focus on longevity, ensuring your AURA pieces remain relevant for years.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="section container" style={{ textAlign: 'center' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontStyle: 'italic', color: 'var(--primary-color)', fontSize: '2.5rem', lineHeight: '1.4' }}>
                        "Fashion is what you're offered four times a year by designers. Style is what you choose."
                    </h2>
                    <div style={{ marginTop: '2rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent-color)' }}>
                        — Lauren Hutton
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
