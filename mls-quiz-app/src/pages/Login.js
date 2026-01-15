import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Brain, Mail, Lock, LogIn, AlertCircle, ArrowLeft, Sparkles, Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../components/EliteToast';
import './Register.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic Client-side validation
    if (!email.includes('@')) {
      setError('Please enter a valid authorized email.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email, password }),
      });

      if (response.ok) {
        const { token, role } = await response.json();
        login({ token, role });
        
        addToast('Session Initialized', `Authentication successful. Welcome back, ${role}.`, 'success');
        
        if (role === 'student') navigate('/student-home');
        else if (role === 'teacher') navigate('/teacher-home');
      } else {
        const errorText = await response.text();
        setError(errorText === 'Invalid credentials' ? 'Invalid email or password. Please try again.' : errorText);
        addToast('Access Denied', 'Verification sequence failed.', 'error');
      }
    } catch (err) {
      setError('Connection error. Is the server running?');
      addToast('System Error', 'Could not establish connection to the neural core.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-view">
      {/* Dynamic Background Elements */}
      <div className="orb orb-primary" style={{ background: 'var(--fluid-primary)' }}></div>
      <div className="orb orb-secondary" style={{ background: 'var(--fluid-secondary)' }}></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="registration-card glass-v2 luxury-card"
        style={{ background: 'white !important', padding: 'var(--card-padding)' }}
      >
        <Link to="/" className="back-link" style={{ marginBottom: '32px' }}>
          <ArrowLeft size={18} /> Exit to Home
        </Link>

        <div className="registration-header" style={{ marginBottom: '32px' }}>
          <div className="logo-icon-box" style={{ background: 'var(--ink-900)', width: '48px', height: '48px', marginBottom: '20px' }}>
            <Brain size={28} color="white" />
          </div>
          <h1 className="title-display" style={{ fontSize: 'clamp(2rem, 8vw, 2.5rem)' }}>Welcome <span className="text-fluid">Back</span></h1>
          <p style={{ color: 'var(--ink-600)', fontWeight: 600, fontSize: '0.9rem' }}>Verification Protocol_Login_v2.4</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={styles.errorBanner}
          >
            <AlertCircle size={18} />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="bespoke-form" style={{ gap: '16px' }}>
          <div className="input-group-bespoke">
            <Mail className="input-icon" size={18} />
            <input
              type="email"
              placeholder="Authorized Email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ paddingLeft: '48px', height: '52px' }}
            />
          </div>

          <div className="input-group-bespoke">
            <Lock className="input-icon" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Secure Cipher"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingLeft: '48px', height: '52px', paddingRight: '48px' }}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--ink-400)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '4px'
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button type="submit" className="btn-elite" disabled={loading} style={{ width: '100%', height: '52px', marginTop: '8px', justifyContent: 'center', gap: '8px' }}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} /> VERIFYING...
              </>
            ) : (
              <>
                INITIALIZE_SESSION <LogIn size={18} />
              </>
            )}
          </button>
        </form>

        <div className="registration-footer" style={{ marginTop: '32px' }}>
          <span style={{ color: 'var(--ink-600)', fontWeight: 600, fontSize: '0.85rem' }}>New operative?</span>
          <Link to="/register" className="login-link" style={{ color: 'var(--fluid-primary)', fontWeight: 900, fontSize: '0.85rem' }}>Create Identity</Link>
        </div>
      </motion.div>

      <div className="registration-aside">
        <div className="aside-content">
          <div className="aside-badge" style={{ color: 'var(--fluid-primary)', border: '1px solid var(--fluid-primary)', background: 'rgba(99, 102, 241, 0.05)' }}>
            <Sparkles size={16} /> SYSTEM_INTEGRITY_ACTIVE
          </div>
          <h2 className="title-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 3rem)' }}>The Knowledge <br /> <span className="text-fluid">Synapse</span></h2>
          <p style={{ color: 'var(--ink-700)', fontWeight: 600, fontSize: '1.1rem' }}>
            Secure access to the world's most advanced interactive assessment laboratory.
          </p>
          <div className="feature-list">
            <div className="f-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--ink-900)' }}>
              <div style={{ color: 'var(--fluid-primary)' }}>✓</div> High-Latency Sync Protocol
            </div>
            <div className="f-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--ink-900)' }}>
              <div style={{ color: 'var(--fluid-primary)' }}>✓</div> Neural-Path Growth Tracking
            </div>
            <div className="f-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--ink-900)' }}>
              <div style={{ color: 'var(--fluid-primary)' }}>✓</div> Unified Scholar Identity
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  errorBanner: {
    background: '#fef2f2',
    color: '#991b1b',
    padding: '12px 16px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
    fontSize: '0.9rem',
    border: '1px solid #fee2e2',
  }
};

export default Login;
