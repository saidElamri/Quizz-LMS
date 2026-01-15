import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Plus, LayoutGrid, ListChecks, Users, Bell, ArrowRight, Trash2, Settings, BarChart3, Clock, Command, Terminal, Sparkles, Filter, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeacherHome = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [ledgerResults, setLedgerResults] = useState([]);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [newResource, setNewResource] = useState({ title: '', url: '', category: 'Documentation', desc: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const [quizRes, statsRes, resRes, ledgerRes] = await Promise.all([
          axios.get('http://localhost:3001/api/quizzes/teacher', {
            headers: { Authorization: `Bearer ${user.token}` }
          }),
          axios.get('http://localhost:3001/api/quizzes/teacher/stats', {
            headers: { Authorization: `Bearer ${user.token}` }
          }),
          axios.get('http://localhost:3001/api/resources', {
            headers: { Authorization: `Bearer ${user.token}` }
          }),
          axios.get('http://localhost:3001/api/quizzes/teacher/results', {
            headers: { Authorization: `Bearer ${user.token}` }
          })
        ]);
        setQuizzes(quizRes.data);
        setStats(statsRes.data);
        setResources(resRes.data.filter(r => r.createdBy?._id === user.id || r.createdBy === user.id));
        setLedgerResults(ledgerRes.data);
      } catch (err) {
        console.error('Error fetching teacher data:', err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) fetchTeacherData();
  }, [user]);

  const handleDelete = async (quizId) => {
    if (window.confirm('PROTOCOL_REQUEST: Permanently terminate this module and associated data?')) {
      try {
        await axios.delete(`http://localhost:3001/api/quizzes/${quizId}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setQuizzes(quizzes.filter(q => q._id !== quizId));
      } catch (err) {
        alert('Action Failed: Administrative override required.');
      }
    }
  };

  const handleResourceSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/resources', 
        newResource,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setResources([...resources, response.data]);
      setShowResourceModal(false);
      setNewResource({ title: '', url: '', category: 'Documentation', desc: '' });
      alert('RESOURCE_INJECTED: Laboratory repository updated.');
    } catch (err) {
      alert('RESOURCE_FAILURE: Failed to sync research module.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'white', display: 'flex', flexDirection: 'column', overflowX: 'hidden', width: '100%' }}>
      <Header />
      <main className="elite-container" style={{ flex: 1, padding: 'clamp(100px, 15vw, 160px) 0 80px' }}>
        
        {/* Administrative Command Area */}
        <div style={{ marginBottom: 'clamp(40px, 10vw, 80px)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ flex: '1 1 auto', minWidth: 'min(280px, 100%)' }}>
            <div className="glass-v2" style={{ display: 'inline-flex', padding: '6px 16px', borderRadius: '40px', color: 'var(--fluid-accent)', fontWeight: 900, fontSize: '0.75rem', marginBottom: '16px', border: '1px solid var(--fluid-accent)' }}>
              CORE_FACULTY_ENVIRONMENT
            </div>
            <h1 className="title-display" style={{ fontSize: 'var(--h1-size)' }}>Faculty <span className="text-fluid">Intelligence</span></h1>
            <p style={{ color: 'var(--ink-700)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 600, marginTop: '12px' }}>Operational command for high-integrity academic assessment architecture.</p>
          </div>
          
          <Link to="/create-quiz" className="btn-elite" style={{ whiteSpace: 'nowrap', width: 'auto', flexGrow: 0 }}>
            <Plus size={20} /> Design New Module
          </Link>
        </div>

        {/* Global Intelligence Scorecard */}
        <section style={{ marginBottom: 'clamp(40px, 8vw, 80px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 'clamp(16px, 3vw, 32px)', marginBottom: 'max(48px, 8vw)' }}>
            <div className="luxury-card glass-v2" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: 'var(--card-padding)' }}>
              <div style={{ padding: '12px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', color: 'var(--fluid-primary)', flexShrink: 0 }}>
                <LayoutGrid size={28} />
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={styles.scoreLabel}>ACTIVE_MODULES</div>
                <div style={styles.scoreValue}>{loading ? '--' : quizzes.length}</div>
              </div>
            </div>

            <div className="luxury-card glass-v2" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: 'var(--card-padding)' }}>
              <div style={{ padding: '12px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '12px', color: 'var(--fluid-secondary)', flexShrink: 0 }}>
                <Users size={28} />
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={styles.scoreLabel}>ENROLLED_SCHOLARS</div>
                <div style={styles.scoreValue}>{stats?.totalEnrolled || 0}</div>
              </div>
            </div>

            <div className="luxury-card glass-v2" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: 'var(--card-padding)' }}>
              <div style={{ padding: '10px', background: 'rgba(244, 63, 94, 0.1)', borderRadius: '12px', color: 'var(--fluid-accent)', flexShrink: 0 }}>
                <BarChart3 size={24} />
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={styles.scoreLabel}>MEAN_MASTERY</div>
                <div style={styles.scoreValue}>{stats?.meanMastery || 0}<span style={{ fontSize: '0.85rem', opacity: 0.5 }}>%</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Cognitive Analytic Distribution */}
        {!loading && stats?.quizStats && (
          <section style={{ marginBottom: '80px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: 'clamp(24px, 5vw, 40px)', flexWrap: 'wrap' }}>
                 <h2 style={{ fontSize: 'var(--h2-size)', fontWeight: 900 }}>Mastery Distribution</h2>
                 <div style={{ flex: 1, minWidth: '100px', height: '1px', background: 'rgba(0,0,0,0.05)' }}></div>
                 <div style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--ink-400)', letterSpacing: '0.1em' }}>AGGREGATE_DATA_STREAM</div>
              </div>
             
              <div className="luxury-card glass-v2" style={{ padding: 'var(--card-padding)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(80px, 20vw, 120px), 1fr))', gap: 'clamp(20px, 4vw, 40px)', alignItems: 'flex-end', height: '400px', overflowX: 'auto', overflowY: 'hidden' }}>
                {Object.entries(stats.quizStats).slice(0, 6).map(([id, enrolled], i) => {
                  const quizLabel = quizzes.find(q => q._id === id)?.title || `MOD_${id.substring(id.length-4)}`;
                  const height = Math.min(enrolled * 20, 240); // Scaling height for visualization
                  return (
                    <div key={id} style={{ textAlign: 'center', minWidth: '80px' }}>
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${height}px` }}
                        transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        style={{ 
                          width: '100%', 
                          background: i % 2 === 0 ? 'var(--fluid-primary)' : 'var(--fluid-accent)',
                          borderRadius: '8px 8px 0 0',
                          margin: '0 auto 16px',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                        }}
                      />
                      <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--ink-400)', textTransform: 'uppercase', height: '32px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{quizLabel}</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 900, marginTop: '4px' }}>{enrolled}</div>
                    </div>
                  )
                })}
             </div>
          </section>
        )}

        {/* Module Inventory Control */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ gridColumn: '1 / span 12' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: 'max(24px, 5vw)', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: 'var(--h2-size)' }}>Module Inventory</h2>
            <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.05)', minWidth: '40px' }}></div>
            <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
              <input 
                type="text" 
                placeholder="QUERY_PROTOCOL..." 
                style={{ ...styles.utilBtn, width: '100%', paddingLeft: '44px', cursor: 'text' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Filter size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
            </div>
          </div>

          {loading ? (
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '40px' }}>
                {[1, 2, 3].map(i => <div key={i} className="luxury-card animate-pulse" style={{ gridColumn: 'span 12', height: '140px' }}></div>)}
             </div>
          ) : quizzes.filter(q => q.title.toLowerCase().includes(searchTerm.toLowerCase())).length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {quizzes.filter(q => q.title.toLowerCase().includes(searchTerm.toLowerCase())).map((quiz, idx) => (
                <motion.div 
                  key={quiz._id}
                  variants={cardVariants}
                  className="luxury-card"
                  style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
                    gap: '24px',
                    padding: 'var(--card-padding)',
                    alignItems: 'center' 
                  }}
                >
                  <div style={styles.cardInfoGroup}>
                    <div style={styles.cardIconBox}>
                      <Terminal size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.6rem)' }}>{quiz.title}</h3>
                        <div style={styles.modBadge}>ACTIVE</div>
                      </div>
                      <div style={styles.cardStatsGroup}>
                        <span style={styles.inlineStat}><ListChecks size={14} /> {quiz.questions.length} Items</span>
                        <span style={styles.inlineStat}><Clock size={14} /> 15M Protocol</span>
                        <span style={styles.inlineStat}><Users size={14} /> {stats?.quizStats?.[quiz._id] || 0} Enrolled</span>
                      </div>
                    </div>
                  </div>

                  <div style={styles.cardActionGroup}>
                    <Link to={`/edit-quiz/${quiz._id}`} className="btn-elite" style={{ ...styles.actionBtn, background: 'white', color: 'var(--ink-900)', border: '1px solid var(--border-light)' }}>
                      <Settings size={16} /> Modify
                    </Link>
                    <button onClick={() => handleDelete(quiz._id)} className="btn-elite" style={{ ...styles.actionBtn, background: 'white', color: '#ef4444', border: '1px solid #fee2e2' }}>
                      <Trash2 size={16} /> Terminate
                    </button>
                    <Link to={`/quiz/${quiz._id}`} className="btn-elite" style={styles.actionBtn}>
                      View <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="luxury-card" style={{ textAlign: 'center', padding: '100px', border: '2px dashed #f1f5f9', background: 'white' }}>
              <Sparkles size={64} color="var(--fluid-primary)" style={{ marginBottom: '24px', opacity: 0.5 }} />
              <h3 style={{ fontSize: '1.8rem' }}>Clean Environment.</h3>
              <p style={{ color: 'var(--text-body)', marginTop: '8px', fontSize: '1.1rem' }}>No modules detected in this sector. Begin by initializing your first assessment data.</p>
              <Link to="/create-quiz" className="btn-elite" style={{ marginTop: '32px' }}>
                <Plus size={20} /> Initialize New Module
              </Link>
            </div>
          )}
        </motion.div>

        {/* Global Resource Command Center */}
        <section style={{ marginTop: 'clamp(60px, 12vw, 120px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '48px', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: 'var(--h2-size)' }}>Research Lab Assets</h2>
            <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.05)', minWidth: '40px' }}></div>
            <button onClick={() => setShowResourceModal(true)} className="btn-elite" style={{ width: 'auto' }}>
              <Plus size={18} /> INJECT_RESOURCE
            </button>
          </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: '32px' }}>
            {resources.length > 0 ? (
              resources.map((res, i) => (
                <div key={i} className="luxury-card glass-v2" style={{ padding: 'var(--card-padding)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div style={styles.modBadge}>{res.category}</div>
                    <Terminal size={18} color="var(--ink-400)" />
                  </div>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{res.title}</h4>
                  <p style={{ color: 'var(--ink-700)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>{res.desc}</p>
                  <a href={res.url} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--fluid-primary)', textDecoration: 'none' }}>VERIFY_LINK <ArrowRight size={14} /></a>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', padding: '60px', textAlign: 'center', background: '#f8fafc', borderRadius: '24px', border: '2px dashed #e2e8f0' }}>
                <p style={{ color: 'var(--ink-500)', fontWeight: 600 }}>No institutional assets deployed.</p>
              </div>
            )}
          </div>
        </section>

        {/* Global Scholarly Ledger */}
        <section style={{ marginTop: 'clamp(60px, 12vw, 120px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: 'max(24px, 5vw)', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: 'var(--h2-size)' }}>Scholarly Ledger</h2>
            <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.05)', minWidth: '40px' }}></div>
            <div style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--ink-400)', letterSpacing: '0.1em' }}>REALTIME_SYNC_ACTIVE</div>
          </div>

          <div className="luxury-card glass-v2" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-light)' }}>
                  <th style={styles.th}>SCHOLAR_IDENTITY</th>
                  <th style={styles.th}>MODULE_ID</th>
                  <th style={styles.th}>MASTERY_INDEX</th>
                  <th style={styles.th}>TIMESTAMP</th>
                  <th style={styles.th}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {ledgerResults.length > 0 ? ledgerResults.map((res, i) => (
                  <tr key={res._id} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                    <td style={styles.td}>
                      <div style={{ fontWeight: 800 }}>{res.user?.username}</div>
                      <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>{res.user?.email}</div>
                    </td>
                    <td style={styles.td}>
                      <div style={{ fontWeight: 700 }}>{res.quiz?.title}</div>
                    </td>
                    <td style={styles.td}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 900 }}>{res.percentage}%</div>
                      <div style={{ width: '80px', height: '4px', background: 'rgba(0,0,0,0.05)', borderRadius: '2px', margin: '4px 0' }}>
                        <div style={{ width: `${res.percentage}%`, height: '100%', background: res.percentage >= 80 ? '#10b981' : 'var(--fluid-primary)', borderRadius: '2px' }} />
                      </div>
                      <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>{res.score}/{res.totalQuestions} GATES</div>
                    </td>
                    <td style={styles.td}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{new Date(res.completedAt).toLocaleString()}</div>
                    </td>
                    <td style={styles.td}>
                      <div style={{ 
                        ...styles.modBadge, 
                        color: res.percentage >= 80 ? '#10b981' : '#f59e0b',
                        background: res.percentage >= 80 ? 'rgba(16, 185, 129, 0.05)' : 'rgba(245, 158, 11, 0.05)'
                      }}>
                        {res.percentage >= 80 ? 'MASTERY_CONFIRMED' : 'VALIDATION_PENDING'}
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" style={{ padding: '60px', textAlign: 'center', color: 'var(--ink-400)', fontWeight: 700 }}>No scholarly activity detected.</td>
                  </tr>
                )}
              </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Resource Injection Portal (Modal) */}
        <AnimatePresence>
          {showResourceModal && (
            <div style={styles.modalOverlay}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="luxury-card"
                style={{ width: '100%', maxWidth: '600px', padding: 'clamp(32px, 8vw, 60px)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}
              >
                <button onClick={() => setShowResourceModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-400)' }}><X size={24} /></button>
                <h3 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '12px' }}>Inject <span className="text-fluid">Resource</span></h3>
                <p style={{ color: 'var(--ink-700)', marginBottom: '40px', fontWeight: 600 }}>Deploy a new research module to the student lab.</p>
                
                <form onSubmit={handleResourceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <label style={styles.inputLabel}>RESOURCE_TITLE</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g., Reactive Patterns v3.2" 
                      style={styles.modalInput}
                      value={newResource.title}
                      onChange={e => setNewResource({...newResource, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label style={styles.inputLabel}>ASSET_URL</label>
                    <input 
                      type="url" 
                      required 
                      placeholder="https://institutional.docs/..." 
                      style={styles.modalInput}
                      value={newResource.url}
                      onChange={e => setNewResource({...newResource, url: e.target.value})}
                    />
                  </div>
                  <div>
                    <label style={styles.inputLabel}>CORE_CATEGORY</label>
                    <select 
                      style={styles.modalInput}
                      value={newResource.category}
                      onChange={e => setNewResource({...newResource, category: e.target.value})}
                    >
                      <option>Documentation</option>
                      <option>Video Tutorials</option>
                      <option>Cheat Sheets</option>
                      <option>Practice Problems</option>
                      <option>Tools & Libraries</option>
                    </select>
                  </div>
                  <div>
                    <label style={styles.inputLabel}>DESCRIPTION_TAG</label>
                    <textarea 
                      required 
                      placeholder="Brief mapping of asset contents..." 
                      style={{ ...styles.modalInput, minHeight: '100px', resize: 'none' }}
                      value={newResource.desc}
                      onChange={e => setNewResource({...newResource, desc: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="btn-elite" style={{ width: '100%', padding: '20px' }}>INITIALIZE_INJECTION</button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </main>
      <Footer />
    </div>
  );
};

const styles = {
  scoreLabel: {
    fontSize: '0.7rem',
    fontWeight: 900,
    letterSpacing: '0.15em',
    color: 'var(--ink-700)',
    marginBottom: '4px',
  },
  scoreValue: {
    fontSize: '2rem',
    fontWeight: 900,
    color: 'var(--ink-900)',
  },
  modBadge: {
    fontSize: '0.6rem',
    fontWeight: 900,
    letterSpacing: '0.1em',
    color: '#10b981',
    background: 'rgba(16, 185, 129, 0.08)',
    padding: '4px 12px',
    borderRadius: '40px',
  },
  inlineStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  utilBtn: {
    padding: '12px 24px',
    borderRadius: '12px',
    border: '1px solid var(--border-light)',
    background: 'white',
    color: 'var(--ink-700)',
    fontWeight: 800,
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.8)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    zIndex: 2000,
  },
  modalInput: {
    width: '100%',
    padding: '16px 20px',
    borderRadius: '12px',
    border: '1px solid var(--border-light)',
    background: '#f8fafc',
    fontSize: '0.95rem',
    fontWeight: 700,
    outline: 'none',
  },
  inputLabel: {
    fontSize: '0.65rem',
    fontWeight: 900,
    letterSpacing: '0.15em',
    color: 'var(--ink-400)',
    display: 'block',
    marginBottom: '8px',
  },
  th: {
    padding: '20px 24px',
    textAlign: 'left',
    fontSize: '0.65rem',
    fontWeight: 900,
    color: 'var(--ink-400)',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
  },
  td: {
    padding: '24px',
    fontSize: '0.9rem',
  },
  cardInfoGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(16px, 4vw, 32px)',
    minWidth: 'min(200px, 100%)',
  },
  cardIconBox: {
    width: '56px',
    height: '56px',
    background: '#f8fafc',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--ink-900)',
    flexShrink: 0,
  },
  cardStatsGroup: {
    display: 'flex',
    gap: 'clamp(12px, 3vw, 24px)',
    color: 'var(--ink-700)',
    fontSize: '0.85rem',
    fontWeight: 600,
    flexWrap: 'wrap',
  },
  cardActionGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-start', // Better for mobile grid stacking
    flexWrap: 'wrap',
    width: '100%',
  },
  actionBtn: {
    padding: '12px 20px',
    fontSize: '0.8rem',
    boxShadow: 'none',
    flex: '1 1 auto',
    minWidth: '100px',
  }
};

export default TeacherHome;
