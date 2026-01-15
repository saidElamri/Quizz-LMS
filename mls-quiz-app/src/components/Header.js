import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from './EliteToast';
import { LogOut, User, Settings, Bell, Menu, X, Brain, ChevronDown, Command, Activity, ArrowRight, Sparkles } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, role, logout } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isMenuOpen]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/alerts', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        setAlerts(data);
        setUnreadCount(data.filter(a => !a.isRead).length);
      } catch (err) {
        console.error('ALERT_FAILURE:', err);
      }
    };
    if (user?.token) {
        fetchAlerts();
        const interval = setInterval(fetchAlerts, 30000); // Polling every 30s
        return () => clearInterval(interval);
    }
  }, [user]);

  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/alerts/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setAlerts(alerts.map(a => a._id === id ? { ...a, isRead: true } : a));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('ACK_FAILURE:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await Promise.all(alerts.filter(a => !a.isRead).map(a => 
        fetch(`http://localhost:3001/api/alerts/${a._id}/read`, {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${user.token}` }
        })
      ));
      setAlerts(alerts.map(a => ({ ...a, isRead: true })));
      setUnreadCount(0);
      addToast('System Updated', 'All protocols acknowledged.', 'info');
    } catch (err) {
      console.error('ACK_ALL_FAILURE:', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Terminal', path: role === 'teacher' ? '/teacher-home' : '/student-home' },
    { name: 'Assessments', path: '/quiz' },
    { name: 'Global Intel', path: '/leaderboard' },
    { name: 'Research Lab', path: '/resources' },
  ];

  const userLabel = user ? (role === 'teacher' ? 'FACULTY CORE' : 'SCHOLAR NODE') : '';

  const mobileNavVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: 'spring', 
        damping: 30, 
        stiffness: 300,
        staggerChildren: 0.08
      }
    },
    exit: { 
      opacity: 0, 
      x: '100%',
      transition: { duration: 0.3, ease: 'easeIn' }
    }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <header 
      className={`unified-command ${scrolled ? 'scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - var(--container-padding))',
        maxWidth: '1400px',
        zIndex: 1000,
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div className="glass-v2" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: scrolled ? '12px 24px' : '16px 32px',
        borderRadius: '24px',
        boxShadow: scrolled ? '0 20px 40px -10px rgba(0,0,0,0.1)' : '0 4px 6px -1px rgba(0,0,0,0.02)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Brand Core */}
        <Link to="/" style={styles.brand}>
          <div style={styles.brandIcon}>
            <Brain size={22} color="white" strokeWidth={2.5} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={styles.brandName}>LAB_MLS</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={styles.pulse}></div>
              <span style={styles.brandStatus}>CORE_v2.4</span>
            </div>
          </div>
        </Link>

        {/* System Navigation - Only for Authenticated Users */}
        {user && (
          <nav className="nav-elite">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link-elite ${isActive ? 'active' : ''}`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="nav-bg"
                      style={styles.navActiveIndicator}
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  <span style={{ position: 'relative', zIndex: 1 }}>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        )}

        {/* User Workspace / Guest Actions */}
        {user ? (
          <div className="workspace-actions">
            <div style={styles.statusGroup}>
              <Activity size={16} color="var(--fluid-secondary)" />
              <span style={styles.statusText}>ENCRYPTED</span>
            </div>

            {/* Notification Center */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => { setIsAlertsOpen(!isAlertsOpen); setIsProfileOpen(false); }}
                style={{ ...styles.profileToggle, padding: '8px' }}
              >
                <div style={{ position: 'relative' }}>
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={styles.alertCount}
                    >
                      {unreadCount}
                    </motion.div>
                  )}
                </div>
              </button>

              <AnimatePresence>
                {isAlertsOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="glass-v2"
                    style={styles.alertDropdown}
                  >
                    <div style={styles.dropdownHeader}>
                        <div style={{ fontWeight: 800, fontSize: '0.85rem' }}>TACTICAL_ALERTS</div>
                        {unreadCount > 0 && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); markAllAsRead(); }}
                                style={{ ...styles.statusText, background: 'rgba(255,255,255,0.1)', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                ACK_ALL_v4
                            </button>
                        )}
                    </div>
                    <div style={{ maxHeight: '350px', overflowY: 'auto' }} className="no-scrollbar">
                        {alerts.length > 0 ? alerts.map(alert => (
                            <div 
                                key={alert._id} 
                                onClick={() => markAsRead(alert._id)}
                                style={{ 
                                    ...styles.alertItem, 
                                    background: alert.isRead ? 'transparent' : 'rgba(99, 102, 241, 0.05)'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span style={styles.alertTitle}>{alert.title}</span>
                                    <span style={styles.alertTime}>{new Date(alert.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                </div>
                                <p style={styles.alertMsg}>{alert.message}</p>
                            </div>
                        )) : (
                            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--ink-400)', fontSize: '0.8rem', fontWeight: 700 }}>
                                NO_PENDING_NOTIFICATIONS
                            </div>
                        )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)} 
                style={styles.profileToggle}
              >
                <div style={styles.avatarMini}>
                  <User size={16} color="white" />
                </div>
                <span style={styles.userLabel}>{userLabel}</span>
                <ChevronDown size={14} style={{ opacity: 0.5, transform: isProfileOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="glass-v2"
                    style={styles.dropdown}
                  >
                    <div style={styles.dropdownHeader}>
                      <div style={styles.avatarLarge}><User size={24} color="white" /></div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{user?.username || 'Verified User'}</div>
                         <div style={{ fontSize: '0.75rem', opacity: 0.6, fontWeight: 700 }}>IDENTITY#{user?._id ? user._id.substring(user._id.length-4) : '7742'}</div>
                      </div>
                    </div>
                    <div style={{ padding: '8px' }}>
                      <Link to="/profile" className="dropdown-item-elite"><User size={16} /> Identity Matrix</Link>
                      <Link to="/settings" className="dropdown-item-elite"><Settings size={16} /> System Prefs</Link>
                      <hr style={styles.divider} />
                      <button onClick={handleLogout} className="dropdown-item-elite logout-btn">
                        <LogOut size={16} /> Terminate Session
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link to="/login" style={{ color: 'var(--ink-700)', fontWeight: 800, textDecoration: 'none', fontSize: '0.9rem' }}>Secure Login</Link>
            <Link to="/register" className="btn-elite" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>Get Started</Link>
          </div>
        )}

        {/* Mobile Command Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="mobile-burger"
          style={styles.mobileBurger}
        >
          {isMenuOpen ? <X size={22} /> : <Command size={22} />}
        </button>
      </div>

      {/* Mobile Command Interface - Cinematic Full-screen Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            variants={mobileNavVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={styles.mobileOverlay}
          >
            <div style={styles.mobileOverlayHeader}>
              <Link to="/" onClick={() => setIsMenuOpen(false)} style={styles.brand}>
                <div style={styles.brandIcon}><Brain size={22} color="white" /></div>
                <span style={{ ...styles.brandName, color: 'white' }}>LAB_MLS</span>
              </Link>
              <button onClick={() => setIsMenuOpen(false)} style={styles.mobileCloseBtn}>
                <X size={28} />
              </button>
            </div>

            <nav style={styles.mobileNavLinks} className="no-scrollbar">
              {user ? (
                <>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.2em', marginBottom: '20px' }}>SYSTEM_MANIFEST</div>
                  {navLinks.map((link, idx) => (
                    <motion.div key={link.path} variants={mobileItemVariants}>
                      <Link 
                        to={link.path} 
                        onClick={() => setIsMenuOpen(false)}
                        style={styles.mobileMenuLink}
                      >
                        <span style={styles.mobileMenuNum}>0{idx + 1}</span>
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  
                  <motion.div variants={mobileItemVariants} style={{ marginTop: 'auto', paddingTop: '40px' }}>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.2em', marginBottom: '20px' }}>IDENTITY_GATE</div>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)} style={styles.mobileMenuLinkSecondary}><User size={20} /> Identity Matrix</Link>
                    <Link to="/settings" onClick={() => setIsMenuOpen(false)} style={styles.mobileMenuLinkSecondary}><Settings size={20} /> System Prefs</Link>
                    <button onClick={handleLogout} style={styles.mobileLogoutElite}>
                      <LogOut size={20} /> TERMINATE_SESSION
                    </button>
                  </motion.div>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '40px' }}>
                  <motion.div variants={mobileItemVariants}>
                     <Link to="/login" onClick={() => setIsMenuOpen(false)} style={styles.mobileMenuLinkLarge}>SECURE_LOGIN</Link>
                  </motion.div>
                  <motion.div variants={mobileItemVariants}>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)} style={styles.mobileMenuLinkLargeAccent}>
                      <Sparkles size={24} /> INITIALIZE_IDENTITY <ArrowRight size={28} />
                    </Link>
                  </motion.div>
                </div>
              )}
            </nav>

            <div style={styles.mobileOverlayFooter}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <Activity size={14} color="var(--fluid-primary)" />
                 <span style={{ fontSize: '0.65rem', fontWeight: 900, opacity: 0.5, letterSpacing: '0.1em' }}>ENCRYPTED_CORE_STREAMS_ACTIVE</span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const styles = {
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
  },
  brandIcon: {
    background: 'var(--ink-900)',
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 20px -5px rgba(0,0,0,0.2)',
  },
  brandName: {
    fontSize: '1.2rem',
    fontWeight: 900,
    color: 'var(--ink-900)',
    letterSpacing: '0.05em',
  },
  brandStatus: {
    fontSize: '0.6rem',
    fontWeight: 800,
    color: 'var(--fluid-primary)',
    letterSpacing: '0.1em',
  },
  pulse: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: 'var(--fluid-primary)',
    animation: 'pulse 1.5s infinite',
  },
  navActiveIndicator: {
    position: 'absolute',
    inset: 0,
    background: 'var(--ink-900)',
    borderRadius: '50px',
  },
  statusGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginRight: '12px',
    padding: '6px 14px',
    background: 'rgba(6, 182, 212, 0.05)',
    borderRadius: '10px',
  },
  statusText: {
    fontSize: '0.65rem',
    fontWeight: 800,
    color: 'var(--fluid-secondary)',
    letterSpacing: '0.1em',
  },
  profileToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(0,0,0,0.03)',
    border: 'none',
    padding: '4px 14px 4px 4px',
    borderRadius: '40px',
    cursor: 'pointer',
    color: 'var(--ink-900)',
    fontWeight: 800,
    fontSize: '0.75rem',
    letterSpacing: '0.02em',
  },
  avatarMini: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: 'var(--ink-900)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 12px)',
    right: 0,
    width: '240px',
    padding: '0',
    overflow: 'hidden',
    boxShadow: '0 30px 60px -20px rgba(0,0,0,0.15)',
    border: '1px solid rgba(255,255,255,0.4)',
  },
  alertDropdown: {
    position: 'absolute',
    top: 'calc(100% + 12px)',
    right: 0,
    width: '320px',
    padding: '0',
    overflow: 'hidden',
    boxShadow: '0 30px 60px -20px rgba(0,0,0,0.15)',
    border: '1px solid rgba(255,255,255,0.4)',
    zIndex: 100,
  },
  alertCount: {
    position: 'absolute',
    top: '-6px',
    right: '-6px',
    background: '#ef4444',
    color: 'white',
    fontSize: '0.6rem',
    fontWeight: 900,
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid white'
  },
  alertItem: {
    padding: '16px 20px',
    borderBottom: '1px solid rgba(0,0,0,0.03)',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  alertTitle: {
    fontSize: '0.75rem',
    fontWeight: 900,
    color: 'var(--ink-900)',
    letterSpacing: '0.05em',
  },
  alertTime: {
    fontSize: '0.6rem',
    color: 'var(--ink-400)',
    fontWeight: 800,
  },
  alertMsg: {
    fontSize: '0.8rem',
    color: 'var(--ink-600)',
    fontWeight: 500,
    margin: 0,
    lineHeight: 1.4,
  },
  dropdownHeader: {
    padding: '20px',
    background: 'var(--ink-900)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatarLarge: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    background: 'var(--fluid-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid rgba(0,0,0,0.05)',
    margin: '8px 12px',
  },
  mobileBurger: {
    background: 'rgba(0,0,0,0.03)',
    border: 'none',
    padding: '10px',
    borderRadius: '12px',
    cursor: 'pointer',
  },
  mobileOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'var(--ink-900)',
    zIndex: 2000,
    padding: 'clamp(20px, 5vw, 40px)',
    display: 'flex',
    flexDirection: 'column',
  },
  mobileOverlayHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'clamp(40px, 8vw, 80px)',
    flexShrink: 0,
  },
  mobileCloseBtn: {
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'background 0.2s',
  },
  mobileNavLinks: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflowY: 'auto',
  },
  mobileMenuLink: {
    fontSize: 'clamp(2rem, 6vw, 3rem)',
    fontWeight: 900,
    color: 'white',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'baseline',
    gap: '24px',
    marginBottom: '20px',
    lineHeight: 1,
  },
  mobileMenuNum: {
    fontSize: '0.9rem',
    color: 'var(--fluid-primary)',
    fontFamily: 'monospace',
  },
  mobileMenuLinkSecondary: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.7)',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
  },
  mobileLogoutElite: {
    background: 'rgba(244, 63, 94, 0.1)',
    color: 'var(--fluid-accent)',
    border: '1px solid rgba(244, 63, 94, 0.2)',
    padding: '16px',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontWeight: 900,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '20px',
    width: '100%',
    justifyContent: 'center',
  },
  mobileMenuLinkLarge: {
    fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
    fontWeight: 800,
    color: 'white',
    textDecoration: 'none',
  },
  mobileMenuLinkLargeAccent: {
    fontSize: 'clamp(1.5rem, 5vw, 2rem)',
    fontWeight: 900,
    color: 'var(--fluid-primary)',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  mobileOverlayFooter: {
    marginTop: 'auto',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    flexShrink: 0,
  }
};

export default Header;
