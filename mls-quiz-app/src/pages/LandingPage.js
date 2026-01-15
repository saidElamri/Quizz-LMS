import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Brain, Trophy, Zap, ArrowRight, Activity, Terminal, Globe, Award } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const featureCards = [
    { icon: <Brain />, title: 'Heuristic Mastery', desc: 'Advanced assessment protocols designed to verify cognitive agility and logical infrastructure.' },
    { icon: <Shield />, title: 'Institutional Integrity', desc: 'Secure, verified results backed by our permanent intellectual identity ledger.' },
    { icon: <Trophy />, title: 'Global Rankings', desc: 'Compete across institutional tiers and climb the unified intelligence hierarchy.' },
    { icon: <Activity />, title: 'Real-Time Telemetry', desc: 'Live feedback loops and scholar progress tracking with milliseconds precision.' }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'white' }}>
      <Header />
      <main style={{ flex: 1 }}>
        
        {/* Dynamic Background */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}>
           <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '50%', filter: 'blur(120px)' }}></div>
           <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '500px', height: '500px', background: 'rgba(6, 182, 212, 0.05)', borderRadius: '50%', filter: 'blur(120px)' }}></div>
        </div>

        {/* Hero Section */}
        <section style={{ padding: 'var(--section-padding) 0 clamp(40px, 8vw, 80px)', textAlign: 'center' }}>
          <div className="elite-container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <div className="glass-v2" style={{ display: 'inline-flex', padding: '8px 20px', borderRadius: '40px', color: 'var(--fluid-primary)', fontWeight: 900, fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: 'clamp(24px, 5vw, 32px)', border: '1px solid var(--fluid-primary)' }}>
                UNIFIED_INTELLIGENCE_LAYER_V2
              </div>
              <h1 className="title-display" style={{ fontSize: 'var(--h1-size)' }}>
                Mastery Through <span className="text-fluid">Precision.</span>
              </h1>
              <p style={{ color: 'var(--ink-700)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', maxWidth: '800px', margin: 'clamp(24px, 4vw, 32px) auto clamp(32px, 6vw, 48px)', fontWeight: 600, lineHeight: 1.5 }}>
                The professional architecture for high-integrity academic assessments. Verify knowledge with heuristic modules and institutional sync.
              </p>
              
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/register" className="btn-elite" style={{ padding: 'clamp(14px, 3vw, 20px) clamp(24px, 5vw, 40px)' }}>
                  Initialize Environment <ArrowRight size={20} />
                </Link>
                <Link to="/login" className="btn-elite" style={{ background: 'white', color: 'var(--ink-900)', border: '1px solid var(--border-light)', boxShadow: 'none', padding: 'clamp(14px, 3vw, 20px) clamp(24px, 5vw, 40px)' }}>
                  Secure Login
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section style={{ padding: 'clamp(40px, 8vw, 80px) 0' }}>
          <div className="elite-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: 'clamp(40px, 8vw, 80px)', flexWrap: 'wrap' }}>
               <h2 style={{ fontSize: 'var(--h2-size)', whiteSpace: 'nowrap' }}>Core <span className="text-fluid">Protocols</span></h2>
               <div style={{ flex: 1, minWidth: '100px', height: '1px', background: 'rgba(0,0,0,0.05)' }}></div>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(20px, 4vw, 32px)' }}
            >
              {featureCards.map((card, idx) => (
                <motion.div key={idx} variants={itemVariants} className="luxury-card glass-v2" style={{ padding: 'var(--card-padding)' }}>
                  <div style={{ width: '56px', height: '56px', background: 'rgba(0,0,0,0.02)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fluid-primary)', marginBottom: '24px' }}>
                    {React.cloneElement(card.icon, { size: 28 })}
                  </div>
                  <h3 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', marginBottom: '16px' }}>{card.title}</h3>
                  <p style={{ color: 'var(--ink-700)', fontSize: '1rem', lineHeight: 1.7 }}>{card.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Global Telemetry Card */}
        <section style={{ padding: 'clamp(40px, 8vw, 80px) 0' }}>
          <div className="elite-container">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="luxury-card" 
              style={{ background: 'var(--ink-900)', color: 'white', padding: 'clamp(60px, 12vw, 100px) clamp(24px, 8vw, 60px)', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gap: '1px' }}>
                  {Array.from({ length: 200 }).map((_, i) => <div key={i} style={{ height: '40px', border: '1px solid white' }}></div>)}
                </div>
              </div>

              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <h2 style={{ color: 'white', fontSize: 'var(--h1-size)', marginBottom: '24px' }}>Institutional Reach</h2>
                <p style={{ opacity: 0.6, fontSize: 'clamp(1rem, 3vw, 1.25rem)', maxWidth: '600px', margin: '0 auto 64px' }}>Our decentralized assessment network spans across multiple cognitive domains and verified scholars.</p>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(32px, 8vw, 80px)', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 'var(--h1-size)', fontWeight: 900 }}>428+</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 900, opacity: 0.5, letterSpacing: '0.2em', marginTop: '8px' }}>SCHOLAR_NODES</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 'var(--h1-size)', fontWeight: 900 }}>12K</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 900, opacity: 0.5, letterSpacing: '0.2em', marginTop: '8px' }}>XP_PROCESSED</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 'var(--h1-size)', fontWeight: 900 }}>99.9%</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 900, opacity: 0.5, letterSpacing: '0.2em', marginTop: '8px' }}>CORE_UPTIME</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ padding: 'clamp(80px, 15vw, 120px) 24px clamp(120px, 20vw, 200px)', textAlign: 'center' }}>
          <div className="elite-container">
            <h2 style={{ fontSize: 'var(--h1-size)', marginBottom: '32px' }}>Ready to Begin?</h2>
            <p style={{ color: 'var(--ink-700)', fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', marginBottom: '48px', fontWeight: 600 }}>Join the next generation of academic intelligence.</p>
                <Link to="/register" className="btn-elite" style={{ padding: '20px 48px', fontSize: '1.1rem', width: 'auto', minWidth: 'min(280px, 100%)', justifyContent: 'center' }}>
                  Create Account
                </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
