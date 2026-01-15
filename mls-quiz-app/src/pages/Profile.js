import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Calendar, LogOut, Award, Zap, Activity, Clock, ChevronRight, Binary } from 'lucide-react';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const { logout, role, user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdentityData = async () => {
      try {
        const [profRes, histRes] = await Promise.all([
          axios.get('http://localhost:3001/api/me', {
            headers: { Authorization: `Bearer ${authUser.token}` }
          }),
          axios.get('http://localhost:3001/api/quizzes/my-results', {
            headers: { Authorization: `Bearer ${authUser.token}` }
          })
        ]);
        setProfile(profRes.data);
        setHistory(histRes.data);
      } catch (error) {
        console.error('Identity Sync Error:', error);
      } finally {
        setLoading(false);
      }
    };
    if (authUser?.token) fetchIdentityData();
  }, [authUser]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const institutionalRole = role === 'teacher' ? 'FACULTY_CORE' : 'SCHOLAR_NODE';
  const roleColor = role === 'teacher' ? 'var(--fluid-accent)' : 'var(--fluid-primary)';

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <Header />
      <div style={{ padding: '160px 0', textAlign: 'center' }}>
        <Activity size={48} className="animate-pulse" color="var(--fluid-primary)" />
        <p style={{ marginTop: '24px', fontWeight: 800, color: 'var(--ink-700)' }}>SYNCING_IDENTITY_PORTFOLIO...</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fcfcfd' }}>
      <Header />
      <main className="elite-container" style={{ flex: 1, padding: 'clamp(100px, 15vw, 160px) 0 80px' }}>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(32px, 8vw, 60px)' }}>
            
            {/* Identity Showcase Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="luxury-card glass-v2" 
              style={{ padding: 'clamp(24px, 8vw, 60px)', display: 'flex', gap: 'clamp(24px, 8vw, 60px)', alignItems: 'center', flexWrap: 'wrap' }}
            >
              <div style={styles.avatarContainer}>
                <div style={{ ...styles.avatarGlow, background: roleColor }}></div>
                <div style={{ ...styles.avatarMain, background: `linear-gradient(135deg, ${roleColor} 0%, #0f172a 100%)` }}>
                  <User size={60} color="white" strokeWidth={1} />
                </div>
              </div>

              <div style={{ flex: '1 1 300px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <h1 className="title-display" style={{ fontSize: 'var(--h2-size)', margin: 0 }}>{profile?.username}</h1>
                  <div className="glass-v2" style={{ ...styles.roleBadge, color: roleColor, borderColor: roleColor }}>
                    {institutionalRole}
                  </div>
                </div>
                <p style={{ color: 'var(--ink-700)', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', fontWeight: 600, margin: '0 0 32px 0' }}>
                  Institutional Identity #ID-{profile?._id ? profile._id.substring(profile._id.length - 6).toUpperCase() : 'REFRESHING...'}
                </p>
                
                <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 40px)', flexWrap: 'wrap' }}>
                  <div style={styles.infoMeta}>
                    <Shield size={18} color={roleColor} /> 
                    <div>
                      <div style={styles.metaLabel}>ACCESS_LEVEL</div>
                      <div style={styles.metaValue}>V04_ADMIN</div>
                    </div>
                  </div>
                  <div style={styles.infoMeta}>
                    <Calendar size={18} color={roleColor} /> 
                    <div>
                      <div style={styles.metaLabel}>COMMENCEMENT</div>
                      <div style={styles.metaValue}>JAN_2026</div>
                    </div>
                  </div>
                  <div style={styles.infoMeta}>
                    <Binary size={18} color={roleColor} /> 
                    <div>
                      <div style={styles.metaLabel}>NODE_STATUS</div>
                      <div style={styles.metaValue}>ENCRYPTED</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Performance Ledger & Scholarly Ledger Split */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))', gap: 'clamp(32px, 8vw, 60px)' }}>
              
              {/* Left Column: Performance */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '8px' }}>Global Performance</h2>
                
                <div className="luxury-card" style={styles.statBox}>
                  <Zap size={24} color="var(--fluid-primary)" />
                  <div>
                    <div style={styles.statLabel}>TOTAL_ACCUMULATED_XP</div>
                    <div style={styles.statValue}>{profile?.xp || 0}</div>
                  </div>
                </div>

                <div className="luxury-card" style={styles.statBox}>
                  <Activity size={24} color="var(--fluid-secondary)" />
                  <div>
                    <div style={styles.statLabel}>RELIABILITY_INDEX</div>
                    <div style={styles.statValue}>{profile?.reliability || 100}%</div>
                  </div>
                </div>

                <div className="luxury-card" style={styles.statBox}>
                  <Award size={24} color="var(--fluid-accent)" />
                  <div>
                    <div style={styles.statLabel}>VALIDATED_CREDENTIALS</div>
                    <div style={styles.statValue}>{profile?.badges?.length || 0}</div>
                  </div>
                </div>

                <button onClick={handleLogout} className="btn-elite" style={{ background: 'white', color: '#ef4444', border: '1px solid #fee2e2', boxShadow: 'none', marginTop: '20px', justifyContent: 'center' }}>
                  <LogOut size={20} /> TERMINATE_SESSION
                </button>
              </div>

              {/* Right Column: Ledger */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                   <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Scholarly Ledger</h2>
                   <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--ink-400)', letterSpacing: '0.1em' }}>LAST_SESSIONS_v2.1</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {history.length > 0 ? history.map((res, i) => (
                    <motion.div 
                     key={res._id}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.05 }}
                     className="luxury-card glass-v2"
                     style={styles.historyCard}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: '1 1 200px' }}>
                         <div style={styles.categoryIcon}>
                           <Binary size={18} />
                         </div>
                         <div>
                           <h4 style={{ fontSize: '1rem', marginBottom: '2px' }}>{res.quiz?.title}</h4>
                           <span style={{ fontSize: '0.65rem', color: 'var(--ink-500)', fontWeight: 800 }}>{res.quiz?.category}</span>
                         </div>
                      </div>
                       <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 40px)', alignItems: 'center', flexWrap: 'wrap' }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={styles.resLabel}>SCORE</div>
                            <div style={styles.resVal}>{res.score}/{res.totalQuestions}</div>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <div style={styles.resLabel}>MASTERY</div>
                            <div style={{ ...styles.resVal, color: res.percentage >= 80 ? '#10b981' : 'var(--ink-900)' }}>{res.percentage}%</div>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <div style={styles.resLabel}>DATE</div>
                            <div style={styles.resDate}>{new Date(res.completedAt).toLocaleDateString()}</div>
                          </div>
                       </div>
                       {/* Mastery Sparkline */}
                       <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'rgba(0,0,0,0.03)' }}>
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${res.percentage}%` }}
                           style={{ 
                             height: '100%', 
                             background: res.percentage >= 80 ? '#10b981' : 'var(--fluid-primary)',
                           }}
                         />
                       </div>
                    </motion.div>
                  )) : (
                     <div className="luxury-card" style={{ padding: '60px', textAlign: 'center', background: 'transparent', border: '2px dashed #e2e8f0' }}>
                       <p style={{ color: 'var(--ink-500)', fontWeight: 700 }}>No assessment records detected.</p>
                     </div>
                  )}
                </div>

                {/* Institutional Medals */}
                {profile?.badges?.length > 0 && (
                  <div style={{ marginTop: '48px' }}>
                     <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '24px' }}>Institutional Medals</h2>
                     <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                       {profile.badges.map((badge, i) => (
                         <div key={i} className="glass-v2" style={styles.badgeUI}>
                           <Award size={14} /> {badge}
                         </div>
                       ))}
                     </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const styles = {
  avatarContainer: {
    position: 'relative',
    width: 'clamp(120px, 20vw, 160px)',
    height: 'clamp(120px, 20vw, 160px)',
  },
  avatarMain: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'min(40px, 25%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
  },
  avatarGlow: {
    position: 'absolute',
    inset: '-10%',
    borderRadius: '50px',
    filter: 'blur(30px)',
    opacity: 0.15,
    zIndex: 1,
  },
  roleBadge: {
    padding: '4px 12px',
    borderRadius: '40px',
    fontWeight: 900,
    fontSize: '0.65rem',
    letterSpacing: '0.1em',
    border: '1px solid',
  },
  infoMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  metaLabel: {
    fontSize: '0.55rem',
    fontWeight: 900,
    letterSpacing: '0.1em',
    color: 'var(--ink-400)',
    marginBottom: '1px'
  },
  metaValue: {
    fontSize: '0.8rem',
    fontWeight: 800,
    color: 'var(--ink-900)'
  },
  statBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '24px',
  },
  statLabel: {
    fontSize: '0.6rem',
    fontWeight: 900,
    letterSpacing: '0.1em',
    color: 'var(--ink-500)',
    marginBottom: '2px'
  },
  statValue: {
    fontSize: '1.6rem',
    fontWeight: 900,
    color: 'var(--ink-900)'
  },
  historyCard: {
    padding: '20px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
    flexWrap: 'wrap',
    position: 'relative',
    overflow: 'hidden'
  },
  categoryIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--fluid-primary)',
    flexShrink: 0
  },
  resLabel: {
    fontSize: '0.55rem',
    fontWeight: 900,
    color: 'var(--ink-400)',
    marginBottom: '2px'
  },
  resVal: {
    fontSize: '1rem',
    fontWeight: 900,
  },
  resDate: {
    fontSize: '0.8rem',
    fontWeight: 700,
    color: 'var(--ink-600)'
  },
  badgeUI: {
    padding: '10px 18px',
    borderRadius: '10px',
    fontSize: '0.75rem',
    fontWeight: 800,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'white',
    color: 'var(--ink-900)',
    border: '1px solid rgba(0,0,0,0.05)'
  }
};

export default Profile;
