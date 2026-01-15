import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Briefcase, ArrowLeft, Brain, Sparkles, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useToast } from '../components/EliteToast';
import { motion } from 'framer-motion';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (!email.includes('@')) {
      setError('Invalid email address.');
      addToast('Validation Error', 'Please enter a valid email.', 'error');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      addToast('Security Warning', 'Password strength below requirements.', 'error');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role }),
      });

      if (response.ok) {
        addToast('Identity Created', 'Your scholarly profile has been initialized.', 'success');
        navigate('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Initialization Fault');
        addToast('Initialization Fault', errorData.error || 'Could not create identity.', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('System Connection Lost');
      addToast('System Error', 'Neural link failed. Is the core operational?', 'error');
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
          <h1 className="title-display" style={{ fontSize: 'clamp(1.8rem, 7vw, 2.5rem)' }}>Identity <span className="text-fluid">Creation</span></h1>
          <p style={{ color: 'var(--ink-600)', fontSize: '0.9rem', fontWeight: 600 }}>Initialize your academic profile to begin the journey.</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: '#fef2f2',
              color: '#991b1b',
              padding: '12px 16px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
              fontSize: '0.85rem',
              border: '1px solid #fee2e2',
              fontWeight: 600
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="bespoke-form" style={{ gap: '16px' }}>
          <div className="input-group-bespoke">
            <User className="input-icon" size={18} />
            <input
              type="text"
              placeholder="Username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ paddingLeft: '48px', height: '52px' }}
            />
          </div>

          <div className="input-group-bespoke">
            <Mail className="input-icon" size={18} />
            <input
              type="email"
              placeholder="Primary Email"
              autoComplete="email"
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
              placeholder="Secure Password"
              autoComplete="new-password"
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

          <div className="role-selector-container">
            <label style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: '8px' }}>INTELLECTUAL_ROLE</label>
            <div className="role-options" style={{ gap: '12px' }}>
              <button 
                type="button" 
                className={`role-btn ${role === 'student' ? 'active' : ''}`}
                onClick={() => setRole('student')}
                style={{ padding: '12px', fontSize: '0.9rem' }}
              >
                <User size={16} /> Student
              </button>
              <button 
                type="button" 
                className={`role-btn ${role === 'teacher' ? 'active' : ''}`}
                onClick={() => setRole('teacher')}
                style={{ padding: '12px', fontSize: '0.9rem' }}
              >
                <Briefcase size={16} /> Faculty
              </button>
            </div>
          </div>

          <button type="submit" className="btn-elite register-submit" disabled={loading} style={{ width: '100%', height: '52px', marginTop: '12px', justifyContent: 'center', gap: '8px' }}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} /> INITIALIZING...
              </>
            ) : (
              <>
                <UserPlus size={18} /> Finalize Creation
              </>
            )}
          </button>
        </form>

        <div className="registration-footer" style={{ marginTop: '32px' }}>
          <span style={{ color: 'var(--ink-600)', fontSize: '0.85rem', fontWeight: 600 }}>Existing entity identified?</span>
          <Link to="/login" className="login-link" style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--fluid-primary)' }}>Log In Session</Link>
        </div>
      </motion.div>

      <div className="registration-aside">
        <div className="aside-content">
          <div className="aside-badge" style={{ color: 'var(--fluid-primary)', border: '1px solid var(--fluid-primary)', background: 'rgba(99, 102, 241, 0.05)' }}>
            <Sparkles size={16} /> INSTITUTIONAL ACCESS
          </div>
          <h2 className="title-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 3rem)' }}>Join the Knowledge <br /> <span className="text-fluid">Synapse</span></h2>
          <p style={{ color: 'var(--ink-700)', fontWeight: 600, fontSize: '1.1rem' }}>
            By joining MLS Quiz Lab, you gain access to an elite ecosystem of interactive assessment protocols and collaborative learning modules.
          </p>
          <div className="feature-list">
            <div className="f-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--ink-900)' }}>
              <div style={{ color: 'var(--fluid-primary)' }}>✓</div> Real-time Competency Analytics
            </div>
            <div className="f-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--ink-900)' }}>
              <div style={{ color: 'var(--fluid-primary)' }}>✓</div> Global Ranking Integration
            </div>
            <div className="f-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--ink-900)' }}>
              <div style={{ color: 'var(--fluid-primary)' }}>✓</div> Verified Faculty Resources
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
