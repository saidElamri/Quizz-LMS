import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Send, Sparkles, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert('SECURE_TRANSMISSION: Your message has been routed to the administrative core.');
    setFormState({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'white' }}>
      <Header />
      
      <main className="elite-container" style={{ flex: 1, padding: 'clamp(100px, 15vw, 160px) 0 100px' }}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 80px)' }}
        >
          <div className="glass-v2" style={{ display: 'inline-flex', padding: '6px 16px', borderRadius: '40px', color: 'var(--fluid-primary)', fontWeight: 900, fontSize: '0.75rem', marginBottom: '24px', border: '1px solid var(--fluid-primary)' }}>
            COMMUNICATION_HUB
          </div>
          <h1 className="title-display" style={{ fontSize: 'var(--h1-size)' }}>Contact <span className="text-fluid">The Lab</span></h1>
          <p style={{ color: 'var(--ink-700)', fontSize: 'clamp(1rem, 3vw, 1.45rem)', marginTop: '20px', fontWeight: 600, maxWidth: '700px', margin: '20px auto 0' }}>
            Establish a high-integrity connection with our administrative and technical support vectors.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '32px' }}
        >
          {/* Contact Information Pillars */}
          <div style={{ gridColumn: 'span 1', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <motion.div variants={itemVariants} className="luxury-card glass-v2" style={{ padding: '32px' }}>
              <div style={{ padding: '12px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', color: 'var(--fluid-primary)', display: 'inline-flex', marginBottom: '20px' }}>
                <Mail size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Institutional Email</h3>
              <p style={{ color: 'var(--ink-600)', fontWeight: 500 }}>admin_core@mlslab.edu</p>
              <p style={{ color: 'var(--ink-600)', fontWeight: 500 }}>support@mlslab.edu</p>
            </motion.div>

            <motion.div variants={itemVariants} className="luxury-card glass-v2" style={{ padding: '32px' }}>
              <div style={{ padding: '12px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '12px', color: 'var(--fluid-secondary)', display: 'inline-flex', marginBottom: '20px' }}>
                <MapPin size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Global Headquarters</h3>
              <p style={{ color: 'var(--ink-600)', fontWeight: 500 }}>Neural Plaza, Suite 402</p>
              <p style={{ color: 'var(--ink-600)', fontWeight: 500 }}>Innovation District, CA</p>
            </motion.div>

            <motion.div variants={itemVariants} className="luxury-card glass-v2" style={{ padding: '32px' }}>
              <div style={{ padding: '12px', background: 'rgba(244, 63, 94, 0.1)', borderRadius: '12px', color: 'var(--fluid-accent)', display: 'inline-flex', marginBottom: '20px' }}>
                <Clock size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Operational Cycles</h3>
              <p style={{ color: 'var(--ink-600)', fontWeight: 500 }}>Mon - Fri: 08:00 - 18:00 PST</p>
              <p style={{ color: 'var(--ink-600)', fontWeight: 500 }}>Sat - Sun: High-Priority Only</p>
            </motion.div>
          </div>

          {/* Secure Transmission Form */}
          <motion.div variants={itemVariants} className="luxury-card glass-v2" style={{ gridColumn: 'span 1', padding: 'clamp(24px, 5vw, 60px)' }}>
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--fluid-primary)', marginBottom: '12px' }}>
                <MessageSquare size={20} />
                <span style={{ fontWeight: 900, fontSize: '0.75rem', letterSpacing: '0.15em' }}>SECURE_TRANSMISSION</span>
              </div>
              <h2 style={{ fontSize: 'var(--h2-size)' }}>Dispatch a Message</h2>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '24px' }}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>OPERATIVE_NAME</label>
                  <input 
                    type="text" 
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    placeholder="Enter identification..." 
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>RETURN_VECTOR_EMAIL</label>
                  <input 
                    type="email" 
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    placeholder="name@institution.edu" 
                    style={styles.input}
                    required
                  />
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>COMMUNICATION_BODY</label>
                <textarea 
                  rows="6" 
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  placeholder="Draft your high-integrity message here..." 
                  style={{ ...styles.input, resize: 'none' }}
                  required
                ></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn-elite" disabled={isSubmitting} style={{ padding: '20px 48px', width: 'min(300px, 100%)', justifyContent: 'center' }}>
                  {isSubmitting ? 'DISPATCHING...' : (
                    <>UNLEASH <Send size={20} /></>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

const styles = {
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: 900,
    color: 'var(--ink-400)',
    letterSpacing: '0.1em'
  },
  input: {
    padding: '16px',
    borderRadius: '16px',
    border: '1px solid var(--ink-200)',
    background: '#fcfcfd',
    fontSize: '0.95rem',
    fontWeight: 600,
    color: 'var(--ink-900)',
    outline: 'none',
    transition: 'all 0.3s',
    width: '100%'
  }
};

export default Contact;
