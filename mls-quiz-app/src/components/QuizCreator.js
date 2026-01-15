import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, CheckCircle, Brain, ArrowRight, Save, Layout, ListChecks } from 'lucide-react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const QuizCreator = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Advanced AI');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:3001/api/quizzes', 
        { title, category, questions },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      navigate('/teacher-home');
    } catch (error) {
      console.error('Failed to create quiz', error);
      alert('PROTOCOL_ERROR: Failed to save assessment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fcfcfd' }}>
      <Header />
      <main className="elite-container" style={{ flex: 1, padding: '160px 0 100px' }}>
        
        {/* Header Hero */}
        <div style={{ marginBottom: '64px', textAlign: 'center' }}>
          <div className="glass-v2" style={{ display: 'inline-flex', padding: '6px 16px', borderRadius: '40px', color: 'var(--fluid-primary)', fontWeight: 900, fontSize: '0.75rem', marginBottom: '24px', border: '1px solid var(--fluid-primary)' }}>
            ASSESSMENT_FABRICATION_LAB
          </div>
          <h1 className="title-display" style={{ fontSize: '3.5rem' }}>Elite <span className="text-fluid">Workshop</span></h1>
          <p style={{ color: 'var(--ink-700)', fontSize: '1.2rem', maxWidth: '600px', margin: '12px auto 0', fontWeight: 600 }}>
            Engineer high-integrity cognitive modules and assessment protocols.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Title & Category Injection */}
          <section className="luxury-card glass-v2" style={{ padding: '40px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', color: 'var(--ink-400)' }}>
              <Layout size={20} />
              <span style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.1em' }}>MODULE_IDENTITY</span>
            </div>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Enter Quiz Title (e.g., Advanced JavaScript Logic)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ ...styles.titleInput, flex: 2 }}
              />
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={styles.categorySelect}
              >
                <option>Advanced AI</option>
                <option>Heuristic Logic</option>
                <option>Neural Networks</option>
                <option>Quantum Computing</option>
                <option>General Engineering</option>
              </select>
            </div>
          </section>

          {/* Question Blocks */}
          <AnimatePresence>
            {questions.map((question, qIndex) => (
              <motion.section 
                key={qIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="luxury-card"
                style={{ padding: '48px', marginBottom: '40px', border: '1px solid rgba(0,0,0,0.03)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--fluid-primary)' }}>
                    <div style={styles.qCircle}>{qIndex + 1}</div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.1em' }}>QUESTION_NODE</span>
                  </div>
                  {questions.length > 1 && (
                    <button type="button" onClick={() => removeQuestion(qIndex)} style={styles.removeBtn}>
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <textarea
                  placeholder="Formulate the assessment query..."
                  value={question.question}
                  onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                  required
                  style={styles.textArea}
                />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '32px' }}>
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} style={{ position: 'relative' }}>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...question.options];
                          newOptions[oIndex] = e.target.value;
                          updateQuestion(qIndex, 'options', newOptions);
                        }}
                        placeholder={`Option ${oIndex + 1}`}
                        required
                        style={{
                          ...styles.optionInput,
                          borderColor: question.correctAnswer === option && option !== '' ? 'var(--fluid-primary)' : 'rgba(0,0,0,0.08)',
                          background: question.correctAnswer === option && option !== '' ? 'rgba(99, 102, 241, 0.02)' : 'white'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => updateQuestion(qIndex, 'correctAnswer', option)}
                        style={{
                          ...styles.radioMark,
                          color: question.correctAnswer === option && option !== '' ? 'var(--fluid-primary)' : 'var(--ink-300)'
                        }}
                      >
                        <CheckCircle size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.section>
            ))}
          </AnimatePresence>

          {/* Action Hub */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
            <button type="button" onClick={addQuestion} className="btn-elite" style={{ flex: 1, background: 'white', color: 'var(--ink-900)', border: '1px solid var(--border-light)', boxShadow: 'none' }}>
              <Plus size={20} /> APPEND_QUESTION_NODE
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-elite" style={{ flex: 1.5 }}>
              {isSubmitting ? 'PROCESSING...' : 'SAVE_INSTITUTIONAL_PROTOCOL'} <Save size={20} />
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

const styles = {
  titleInput: {
    width: '100%',
    fontSize: '1.8rem',
    fontWeight: 800,
    border: 'none',
    background: 'transparent',
    outline: 'none',
    color: 'var(--ink-900)',
    padding: '0'
  },
  categorySelect: {
    flex: 1,
    padding: '12px 20px',
    borderRadius: '12px',
    border: '1px solid var(--border-light)',
    background: '#f8fafc',
    fontSize: '0.9rem',
    fontWeight: 800,
    outline: 'none',
    minWidth: '200px'
  },
  qCircle: {
    width: '32px',
    height: '32px',
    background: 'var(--ink-900)',
    color: 'white',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.9rem',
    fontWeight: 900
  },
  textArea: {
    width: '100%',
    padding: '24px',
    fontSize: '1.2rem',
    fontWeight: 600,
    borderRadius: '16px',
    background: '#f8fafc',
    border: '1px solid rgba(0,0,0,0.05)',
    minHeight: '120px',
    outline: 'none',
    resize: 'none',
    transition: 'all 0.3s'
  },
  optionInput: {
    width: '100%',
    padding: '20px 50px 20px 20px',
    fontSize: '1rem',
    fontWeight: 600,
    borderRadius: '12px',
    border: '1px solid',
    outline: 'none',
    transition: 'all 0.3s'
  },
  radioMark: {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  removeBtn: {
    background: '#fee2e2',
    color: '#ef4444',
    border: 'none',
    padding: '10px',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.8rem',
    fontWeight: 800
  }
};

export default QuizCreator;