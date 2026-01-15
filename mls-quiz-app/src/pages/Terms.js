import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Shield, Lock, Scale, Eye, FileText, CheckCircle } from 'lucide-react';

const Terms = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const protocols = [
    {
      icon: <Shield size={24} />,
      title: "Data Integrity Protocol",
      desc: "All session data is encrypted and handled with peak administrative integrity. We maintain zero-latency protection of your cognitive modular progress.",
      color: "var(--fluid-primary)"
    },
    {
      icon: <Lock size={24} />,
      title: "Identity Matrix Protection",
      desc: "Your identity handle and institutional verified credentials are never shared with external vectors without your explicit operational consent.",
      color: "var(--fluid-secondary)"
    },
    {
      icon: <Scale size={24} />,
      title: "Fair-Play Heuristics",
      desc: "The Lab employs advanced heuristic algorithms to ensure equitable assessment environments for all scholars. Tampering with internal logic results in session termination.",
      color: "var(--fluid-accent)"
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'white' }}>
      <Header />
      
      <main className="elite-container" style={{ flex: 1, padding: '180px 0 100px' }}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '100px' }}
        >
          <div className="glass-v2" style={{ display: 'inline-flex', padding: '6px 16px', borderRadius: '40px', color: 'var(--fluid-primary)', fontWeight: 900, fontSize: '0.75rem', marginBottom: '24px', border: '1px solid var(--fluid-primary)' }}>
            PROTOCOL_ETHICS_v2.4
          </div>
          <h1 className="title-display" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>Terms & <br /><span className="text-fluid">Protocols</span></h1>
          <p style={{ color: 'var(--ink-700)', fontSize: '1.45rem', marginTop: '20px', fontWeight: 600, maxWidth: '800px' }}>
            The foundational guidelines governing institutional access, data integrity, and ethical engagement within the LAB_MLS ecosystem.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '60px' }}
        >
          {/* Main Content Area */}
          <div style={{ gridColumn: '1 / span 8' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
              <motion.section variants={itemVariants}>
                <h2 style={styles.sectionTitle}><span style={styles.number}>01.</span> Operational Engagement</h2>
                <p style={styles.paragraph}>
                  By initializing a session on LAB_MLS, you agree to adhere to the high-integrity operational protocols established by the Faculty Core. This includes the responsible use of assessment modules and the maintenance of cognitive honesty across all intellectual vectors.
                </p>
                <div className="luxury-card glass-v2" style={{ marginTop: '40px', padding: '40px' }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <CheckCircle size={20} color="var(--fluid-primary)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink-800)' }}>Users must maintain a single identity matrix; duplicate session IDs are strictly prohibited.</p>
                  </div>
                </div>
              </motion.section>

              <motion.section variants={itemVariants}>
                <h2 style={styles.sectionTitle}><span style={styles.number}>02.</span> Intellectual Property</h2>
                <p style={styles.paragraph}>
                  All heuristic content, assessment architectures, and cognitive datasets within the Research Lab remain the exclusive property of the MLS Intelligence Collective. Unauthorized extraction or duplication of these modules is considered a high-priority protocol violation.
                </p>
              </motion.section>

              <motion.section variants={itemVariants}>
                <h2 style={styles.sectionTitle}><span style={styles.number}>03.</span> Liability & Continuity</h2>
                <p style={styles.paragraph}>
                  While we strive for zero-latency operational continuity, the Faculty Core is not liable for temporal disruptions in the global sync or individual data packet loss occurring outside our primary administrative grid.
                </p>
              </motion.section>
            </div>
          </div>

          {/* Sidebar Protocols */}
          <aside style={{ gridColumn: '9 / span 4' }}>
            <div style={{ position: 'sticky', top: '240px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h3 style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.15em', color: 'var(--ink-400)', marginBottom: '12px' }}>CORE_SECURITY_PILLARS</h3>
              {protocols.map((p, i) => (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  className="luxury-card glass-v2" 
                  style={{ padding: '24px' }}
                >
                  <div style={{ color: p.color, marginBottom: '16px' }}>{p.icon}</div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{p.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--ink-600)', lineHeight: 1.6, fontWeight: 500, margin: 0 }}>{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </aside>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

const styles = {
  sectionTitle: {
    fontSize: '2.4rem',
    fontWeight: 900,
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'baseline',
    gap: '16px'
  },
  number: {
    fontSize: '1.2rem',
    color: 'var(--fluid-primary)',
    fontFamily: 'monospace',
    opacity: 0.5
  },
  paragraph: {
    fontSize: '1.25rem',
    lineHeight: 1.8,
    color: 'var(--ink-700)',
    fontWeight: 500,
  }
};

export default Terms;
