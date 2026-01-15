import { Brain, Twitter, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{ ...styles.footer, padding: 'clamp(60px, 12vw, 120px) 0 clamp(40px, 8vw, 60px)' }}>
      <div className="elite-container">
        <div style={{ ...styles.topRow, gap: 'clamp(40px, 8vw, 80px)', marginBottom: 'clamp(60px, 12vw, 100px)' }}>
          <div style={styles.brandCol}>
            <div style={styles.logo}>
              <div style={styles.logoIcon}><Brain size={24} color="white" /></div>
              <span style={styles.logoText}>LAB_MLS</span>
            </div>
            <p style={{ ...styles.tagline, fontSize: 'clamp(1rem, 2.5vw, 1.15rem)' }}>
              Engineering the synapse of digital assessment through high-integrity learning modules and heuristic cognitive architecture.
            </p>
            <div style={styles.socialRow}>
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" style={styles.socialLink}><Icon size={18} /></a>
              ))}
            </div>
          </div>

          <div style={{ ...styles.linksGrid, gap: 'clamp(40px, 8vw, 120px)' }}>
            <div style={styles.linkCol}>
              <h4 style={styles.linkHeader}>CORE_ECOSYSTEM</h4>
              <Link to="/" style={styles.link}>System_Root</Link>
              <Link to="/leaderboard" style={styles.link}>Global_Intel</Link>
              <Link to="/resources" style={styles.link}>Knowledge_Base</Link>
            </div>
            <div style={styles.linkCol}>
              <h4 style={styles.linkHeader}>INSTITUTIONAL</h4>
              <Link to="/about" style={styles.link}>Operational_Methodology</Link>
              <Link to="/contact" style={styles.link}>Faculty_Comms</Link>
              <Link to="/terms" style={styles.link}>Protocol_Ethics</Link>
            </div>
          </div>
        </div>

        <div style={{ ...styles.bottomRow, paddingTop: 'clamp(32px, 6vw, 60px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <p style={styles.copyright}>© 2026 LAB_MLS PROTOCOL • SYSTEM_v2.4</p>
            <div style={styles.statusBadge}>
              <div style={styles.statusDot}></div>
              GLOBAL_SYNC_ACTIVE
            </div>
          </div>
          <div style={{ ...styles.legalLinks, gap: 'clamp(20px, 4vw, 40px)', flexWrap: 'wrap' }}>
            <a href="#" style={styles.legalLink}>Security_Privacy</a>
            <a href="#" style={styles.legalLink}>Service_Agreement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: 'var(--ink-900)',
    color: '#94a3b8',
    borderTop: '1px solid rgba(255,255,255,0.05)',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  brandCol: {
    flex: '1 1 280px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '32px',
  },
  logoIcon: {
    background: 'var(--fluid-primary)',
    padding: '10px',
    borderRadius: '12px',
    display: 'flex',
    boxShadow: '0 10px 20px -5px rgba(99, 102, 241, 0.4)'
  },
  logoText: {
    color: 'white',
    fontSize: '1.6rem',
    fontWeight: 900,
    letterSpacing: '0.05em',
  },
  tagline: {
    color: '#cbd5e1',
    lineHeight: '1.7',
    marginBottom: '40px',
    fontWeight: 500,
    opacity: 0.8,
  },
  socialRow: {
    display: 'flex',
    gap: '12px',
  },
  socialLink: {
    color: 'white',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    padding: '12px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '14px',
    display: 'flex',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  linksGrid: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  linkCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  linkHeader: {
    fontSize: '0.75rem',
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    marginBottom: '12px',
    color: 'var(--fluid-primary)',
  },
  link: {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: 700,
    transition: 'all 0.2s',
  },
  bottomRow: {
    borderTop: '1px solid rgba(255,255,255,0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '32px',
  },
  copyright: {
    fontSize: '0.75rem',
    fontWeight: 900,
    letterSpacing: '0.1em',
    color: 'rgba(255,255,255,0.2)',
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '6px 16px',
    background: 'rgba(16, 185, 129, 0.05)',
    borderRadius: '40px',
    fontSize: '0.65rem',
    fontWeight: 900,
    color: '#10b981',
    letterSpacing: '0.1em',
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#10b981',
    boxShadow: '0 0 10px #10b981',
  },
  legalLinks: {
    display: 'flex',
  },
  legalLink: {
    color: 'rgba(255,255,255,0.3)',
    textDecoration: 'none',
    fontSize: '0.75rem',
    fontWeight: 800,
    letterSpacing: '0.05em',
  },
};

export default Footer;
