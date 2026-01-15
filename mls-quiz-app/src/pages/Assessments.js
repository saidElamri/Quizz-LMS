import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Brain, Search, Filter, ArrowRight, Clock, Target, Activity, Cpu, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

const Assessments = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { user } = useAuth();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/quizzes', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setQuizzes(response.data);
      } catch (err) {
        console.error('Error fetching modules:', err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) fetchQuizzes();
  }, [user]);

  const categories = ['All', 'Advanced AI', 'Heuristic Logic', 'Neural Networks', 'Quantum Computing', 'General Engineering'];

  const filteredQuizzes = quizzes.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'white' }}>
      <Header />
      
      <main className="elite-container" style={{ flex: 1, padding: 'var(--section-padding) 0 100px' }}>
        
        {/* Cinematic Header Area */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 'clamp(40px, 8vw, 80px)' }}
        >
          <div className="glass-v2" style={{ display: 'inline-flex', padding: '6px 16px', borderRadius: '40px', color: 'var(--fluid-primary)', fontWeight: 900, fontSize: '0.75rem', marginBottom: '24px', border: '1px solid var(--fluid-primary)' }}>
            ASSESSMENT_HUB_v2.4
          </div>
          <h1 className="title-display" style={{ fontSize: 'var(--h1-size)' }}>Intelligence <span className="text-fluid">Modules</span></h1>
          <p style={{ color: 'var(--ink-700)', fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', marginTop: '20px', fontWeight: 600, maxWidth: '800px' }}>
            Initialize your cognitive verification sequence through our high-integrity assessment architectures.
          </p>
        </motion.div>

        {/* Dynamic Filter Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="luxury-card glass-v2" 
          style={{ padding: 'clamp(16px, 4vw, 24px)', marginBottom: 'clamp(40px, 8vw, 60px)', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}
        >
          <div style={{ position: 'relative', flex: '1 1 auto', minWidth: 'min(240px, 100%)' }}>
            <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-400)' }} size={20} />
            <input 
              type="text" 
              placeholder="Query intelligence vector..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%' }} className="no-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)}
                style={{
                  ...styles.catTab,
                  background: selectedCategory === cat ? 'var(--ink-900)' : 'transparent',
                  color: selectedCategory === cat ? 'white' : 'var(--ink-600)',
                  borderColor: selectedCategory === cat ? 'var(--ink-900)' : 'var(--ink-200)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Intelligence Module Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ textAlign: 'center', padding: '100px 0' }}
            >
              <Cpu size={48} className="animate-pulse" color="var(--fluid-primary)" />
              <p style={{ marginTop: '24px', fontWeight: 800, color: 'var(--ink-700)' }}>FETCHING_MODULE_DATA...</p>
            </motion.div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: 'clamp(20px, 4vw, 32px)' }}
            >
              {filteredQuizzes.length > 0 ? filteredQuizzes.map((quiz) => (
                <motion.div 
                  key={quiz._id}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  className="luxury-card glass-v2"
                  style={{ padding: 'var(--card-padding)', display: 'flex', flexDirection: 'column', gap: '24px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ padding: '10px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', color: 'var(--fluid-primary)' }}>
                      <Brain size={24} />
                    </div>
                    <div style={styles.difficultyBadge}>CAT_{quiz.category?.toUpperCase() || 'PROTO'}</div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '12px', color: 'var(--ink-900)' }}>{quiz.title}</h3>
                    <p style={{ color: 'var(--ink-600)', fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 500, minHeight: '3.2em' }}>
                      {quiz.description || "Experimental cognitive module designed for architectural mastery verification."}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--ink-100)', flexWrap: 'wrap' }}>
                    <div style={styles.cardStat}>
                      <Clock size={14} /> 15m
                    </div>
                    <div style={styles.cardStat}>
                      <LayoutGrid size={14} /> {quiz.questions?.length || 0} GATES
                    </div>
                    <div style={styles.cardStat}>
                      <Activity size={14} /> {quiz.stats?.avgSuccess || 0}% SUCCESS
                    </div>
                  </div>

                  <Link to={`/quiz/${quiz._id}`} className="btn-elite" style={{ padding: '16px', justifyContent: 'center', fontSize: '0.9rem' }}>
                    INITIALIZE_SESSION <ArrowRight size={20} />
                  </Link>
                </motion.div>
              )) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '100px 0', background: 'var(--ink-50)', borderRadius: '24px', border: '2px dashed var(--ink-200)' }}>
                  <p style={{ fontWeight: 800, color: 'var(--ink-400)' }}>NO_MODULES_MATCH_QUERY_VECTORS</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

const styles = {
  searchInput: {
    width: '100%',
    padding: '14px 14px 14px 48px',
    borderRadius: '12px',
    border: '1px solid var(--ink-200)',
    background: 'white',
    fontSize: '0.95rem',
    fontWeight: 600,
    color: 'var(--ink-900)',
    outline: 'none',
    transition: 'all 0.2s',
  },
  catTab: {
    padding: '8px 20px',
    borderRadius: '40px',
    border: '1px solid',
    fontSize: '0.75rem',
    fontWeight: 800,
    cursor: 'pointer',
    transition: 'all 0.3s',
    whiteSpace: 'nowrap',
  },
  difficultyBadge: {
    padding: '5px 10px',
    background: 'rgba(0,0,0,0.03)',
    borderRadius: '6px',
    fontSize: '0.6rem',
    fontWeight: 900,
    color: 'var(--ink-400)',
    letterSpacing: '0.1em',
  },
  cardStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.7rem',
    fontWeight: 800,
    color: 'var(--ink-500)',
    letterSpacing: '0.05em',
  }
};

export default Assessments;
