import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Trophy, Medal, Star, Clock, User, Activity, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/quizzes/leaderboard');
        setEntries(response.data);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Trophy color="#fbbf24" size={24} />;
      case 2: return <Medal color="#94a3b8" size={24} />;
      case 3: return <Medal color="#b45309" size={24} />;
      default: return <span style={{ fontWeight: 'bold', color: 'var(--text-muted)' }}>{rank}</span>;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main className="elite-container" style={{ flex: 1, padding: 'var(--section-padding) 0 80px' }}>
        
        {/* Leaderboard Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <div className="glass-v2" style={{ display: 'inline-flex', padding: '6px 16px', borderRadius: '40px', color: '#fbbf24', fontWeight: 900, fontSize: '0.75rem', marginBottom: '24px', border: '1px solid #fbbf24' }}>
            GLOBAL_INTELLIGENCE_RANKING
          </div>
          <h1 className="title-display">The <span className="text-fluid">Champions</span></h1>
          <p style={{ color: 'var(--ink-700)', fontSize: 'clamp(1.1rem, 3vw, 1.25rem)', maxWidth: '700px', margin: '20px auto 0', fontWeight: 600 }}>
            Analyzing the highest tiers of cognitive mastery across our unified laboratory domains.
          </p>
        </motion.div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div className="luxury-card" style={{ display: 'inline-block', padding: '40px 80px' }}>
              <div className="animate-pulse" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Activity size={24} color="var(--fluid-primary)" />
                <span style={{ fontWeight: 800, color: 'var(--ink-700)' }}>ANALYZING_MASTER_DATA...</span>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            {/* Top 3 Spotlight */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginBottom: '80px' }}>
              {entries.slice(0, 3).map((entry, idx) => (
                <motion.div 
                  key={entry.username}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="luxury-card glass-v2"
                  style={{ 
                    textAlign: 'center', 
                    padding: 'clamp(24px, 8vw, 48px)',
                    border: idx === 0 ? '2px solid #fbbf24' : '1px solid rgba(0,0,0,0.03)',
                    background: idx === 0 ? 'rgba(251, 191, 36, 0.02)' : 'white'
                  }}
                >
                  <div style={{ ...styles.spotlightIcon, background: idx === 0 ? '#fbbf24' : idx === 1 ? '#94a3b8' : '#b45309' }}>
                    {getRankIcon(idx + 1)}
                  </div>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{entry.username}</h3>
                  <div style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--ink-400)', letterSpacing: '0.15em', marginBottom: '24px' }}>
                    VERIFIED_CHAMPION
                  </div>
                  <div style={styles.spotlightStats}>
                    <div style={styles.spotStat}>
                      <div style={styles.spotValue}>{entry.score}</div>
                      <div style={styles.spotLabel}>XP_POINTS</div>
                    </div>
                    <div style={{ width: '1px', height: '30px', background: 'rgba(0,0,0,0.05)' }}></div>
                    <div style={styles.spotStat}>
                      <div style={styles.spotValue}>{entry.badges}</div>
                      <div style={styles.spotLabel}>BADGE_COUNT</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Ranking Grid */}
            <div className="luxury-card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <div style={{ ...styles.tableHeader, minWidth: '800px' }}>
                <div style={{ flex: '0.5', padding: '20px 32px' }}>RANK</div>
                <div style={{ flex: '2', padding: '20px 32px' }}>SCHOLAR_IDENTITY</div>
                <div style={{ flex: '1', padding: '20px 32px' }}>MASTERY_XP</div>
                <div style={{ flex: '1', padding: '20px 32px' }}>BADGE_COLLECTION</div>
              </div>
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } }
                }}
              >
                {entries.map((entry, index) => (
                  <motion.div 
                    key={entry.username}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    style={{ ...styles.tableRow, background: index % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.01)', minWidth: '800px' }}
                  >
                    <div style={{ flex: '0.5', padding: '24px 32px', display: 'flex', alignItems: 'center' }}>
                      {getRankIcon(index + 1)}
                    </div>
                    <div style={{ flex: '2', padding: '24px 32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={styles.tableAvatar}>
                        <User size={18} />
                      </div>
                      <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>{entry.username}</span>
                    </div>
                    <div style={{ flex: '1', padding: '24px 32px', fontWeight: 900, fontSize: '1.1rem', color: 'var(--fluid-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Star size={16} fill="var(--fluid-primary)" /> {entry.score}
                    </div>
                    <div style={{ flex: '1', padding: '24px 32px', color: 'var(--ink-600)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Activity size={16} /> {entry.badges} Badges
                    </div>
                  </motion.div>
                ))}
                </motion.div>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <p style={{ color: 'var(--ink-700)', fontWeight: 600, fontSize: '1.1rem' }}>Want to see your name here? Elevate your mastery through new assessment gates.</p>
          <Link to="/student-home" className="btn-elite" style={{ display: 'inline-flex', marginTop: '32px' }}>ENTER_THE_GATE <ArrowRight size={20} /></Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const styles = {
  spotlightIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
    color: 'white',
    boxShadow: '0 10px 20px -5px rgba(0,0,0,0.1)',
  },
  spotlightStats: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '32px',
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid rgba(0,0,0,0.05)',
  },
  spotStat: {
    textAlign: 'center',
  },
  spotValue: {
    fontSize: '1.4rem',
    fontWeight: 900,
    color: 'var(--ink-900)',
  },
  spotLabel: {
    fontSize: '0.6rem',
    fontWeight: 900,
    color: 'var(--ink-400)',
    letterSpacing: '0.1em',
    marginTop: '4px',
  },
  tableHeader: {
    display: 'flex',
    background: 'var(--ink-900)',
    color: 'rgba(255,255,255,0.4)',
    fontSize: '0.75rem',
    fontWeight: 900,
    letterSpacing: '0.15em',
  },
  tableRow: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid rgba(0,0,0,0.03)',
    transition: 'all 0.2s',
  },
  tableAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    background: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--ink-400)',
    border: '1px solid rgba(0,0,0,0.03)',
  }
};

export default Leaderboard;
