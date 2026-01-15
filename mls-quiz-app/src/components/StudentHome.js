import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Brain, Trophy, BookOpen, Clock, ArrowRight, Zap, Target, Activity, Layout, Terminal, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentHome = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [quizRes, profileRes, histRes, growthRes] = await Promise.all([
          axios.get('http://localhost:3001/api/quizzes', {
            headers: { Authorization: `Bearer ${user.token}` }
          }),
          axios.get('http://localhost:3001/api/me', {
            headers: { Authorization: `Bearer ${user.token}` }
          }),
          axios.get('http://localhost:3001/api/quizzes/my-results', {
            headers: { Authorization: `Bearer ${user.token}` }
          }),
          axios.get('http://localhost:3001/api/quizzes/stats/activity', {
            headers: { Authorization: `Bearer ${user.token}` }
          })
        ]);
        setQuizzes(quizRes.data);
        setProfile(profileRes.data);
        setHistory(histRes.data.slice(0, 3));
        setGrowthData(growthRes.data);
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) fetchHomeData();
  }, [user]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'white', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main className="elite-container" style={{ flex: 1, padding: 'var(--section-padding) 0 80px' }}>
        
        {/* Scholar Header Area */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 'clamp(40px, 10vw, 80px)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}
        >
          <div style={{ flex: '1 1 auto', minWidth: '280px' }}>
            <div className="glass-v2" style={{ display: 'inline-flex', padding: '6px 16px', borderRadius: '40px', color: 'var(--fluid-primary)', fontWeight: 900, fontSize: '0.75rem', marginBottom: '16px', border: '1px solid var(--fluid-primary)' }}>
              CORE_SCHOLAR_ENVIRONMENT
            </div>
            <h1 className="title-display" style={{ fontSize: 'var(--h1-size)' }}>Progress <span className="text-fluid">Omni</span></h1>
            <p style={{ color: 'var(--ink-700)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 600, marginTop: '12px' }}>Architecting your cognitive path through verified assessment protocols.</p>
          </div>
          
          <div className="luxury-card" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
            <div style={styles.statusDot}></div>
            <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--ink-900)' }}>NODE_ONLINE</span>
          </div>
        </motion.div>

        {/* Global Intelligence Scorecard */}
        <section style={{ marginBottom: 'clamp(60px, 12vw, 100px)' }}>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(20px, 4vw, 32px)' }}
          >
            {/* Hero Intelligence Card */}
            <motion.div variants={cardVariants} className="luxury-card" style={{ gridColumn: 'span 1', background: 'var(--ink-900)', color: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <h2 style={{ color: 'white', fontSize: 'clamp(1.8rem, 5vw, 2.4rem)', marginBottom: '8px' }}>Global Performance</h2>
                  <p style={{ opacity: 0.5, fontWeight: 700, fontSize: '0.9rem', marginBottom: '40px' }}>CROSS-DOMAIN MASTERY ARCHITECTURE</p>
                  
                  <div style={{ display: 'flex', gap: 'clamp(30px, 8vw, 60px)', flexWrap: 'wrap' }}>
                    <div style={styles.statUnit}>
                      <div style={styles.statLabel}>INTEL_MODULES</div>
                      <div style={styles.statValue}>{profile?.completedQuizzes || 0}</div>
                    </div>
                    <div style={styles.statUnit}>
                      <div style={styles.statLabel}>RANK_POSITION</div>
                      <div style={styles.statValue}>#--</div>
                    </div>
                    <div style={styles.statUnit}>
                      <div style={styles.statLabel}>ACCURACY_INDEX</div>
                      <div style={styles.statValue}>{profile?.reliability || 100}<span style={{ fontSize: '1rem', opacity: 0.4 }}>%</span></div>
                    </div>
                  </div>
                </div>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  style={{ ...styles.brainWrapper, flexShrink: 0 }}
                >
                  <Brain size={120} opacity={0.08} />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Cognitive Analytic Stream */}
        <section style={{ marginBottom: 'clamp(60px, 12vw, 100px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 'clamp(40px, 8vw, 80px)' }}>
            
            {/* Growth Graph */}
            {!loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: 'max(24px, 5vw)', flexWrap: 'wrap' }}>
                  <h2 style={{ fontSize: 'var(--h2-size)', fontWeight: 900 }}>Cognitive Growth Vector</h2>
                  <div style={{ flex: 1, minWidth: '100px', height: '1px', background: 'rgba(0,0,0,0.05)' }}></div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--ink-400)', letterSpacing: '0.1em' }}>NEURAL_GROWTH_METRICS</div>
                </div>
                
                <div className="luxury-card glass-v2" style={{ padding: 'clamp(24px, 8vw, 60px)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', height: '300px' }}>
                    {growthData.map((d, i) => (
                      <div key={i} style={{ flex: 1, position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end' }}>
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${d.percentage}%` }}
                          transition={{ delay: i * 0.05, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                          style={{ 
                            width: '100%', 
                            background: 'linear-gradient(to top, var(--fluid-primary), var(--fluid-secondary))',
                            borderRadius: '8px 8px 0 0',
                            opacity: 0.3 + (i / growthData.length) * 0.7,
                            position: 'relative',
                            zIndex: 2
                          }}
                        >
                          <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', fontWeight: 900 }}>{d.percentage}%</div>
                        </motion.div>
                        <div style={{ position: 'absolute', bottom: '-24px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.6rem', fontWeight: 800, color: 'var(--ink-400)', whiteSpace: 'nowrap' }}>T_{i+1}</div>
                      </div>
                    ))}
                    {growthData.length === 0 && (
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-400)', fontWeight: 800 }}>
                        INSUFFICIENT_DATA_FOR_NEURAL_MAPPING
                      </div>
                    )}
                  </div>
                  <div style={{ position: 'absolute', inset: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: 0.05, pointerEvents: 'none' }}>
                    {[1,2,3,4].map(l => <div key={l} style={{ height: '1px', background: 'black', width: '100%' }} />)}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Operations Center */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: 'max(24px, 5vw)', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: 'var(--h2-size)', fontWeight: 900 }}>Intelligence Nodes</h2>
                <div style={{ flex: 1, minWidth: '100px', height: '1px', background: 'rgba(0,0,0,0.05)' }}></div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '20px' }}>
                <div className="luxury-card" style={{ textAlign: 'center', padding: '24px' }}>
                  <Zap size={28} color="var(--fluid-primary)" style={{ marginBottom: '12px' }} />
                  <div style={{ fontSize: '1.6rem', fontWeight: 900 }}>{profile?.xp || 0}</div>
                  <div style={{ color: 'var(--ink-700)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em' }}>TOTAL XP</div>
                </div>
                <div className="luxury-card" style={{ textAlign: 'center', padding: '24px' }}>
                  <Activity size={28} color="var(--fluid-secondary)" style={{ marginBottom: '12px' }} />
                  <div style={{ fontSize: '1.6rem', fontWeight: 900 }}>{profile?.reliability || 100}%</div>
                  <div style={{ color: 'var(--ink-700)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em' }}>RELIABILITY</div>
                </div>
                <div className="luxury-card" style={{ gridColumn: 'span 1', background: 'linear-gradient(135deg, var(--fluid-primary), #4f46e5)', color: 'white', position: 'relative', overflow: 'hidden' }}>
                  <Zap size={80} style={{ position: 'absolute', bottom: '-15px', right: '-15px', opacity: 0.15 }} />
                  <div style={{ position: 'relative', zIndex: 1, padding: '12px' }}>
                    <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '8px' }}>Lightning Pulse</h4>
                    <button className="btn-elite" style={{ background: 'white', color: 'var(--fluid-primary)', padding: '8px 16px', fontSize: '0.75rem', width: '100%', justifyContent: 'center' }}>Init Pulse</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Institutional History */}
        <section style={{ marginBottom: 'clamp(60px, 12vw, 100px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: 'max(24px, 5vw)', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: 'var(--h2-size)', fontWeight: 900 }}>Institutional History</h2>
            <div style={{ flex: 1, minWidth: '100px', height: '1px', background: 'rgba(0,0,0,0.05)' }}></div>
            <Link to="/profile" style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--fluid-primary)', textDecoration: 'none', whiteSpace: 'nowrap' }}>VIEW_FULL_LEDGER <ArrowRight size={14} /></Link>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '20px' }}>
            {history.length > 0 ? history.map((res) => (
              <motion.div key={res._id} variants={cardVariants} className="luxury-card glass-v2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 900, color: 'var(--ink-400)', letterSpacing: '0.1em', marginBottom: '4px' }}>{res.quiz?.category?.toUpperCase()}</div>
                  <h4 style={{ fontSize: '1.1rem' }}>{res.quiz?.title}</h4>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: res.percentage >= 80 ? '#10b981' : 'var(--ink-900)' }}>{res.percentage}%</div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 800, opacity: 0.5 }}>SUCCESS_INDEX</div>
                </div>
              </motion.div>
            )) : (
              <div className="luxury-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', background: '#f8fafc' }}>
                <p style={{ color: 'var(--ink-500)', fontWeight: 700 }}>No assessment history detected.</p>
              </div>
            )}
          </div>
        </section>

        {/* Module Inventory */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: 'max(24px, 5vw)', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: 'var(--h2-size)', fontWeight: 900 }}>Module Inventory</h2>
            <div style={{ flex: 1, minWidth: '100px', height: '1px', background: 'rgba(0,0,0,0.05)' }}></div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button style={styles.filterBtnActive}>Active Tiers</button>
              <button style={styles.filterBtn}>Archived</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))', gap: '32px' }}>
            {loading ? (
              [1, 2, 3].map(i => <div key={i} className="luxury-card animate-pulse" style={{ height: '240px' }}></div>)
            ) : quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <motion.div key={quiz._id} variants={cardVariants} whileHover={{ scale: 1.02 }} className="luxury-card" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <div style={styles.modBadge}>MOD_{quiz._id.substring(quiz._id.length-4).toUpperCase()}</div>
                    <div style={styles.catIcon}><Terminal size={18} /></div>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{quiz.title}</h3>
                  <p style={{ color: 'var(--ink-700)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '32px', minHeight: '60px' }}>Verified institutional assessment focused on core heuristic mastery.</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '20px', borderTop: '1px solid rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <div style={styles.metaInfo}><Clock size={14} /> 15M</div>
                      <div style={styles.metaInfo}><BookOpen size={14} /> {quiz.questions.length} Qs</div>
                    </div>
                    <Link to={`/quiz/${quiz._id}`} className="btn-elite" style={{ padding: '8px 20px', fontSize: '0.8rem' }}>INITIALIZE <ArrowRight size={14} /></Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="luxury-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px' }}>
                <Layout size={60} style={{ opacity: 0.1, marginBottom: '24px' }} />
                <h3 style={{ fontSize: '1.6rem' }}>Inventory Null.</h3>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const styles = {
  statusDot: { width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 15px #10b981', animation: 'pulse 1.5s infinite' },
  statUnit: { display: 'flex', flexDirection: 'column', gap: '8px' },
  statLabel: { fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.15em', color: '#6366f1', opacity: 0.8 },
  statValue: { fontSize: '2.2rem', fontWeight: 900 },
  brainWrapper: { padding: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  filterBtnActive: { padding: '8px 20px', borderRadius: '50px', background: 'var(--ink-900)', color: 'white', fontWeight: 900, fontSize: '0.75rem', border: 'none', cursor: 'pointer' },
  filterBtn: { padding: '8px 20px', borderRadius: '50px', background: 'rgba(0,0,0,0.03)', color: 'var(--ink-700)', fontWeight: 900, fontSize: '0.75rem', border: 'none', cursor: 'pointer' },
  modBadge: { fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.15em', color: 'var(--fluid-primary)', background: 'rgba(99, 102, 241, 0.08)', padding: '5px 12px', borderRadius: '50px' },
  catIcon: { width: '36px', height: '36px', borderRadius: '8px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-700)' },
  metaInfo: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 800, color: 'var(--ink-700)' }
};

export default StudentHome;
