import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Target, Users, Zap, Shield, Sparkles, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import './About.css'

function About() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        {/* About Hero Section */}
        <section style={styles.hero}>
          <div className="elite-container">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-v2" 
              style={styles.badge}
            >
              <Sparkles size={16} /> OUR_CORE_PHILOSOPHY
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="title-display" 
              style={{ fontSize: 'var(--h1-size)', marginBottom: '40px' }}
            >
              Engineering the <span className="text-fluid">Synapse</span> <br />
              of Modern Learning.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={styles.intro}
            >
              LAB_MLS isn't just a platform; it's a high-integrity ecosystem designed to bridge the gap between static testing and dynamic intellectual growth.
            </motion.p>
          </div>
        </section>

        {/* Mission Section - 2 columns */}
        <section style={{ padding: 'var(--section-padding) 0 80px', background: 'white' }}>
          <div className="elite-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '48px', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 style={{ fontSize: 'var(--h2-size)', marginBottom: '32px' }}>A Mission Rooted in <br /> <span className="text-fluid">Precision.</span></h2>
              <p style={{ color: 'var(--ink-700)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', lineHeight: 1.8, fontWeight: 500 }}>
                We believe that learning should be engaging, accessible, and tailored to individual needs. Our mission is to empower educators and students alike by providing a robust platform for creating, sharing, and taking assessments across a wide range of subjects.
              </p>
              <div style={{ marginTop: '56px', display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
                <div style={styles.stat}>
                  <div style={styles.statVal}>99%</div>
                  <div style={styles.statLabel}>Uptime Integrity</div>
                </div>
                <div style={styles.stat}>
                  <div style={styles.statVal}>24/7</div>
                  <div style={styles.statLabel}>Scholar Support</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="luxury-card" 
              style={{ background: 'var(--ink-900)', color: 'white', padding: 'clamp(40px, 8vw, 60px)' }}
            >
              <div style={{ width: '64px', height: '64px', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px', color: 'var(--fluid-primary)' }}>
                <Brain size={40} />
              </div>
              <h3 style={{ color: 'white', fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '24px' }}>The Intellectual Engine</h3>
              <p style={{ opacity: 0.6, lineHeight: 1.7, fontSize: '1.1rem', fontWeight: 500 }}>
                Our proprietary assessment engine uses advanced heuristics to provide real-time feedback loops, ensuring that every session results in measurable cognitive advancement.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section style={{ padding: 'clamp(80px, 15vw, 120px) 0', background: '#f8fafc', borderRadius: '80px 80px 0 0' }}>
          <div className="elite-container">
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
              <h2 style={{ fontSize: 'var(--h2-size)' }}>The Institutional Stack</h2>
              <p style={{ color: 'var(--ink-700)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', marginTop: '16px', fontWeight: 600 }}>Our platform is built on four pillars of academic excellence.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '32px' }}>
              <motion.div whileHover={{ y: -10 }} className="luxury-card" style={{ padding: 'var(--card-padding)' }}>
                <div style={{ ...styles.featIcon, color: 'var(--fluid-primary)' }}><Target size={32} /></div>
                <h4 style={styles.h4}>Precision Testing</h4>
                <p style={{ color: 'var(--ink-700)', lineHeight: 1.6 }}>Bespoke assessment modules designed for maximum accuracy.</p>
              </motion.div>
              <motion.div whileHover={{ y: -10 }} className="luxury-card" style={{ padding: 'var(--card-padding)' }}>
                <div style={{ ...styles.featIcon, color: 'var(--fluid-secondary)' }}><Users size={32} /></div>
                <h4 style={styles.h4}>Unified Faculty</h4>
                <p style={{ color: 'var(--ink-700)', lineHeight: 1.6 }}>Integrated tools for seamless institutional collaboration.</p>
              </motion.div>
              <motion.div whileHover={{ y: -10 }} className="luxury-card" style={{ padding: 'var(--card-padding)' }}>
                <div style={{ ...styles.featIcon, color: '#fbbf24' }}><Zap size={32} /></div>
                <h4 style={styles.h4}>Instant Logic</h4>
                <p style={{ color: 'var(--ink-700)', lineHeight: 1.6 }}>Real-time evaluation gates for immediate pupil feedback.</p>
              </motion.div>
              <motion.div whileHover={{ y: -10 }} className="luxury-card" style={{ padding: 'var(--card-padding)' }}>
                <div style={{ ...styles.featIcon, color: '#ef4444' }}><Shield size={32} /></div>
                <h4 style={styles.h4}>Session Security</h4>
                <p style={{ color: 'var(--ink-700)', lineHeight: 1.6 }}>High-grade data protocols ensuring academic integrity.</p>
              </motion.div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

const styles = {
  hero: {
    padding: 'clamp(100px, 15vw, 160px) 0 clamp(60px, 10vw, 80px)',
    textAlign: 'center',
    background: 'radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.03) 0, transparent 50%)',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 24px',
    borderRadius: '40px',
    fontSize: '0.75rem',
    fontWeight: 900,
    color: 'var(--fluid-primary)',
    marginBottom: '32px',
    border: '1px solid var(--fluid-primary)',
    background: 'rgba(99, 102, 241, 0.05)',
  },
  intro: {
    fontSize: 'clamp(1.1rem, 3vw, 1.45rem)',
    color: 'var(--ink-700)',
    maxWidth: '850px',
    margin: '0 auto',
    fontWeight: 600,
    lineHeight: 1.7,
  },
  stat: {
    borderLeft: '4px solid var(--fluid-primary)',
    paddingLeft: '24px',
  },
  statVal: {
    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
    fontWeight: 900,
    color: 'var(--ink-900)',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: '0.75rem',
    fontWeight: 900,
    color: 'var(--ink-400)',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginTop: '8px',
  },
  featIcon: {
    width: '56px',
    height: '56px',
    background: '#f8fafc',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  h4: {
    fontSize: 'clamp(1.3rem, 3.5vw, 1.6rem)', 
    marginBottom: '16px'
  }
};

export default About;
