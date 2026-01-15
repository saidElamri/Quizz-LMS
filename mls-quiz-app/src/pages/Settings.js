import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Settings as SettingsIcon, User, Shield, Bell, Eye, Database, Lock, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function Settings() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [notifications, setNotifications] = React.useState(true);
  const [quizTimer, setQuizTimer] = React.useState(30);
  const [loading, setLoading] = React.useState(false);
  const [profile, setProfile] = React.useState(null);
  const { user: authUser } = useAuth();

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/me', {
          headers: { Authorization: `Bearer ${authUser.token}` }
        });
        setProfile(res.data);
        setEmail(res.data.email);
      } catch (err) {
        console.error('FETCH_ERR:', err);
      }
    };
    if (authUser?.token) fetchProfile();
  }, [authUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, notifications, quizTimer }),
      });
      if (response.ok) {
        alert('SYSTEM_MSG: Configuration vectors updated successfully.');
      } else {
        alert('SYSTEM_ERR: Update sequence failed.');
      }
    } catch (error) {
      console.error('Action Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main className="elite-container" style={{ flex: 1, padding: 'clamp(100px, 15vw, 160px) 0 80px' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 'clamp(40px, 8vw, 80px)' }}
        >
          <div className="glass-v2" style={{ display: 'inline-flex', padding: '6px 16px', borderRadius: '40px', color: 'var(--fluid-primary)', fontWeight: 900, fontSize: '0.75rem', marginBottom: '24px', border: '1px solid var(--fluid-primary)' }}>
            CORE_SYSTEM_CALIBRATION
          </div>
          <h1 className="title-display" style={{ fontSize: 'var(--h1-size)' }}>System <span className="text-fluid">Configuration</span></h1>
          <p style={{ color: 'var(--ink-700)', fontSize: 'clamp(1rem, 3vw, 1.25rem)', marginTop: '16px', fontWeight: 600 }}>Calibrate your institutional experience and security parameters.</p>
        </motion.div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(32px, 8vw, 48px)' }}>
          
          {/* Account Settings Tier */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div style={styles.sectionHeader}>
              <User size={18} color="var(--fluid-primary)" />
              <h2 style={styles.sectionTitle}>Account Identity</h2>
            </div>
            <div className="luxury-card glass-v2" style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: 'var(--card-padding)' }}>
              <div style={styles.settingRow}>
                <div style={{ flex: '1 1 200px' }}>
                  <div style={styles.settingLabel}>Institutional Email</div>
                  <div style={styles.settingDesc}>Primary address for session alerts.</div>
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@institution.edu"
                  style={styles.eliteInput}
                />
              </div>
              <div style={styles.settingRow}>
                <div style={{ flex: '1 1 200px' }}>
                  <div style={styles.settingLabel}>Access Cipher</div>
                  <div style={styles.settingDesc}>Updates session security vectors.</div>
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={styles.eliteInput}
                />
              </div>
            </div>
          </motion.section>

          {/* Preferences Tier */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div style={styles.sectionHeader}>
              <SettingsIcon size={18} color="#fbbf24" />
              <h2 style={styles.sectionTitle}>Operational Preferences</h2>
            </div>
            <div className="luxury-card glass-v2" style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: 'var(--card-padding)' }}>
              <div style={styles.settingRow}>
                <div style={{ flex: '1 1 200px' }}>
                  <div style={styles.settingLabel}>Module Timer (min)</div>
                  <div style={styles.settingDesc}>Default temporal constraints.</div>
                </div>
                <input 
                  type="number" 
                  value={quizTimer}
                  onChange={(e) => setQuizTimer(e.target.value)}
                  min="10"
                  max="120"
                  style={styles.eliteInput}
                />
              </div>
              <div style={styles.settingRow}>
                <div style={{ flex: '1 1 200px' }}>
                  <div style={styles.settingLabel}>System Alerts</div>
                  <div style={styles.settingDesc}>Verified email status updates.</div>
                </div>
                <div 
                  onClick={() => setNotifications(!notifications)}
                  style={{ 
                    width: '56px', 
                    height: '28px', 
                    background: notifications ? 'var(--fluid-primary)' : 'var(--ink-200)', 
                    borderRadius: '20px', 
                    position: 'relative', 
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  <motion.div 
                    animate={{ x: notifications ? 30 : 4 }}
                    style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', top: '4px', position: 'absolute' }} 
                  />
                </div>
              </div>
            </div>
          </motion.section>

          {/* System Diagnostics Tier */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div style={styles.sectionHeader}>
              <Database size={18} color="#10b981" />
              <h2 style={styles.sectionTitle}>System Diagnostics</h2>
            </div>
            <div className="luxury-card glass-v2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '24px', padding: 'var(--card-padding)' }}>
              <div>
                <div style={styles.statLabel}>SYSTEM_UUID</div>
                <code style={{ fontSize: '0.8rem', color: 'var(--ink-700)', display: 'block', marginTop: '4px', wordBreak: 'break-all' }}>{profile?._id || 'UNKNOWN_IDENTITY_HASH'}</code>
              </div>
              <div>
                <div style={styles.statLabel}>INTERNAL_ROLE</div>
                <div style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--fluid-primary)', marginTop: '4px' }}>V04_ADMIN_{profile?.role?.toUpperCase()}</div>
              </div>
              <div>
                <div style={styles.statLabel}>DATA_INTEGRITY</div>
                <div style={{ fontSize: '1rem', fontWeight: 900, color: '#10b981', marginTop: '4px' }}>SYNCHRONIZED</div>
              </div>
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <button type="submit" className="btn-elite" disabled={loading} style={{ padding: '16px 40px', width: 'min(300px, 100%)', justifyContent: 'center' }}>
              {loading ? 'CALIBRATING...' : 'SAVE_SYSTEM_CHANGES'}
            </button>
          </motion.div>

        </form>
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '0.75rem',
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: 'var(--ink-400)',
    margin: 0,
  },
  settingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  settingLabel: {
    fontSize: '1.1rem',
    fontWeight: 800,
    color: 'var(--ink-900)',
    marginBottom: '4px',
  },
  settingDesc: {
    fontSize: '0.9rem',
    color: 'var(--ink-600)',
    fontWeight: 500,
    maxWidth: '500px',
    lineHeight: 1.5,
  },
  eliteInput: {
    padding: '10px 16px',
    borderRadius: '12px',
    border: '1px solid var(--ink-200)',
    fontSize: '0.95rem',
    fontWeight: 600,
    color: 'var(--ink-900)',
    outline: 'none',
    transition: 'all 0.2s',
    minWidth: 'min(280px, 100%)',
    background: '#fcfcfd',
  },
  statLabel: {
    fontSize: '0.6rem',
    fontWeight: 900,
    color: 'var(--ink-400)',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  }
};

export default Settings;
