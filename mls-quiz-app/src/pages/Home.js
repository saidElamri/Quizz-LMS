import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Sparkles, Play, ArrowRight, ShieldCheck, Globe, Star, Zap, Cpu, Layers, Activity } from 'lucide-react';

function Home() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/quizzes')
      .then(response => response.json())
      .then(data => {
        setQuizzes(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching quizzes:', error);
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'white', position: 'relative' }}>
      <Header />
      <main>
        {/* Cinematic Hero Section */}
        <section style={{ ...styles.heroSection, padding: 'clamp(100px, 20vw, 160px) 0 clamp(60px, 12vw, 120px)' }}>
          <div style={styles.heroBlob}></div>
          <div className="elite-container">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={styles.heroContent}
            >
              <motion.div variants={itemVariants} className="glass-v2" style={styles.heroBadge}>
                <Sparkles size={14} /> <span>UNIFIED INTELLECT v2.0</span>
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="title-display" style={{ fontSize: 'var(--h1-size)', lineHeight: 1.1 }}>
                Mastery is <br />
                <span className="text-fluid">Beyond Testing.</span>
              </motion.h1>

              <motion.p variants={itemVariants} style={{ ...styles.heroSub, fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', margin: 'clamp(24px, 5vw, 32px) 0 clamp(32px, 6vw, 48px)' }}>
                A cognitive architecture for elite scholars and institutional leaders. 
                Experience a fluid assessment environment built for the future.
              </motion.p>

              <motion.div variants={itemVariants} style={{ ...styles.heroActions, gap: 'clamp(20px, 5vw, 40px)' }}>
                <button className="btn-elite" onClick={() => navigate('/register')} style={{ padding: '16px 32px' }}>
                  Initialize Session <ArrowRight size={20} />
                </button>
                <div style={styles.avatars}>
                  <div style={styles.avatarRow}>
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} style={{...styles.avatarItem, zIndex: 10 - i, backgroundImage: `url(https://i.pravatar.cc/100?img=${i+10})`}}></div>
                    ))}
                  </div>
                  <span style={styles.avatarText}>Join 2,400+ Active Scholars</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Floating Perspective Grid */}
        <section style={{ padding: 'clamp(60px, 12vw, 120px) 0', background: 'white' }}>
          <div className="elite-container">
            <div style={{ ...styles.perspectiveGrid, gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(20px, 5vw, 40px)' }}>
              <motion.div 
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="luxury-card"
                style={{ ...styles.featureItem, padding: 'var(--card-padding)' }}
              >
                <div style={styles.iconCircle}><Cpu size={24} /></div>
                <h3 style={{ fontSize: '1.5rem' }}>Heuristic Analysis</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>Advanced algorithmic mapping of your knowledge gaps with real-time feedback loops.</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, rotateY: -5 }}
                className="luxury-card"
                style={{ ...styles.featureItem, marginTop: 'clamp(0px, 8vw, 100px)', padding: 'var(--card-padding)' }}
              >
                <div style={{ ...styles.iconCircle, background: 'var(--fluid-secondary)' }}><Layers size={24} /></div>
                <h3 style={{ fontSize: '1.5rem' }}>Architectural Flow</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>Clean, focus-driven assessment layers designed to eliminate cognitive fatigue.</p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="luxury-card"
                style={{ ...styles.featureItem, padding: 'var(--card-padding)' }}
              >
                <div style={{ ...styles.iconCircle, background: 'var(--fluid-accent)' }}><Zap size={24} /></div>
                <h3 style={{ fontSize: '1.5rem' }}>Instant Synapse</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>Immediate grade verification and institutional cross-referencing benchmarks.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Pulse Showcase */}
        {!loading && (
          <section style={{ padding: 'clamp(60px, 12vw, 100px) 0', background: 'var(--ink-900)', color: 'white', borderRadius: 'clamp(30px, 8vw, 60px) clamp(30px, 8vw, 60px) 0 0' }}>
            <div className="elite-container">
              <div style={styles.showcaseHeader}>
                <h2 style={{ color: 'white', fontSize: 'var(--h2-size)' }}>The <span className="text-fluid" style={{ background: 'linear-gradient(to right, #6366f1, #fb7185)' }}>Lab</span> Modules</h2>
                <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '12px' }}>Curated assessments with institutional certification.</p>
              </div>
              
              <div style={{ ...styles.showcaseGrid, gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '32px' }}>
                {quizzes.slice(0, 3).map((quiz, idx) => (
                  <motion.div 
                    key={quiz._id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-v2"
                    style={{ ...styles.showcaseCard, padding: 'var(--card-padding)' }}
                  >
                    <div style={styles.cardHeader}>
                      <span style={styles.label}>MODULE {idx + 1}</span>
                      <div style={styles.statPill}><Activity size={12} /> 98% Mastery</div>
                    </div>
                    <h3 style={{ color: 'white', margin: '16px 0', fontSize: '1.5rem' }}>{quiz.title}</h3>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginBottom: '24px' }}>
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '70%' }}
                        style={{ height: '100%', background: 'var(--fluid-primary)', borderRadius: '2px' }}
                      ></motion.div>
                    </div>
                    <button onClick={() => navigate('/login')} className="btn-elite" style={{ padding: '12px 24px', fontSize: '0.85rem', width: '100%', justifyContent: 'center' }}>
                      Enter Module
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  heroSection: {
    position: 'relative',
    overflow: 'hidden',
  },
  heroBlob: {
    position: 'absolute',
    top: '-10%',
    right: '-5%',
    width: '60vw',
    height: '60vw',
    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
    zIndex: -1,
  },
  heroContent: {
    maxWidth: '1000px',
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 20px',
    fontSize: '0.7rem',
    fontWeight: 900,
    color: 'var(--fluid-primary)',
    marginBottom: '24px',
    letterSpacing: '0.1em',
  },
  heroSub: {
    color: 'var(--ink-700)',
    maxWidth: '700px',
    fontWeight: 500,
    lineHeight: 1.6,
  },
  heroActions: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  avatars: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  avatarRow: {
    display: 'flex',
    paddingLeft: '10px',
  },
  avatarItem: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundSize: 'cover',
    marginLeft: '-12px',
    border: '3px solid white',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  avatarText: {
    fontSize: '0.8rem',
    fontWeight: 700,
    color: 'var(--ink-700)',
  },
  perspectiveGrid: {
    display: 'grid',
    perspective: '1000px',
  },
  featureItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    textAlign: 'left',
  },
  iconCircle: {
    width: '52px',
    height: '52px',
    borderRadius: '16px',
    background: 'var(--fluid-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    marginBottom: '4px',
  },
  showcaseHeader: {
    marginBottom: '48px',
  },
  showcaseGrid: {
    display: 'grid',
  },
  showcaseCard: {
    border: '1px solid rgba(255,255,255,0.05)',
    background: 'rgba(255,255,255,0.02)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: '0.65rem',
    fontWeight: 800,
    color: '#6366f1',
    letterSpacing: '0.1em',
  },
  statPill: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(255,255,255,0.05)',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '0.7rem',
    fontWeight: 600,
    color: '#94a3b8',
  }
};

export default Home;
