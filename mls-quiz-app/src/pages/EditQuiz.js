import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ArrowRight, ArrowLeft, Terminal, Save, AlertCircle, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const EditQuiz = () => {
  const { quizId } = useParams();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Advanced AI');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', ''], correctAnswer: '' }
  ]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/quizzes/${quizId}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setTitle(res.data.title);
        setCategory(res.data.category || 'Advanced AI');
        setQuestions(res.data.questions);
      } catch (err) {
        console.error('CRITICAL_FETCH_FAILURE:', err);
        alert('ACCESS_DENIED: Critical fault in retrieving module data.');
        navigate('/teacher-home');
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) fetchQuiz();
  }, [quizId, user, navigate]);

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', ''], correctAnswer: '' }]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const addOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push('');
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (questions.some(q => !q.correctAnswer)) {
      alert('VALIDATION_ERROR: All gates must have a defined correct response.');
      return;
    }
    try {
      await axios.put(`http://localhost:3001/api/quizzes/${quizId}`, 
        { title, category, questions },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert('PROTOCOL_UPDATED: Module architecture synchronized.');
      navigate('/teacher-home');
    } catch (err) {
      alert('UPDATE_FAILURE: Sync protocol interrupted.');
    }
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Terminal className="animate-pulse" size={48} color="var(--fluid-primary)" />
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <Header />
      <main className="elite-container" style={{ padding: '160px 0 100px' }}>
        
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <button onClick={() => navigate('/teacher-home')} style={styles.backBtn}>
            <ArrowLeft size={18} /> RETURN_TO_COMMAND
          </button>

          <header style={{ marginBottom: '60px' }}>
            <div className="glass-v2" style={{ display: 'inline-flex', padding: '6px 16px', borderRadius: '40px', color: 'var(--fluid-accent)', fontWeight: 900, fontSize: '0.75rem', marginBottom: '16px', border: '1px solid var(--fluid-accent)' }}>
              MODULE_EDIT_MODE :: {quizId.substring(quizId.length-6).toUpperCase()}
            </div>
            <h1 className="title-display" style={{ fontSize: '3.5rem' }}>Modify <span className="text-fluid">Protocol</span></h1>
            <p style={{ color: 'var(--ink-700)', fontSize: '1.2rem', fontWeight: 600, marginTop: '12px' }}>Recalibrate internal gate logic and structural metadata.</p>
          </header>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="luxury-card"
                  style={{ padding: '60px' }}
                >
                  <div style={{ marginBottom: '40px' }}>
                    <label style={styles.inputLabel}>MODULE_TITLE</label>
                    <input 
                      style={styles.mainInput}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Quantum Heuristics Base-Alpha"
                      required
                    />
                  </div>
                  
                  <div style={{ marginBottom: '60px' }}>
                    <label style={styles.inputLabel}>CORE_CATEGORY</label>
                    <select 
                      style={styles.mainInput} 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option>Advanced AI</option>
                      <option>Quantum Computing</option>
                      <option>Data Architecture</option>
                      <option>Security Protocols</option>
                      <option>General Engineering</option>
                    </select>
                  </div>

                  <button type="button" onClick={() => setStep(2)} className="btn-elite" style={{ width: '100%', padding: '24px' }}>
                    INITIALIZE_GATE_RECONFIG <ArrowRight size={20} />
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    {questions.map((q, qIndex) => (
                      <div key={qIndex} className="luxury-card" style={{ padding: '48px', position: 'relative' }}>
                        <div style={styles.qHeader}>
                          <span style={styles.qNum}>GATE_{qIndex + 1}</span>
                          <button type="button" onClick={() => removeQuestion(qIndex)} style={styles.removeBtn}><Trash2 size={18} /></button>
                        </div>

                        <div style={{ marginBottom: '32px' }}>
                          <label style={styles.inputLabel}>INTERROGATION_STRING</label>
                          <textarea 
                            style={styles.areaInput}
                            value={q.question}
                            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                            placeholder="Input your challenge query here..."
                            required
                          />
                        </div>

                        <div>
                          <label style={styles.inputLabel}>RESPONSE_GATES</label>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            {q.options.map((opt, oIndex) => (
                              <div key={oIndex} style={{ position: 'relative' }}>
                                <input 
                                  style={{ 
                                    ...styles.optionInput,
                                    border: q.correctAnswer === opt && opt !== '' ? '2px solid var(--fluid-primary)' : '1px solid var(--border-light)'
                                  }}
                                  value={opt}
                                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                  placeholder={`Response Block ${oIndex + 1}`}
                                  required
                                />
                                <button 
                                  type="button"
                                  onClick={() => {
                                    const newQuestions = [...questions];
                                    newQuestions[qIndex].correctAnswer = opt;
                                    setQuestions(newQuestions);
                                  }}
                                  style={{
                                    ...styles.checkBtn,
                                    background: q.correctAnswer === opt && opt !== '' ? 'var(--fluid-primary)' : 'transparent',
                                    color: q.correctAnswer === opt && opt !== '' ? 'white' : 'var(--ink-400)'
                                  }}
                                >
                                  {q.correctAnswer === opt && opt !== '' ? 'TRUE' : 'SET'}
                                </button>
                              </div>
                            ))}
                            <button type="button" onClick={() => addOption(qIndex)} style={styles.addOptionBtn}>
                              <Plus size={16} /> ADD_OPTION
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '60px', display: 'flex', gap: '24px' }}>
                    <button type="button" onClick={() => setStep(1)} style={{ ...styles.utilBtn, flex: 1 }}>
                      <ArrowLeft size={18} /> REVISE_METADATA
                    </button>
                    <button type="button" onClick={addQuestion} style={{ ...styles.utilBtn, flex: 1 }}>
                      <Plus size={18} /> INJECT_NEW_GATE
                    </button>
                    <button type="submit" className="btn-elite" style={{ flex: 2, padding: '24px' }}>
                      <Save size={20} /> SYNCHRONIZE_CHANGES
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

      </main>
      <Footer />
    </div>
  );
};

const styles = {
  backBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--ink-400)',
    fontWeight: 800,
    fontSize: '0.8rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    marginBottom: '32px',
    padding: 0,
  },
  inputLabel: {
    fontSize: '0.7rem',
    fontWeight: 900,
    letterSpacing: '0.15em',
    color: 'var(--ink-400)',
    display: 'block',
    marginBottom: '12px',
  },
  mainInput: {
    width: '100%',
    padding: '24px',
    borderRadius: '16px',
    border: '1px solid var(--border-light)',
    fontSize: '1.2rem',
    fontWeight: 700,
    outline: 'none',
    background: '#f8fafc',
    transition: 'all 0.3s',
  },
  areaInput: {
    width: '100%',
    padding: '24px',
    borderRadius: '16px',
    border: '1px solid var(--border-light)',
    fontSize: '1.1rem',
    fontWeight: 600,
    outline: 'none',
    background: '#f8fafc',
    minHeight: '120px',
    resize: 'none',
  },
  qHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  qNum: {
    fontSize: '0.8rem',
    fontWeight: 900,
    color: 'var(--fluid-primary)',
    background: 'rgba(99, 102, 241, 0.08)',
    padding: '6px 16px',
    borderRadius: '40px',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    opacity: 0.6,
  },
  optionInput: {
    width: '100%',
    padding: '16px 20px',
    paddingRight: '80px',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontWeight: 700,
    outline: 'none',
    background: 'white',
    transition: 'all 0.2s',
  },
  checkBtn: {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '0.65rem',
    fontWeight: 900,
    border: '1px solid var(--border-light)',
    cursor: 'pointer',
  },
  addOptionBtn: {
    border: '2px dashed var(--border-light)',
    background: 'none',
    borderRadius: '12px',
    padding: '16px',
    color: 'var(--ink-400)',
    fontWeight: 900,
    fontSize: '0.75rem',
    cursor: 'pointer',
  },
  utilBtn: {
    padding: '20px',
    borderRadius: '16px',
    border: '1px solid var(--border-light)',
    background: 'white',
    color: 'var(--ink-900)',
    fontWeight: 800,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    cursor: 'pointer',
  }
};

export default EditQuiz;
