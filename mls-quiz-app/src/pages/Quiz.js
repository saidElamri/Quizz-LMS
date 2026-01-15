import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/EliteToast';
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft, Timer, Award, Target, Cpu, Activity, Send, ArrowRight } from 'lucide-react';

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [quiz, setQuiz] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/quizzes/${quizId}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      } finally {
        setLoading(false);
      }
    };
    if (quizId && user?.token) fetchQuiz();
  }, [quizId, user]);

  const handleAnswerChange = (selectedOption) => {
    setUserAnswers(prev => ({ ...prev, [currentStep]: selectedOption }));
  };

  const handleNext = () => {
    if (currentStep < quiz.questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      finalizeSession();
    }
  };

  const finalizeSession = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/quizzes/${quizId}/submit`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}` 
        },
        body: JSON.stringify({ answers: userAnswers })
      });
      const data = await response.json();
       if (response.ok) {
        setScore(data.score);
        addToast('Protocol Synchronized', `Your performance data has been uploaded. Final Score: ${data.score}/${quiz.questions.length}`, 'success');
        setShowResults(true);
      } else {
        addToast('Sync Interrupted', 'Critical fault in data transmission.', 'error');
      }
    } catch (error) {
      console.error('Submission Error:', error);
    }
  };

  const progress = quiz ? ((currentStep + 1) / quiz.questions.length) * 100 : 0;

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <Header />
      <div style={{ padding: '160px 0', textAlign: 'center' }}>
        <Activity size={48} className="animate-pulse" color="var(--fluid-primary)" />
        <p style={{ marginTop: '24px', fontWeight: 800, color: 'var(--ink-700)' }}>INITIALIZING_PROTOCOL_STREAM...</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'white', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      {/* Immersive Background Elements */}
      <div style={styles.bgPulse}></div>

      <main style={{ flex: 1, padding: 'clamp(100px, 15vw, 160px) 0 80px', position: 'relative' }}>
        <div className="elite-container" style={{ maxWidth: '900px' }}>
          
          {/* Protocol Metadata */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 'clamp(20px, 4vw, 32px)', marginBottom: 'clamp(40px, 8vw, 80px)' }}>
            <div>
              <div style={styles.protoBadge}>PROTOCOL_ASSESSMENT_{quizId ? quizId.substring(quizId.length-4).toUpperCase() : 'UNKNOWN'}</div>
              <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', margin: '12px 0 0', lineHeight: 1.2 }}>{quiz.title}</h1>
            </div>
            <div style={{ textAlign: 'left', alignSelf: 'end' }}>
              <div style={{ display: 'flex', gap: '20px', color: 'var(--ink-700)', fontSize: '0.9rem', fontWeight: 800, flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Timer size={16} /> 15:00 REMAINING</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Target size={16} /> STEP {currentStep + 1}/{quiz.questions.length}</span>
              </div>
            </div>
          </div>

          {/* Luxury Progress Bar */}
          <div style={styles.progTrack}>
            <motion.div 
              style={styles.progFill} 
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Question Sequence */}
          <div style={{ position: 'relative', minHeight: '400px' }}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentStep}
                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="luxury-card glass-v2"
                style={{ padding: 'clamp(20px, 6vw, 60px)' }}
              >
                <div style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--fluid-primary)', letterSpacing: '0.2em', marginBottom: '16px' }}>
                  INQUIRY_GATE_{currentStep + 1}
                </div>
                <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 2.2rem)', lineHeight: 1.4, marginBottom: 'clamp(24px, 6vw, 60px)', color: 'var(--ink-900)' }}>
                  {quiz.questions[currentStep].question}
                </h2>

                <div style={{ display: 'grid', gap: '16px' }}>
                  {quiz.questions[currentStep].options.map((option, idx) => {
                    const isSelected = userAnswers[currentStep] === option;
                    return (
                      <motion.button
                        key={idx}
                        whileHover={{ x: 8 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswerChange(option)}
                        style={{
                          ...styles.optionBtn,
                          padding: 'clamp(16px, 4vw, 24px) clamp(20px, 4vw, 32px)',
                          borderColor: reviewMode 
                            ? (option === quiz.questions[currentStep].correctAnswer ? '#10b981' : (isSelected ? '#ef4444' : 'rgba(0,0,0,0.05)'))
                            : (isSelected ? 'var(--fluid-primary)' : 'rgba(0,0,0,0.05)'),
                          background: reviewMode
                            ? (option === quiz.questions[currentStep].correctAnswer ? 'rgba(16, 185, 129, 0.05)' : (isSelected ? 'rgba(239, 68, 68, 0.05)' : 'white'))
                            : (isSelected ? 'rgba(99, 102, 241, 0.05)' : 'white'),
                          color: reviewMode
                            ? (option === quiz.questions[currentStep].correctAnswer ? '#10b981' : (isSelected ? '#ef4444' : 'var(--ink-400)'))
                            : (isSelected ? 'var(--fluid-primary)' : 'var(--ink-900)')
                        }}
                      >
                       <div style={{ 
                         ...styles.optionIndex, 
                         background: reviewMode
                          ? (option === quiz.questions[currentStep].correctAnswer ? '#10b981' : (isSelected ? '#ef4444' : '#f1f5f9'))
                          : (isSelected ? 'var(--fluid-primary)' : '#f1f5f9'), 
                         color: (isSelected || (reviewMode && option === quiz.questions[currentStep].correctAnswer)) ? 'white' : 'var(--ink-700)' 
                       }}>
                          {String.fromCharCode(65 + idx)}
                       </div>
                       <span style={{ fontSize: '1rem', flex: 1, fontWeight: (isSelected || (reviewMode && option === quiz.questions[currentStep].correctAnswer)) ? 800 : 500 }}>{option}</span>
                       <AnimatePresence>
                         {isSelected && !reviewMode && (
                           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ marginLeft: 'auto' }}>
                             <CheckCircle2 size={20} />
                           </motion.div>
                         )}
                         {reviewMode && option === quiz.questions[currentStep].correctAnswer && (
                           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ marginLeft: 'auto', color: '#10b981' }}>
                             <CheckCircle2 size={20} />
                           </motion.div>
                         )}
                         {reviewMode && isSelected && option !== quiz.questions[currentStep].correctAnswer && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ marginLeft: 'auto', color: '#ef4444' }}>
                              <XCircle size={20} />
                            </motion.div>
                         )}
                       </AnimatePresence>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Protocol Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', gap: '20px' }}>
            <button 
              className="btn-elite" 
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 0}
              style={{ background: 'white', color: 'var(--ink-900)', border: '1px solid var(--border-light)', boxShadow: 'none', opacity: currentStep === 0 ? 0.3 : 1, padding: '16px 24px' }}
            >
              <ChevronLeft size={20} /> <span className="mobile-hide">PREV_GATE</span>
            </button>
            <button 
              className="btn-elite" 
              onClick={reviewMode ? () => navigate('/student-home') : handleNext}
              disabled={!reviewMode && !userAnswers[currentStep]}
              style={{ opacity: (!reviewMode && !userAnswers[currentStep]) ? 0.5 : 1, padding: '16px 24px', flex: 1, justifyContent: 'center' }}
            >
              {reviewMode ? (
                <>CLOSE_REVIEW <ArrowRight size={20} /></>
              ) : currentStep === quiz.questions.length - 1 ? (
                <>FINALIZE_PROTOCOL <Send size={20} /></>
              ) : (
                <>NEXT_GATE <ChevronRight size={20} /></>
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Result Immersion Layer */}
      <AnimatePresence>
        {showResults && (
           <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={styles.modalOverlay}
           >
             <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="luxury-card glass-v2"
              style={styles.modalCard}
             >
               <div style={styles.modalIcon}>
                 <Award size={40} color="white" />
               </div>
                <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', marginBottom: '12px', lineHeight: 1.2 }}>Protocol <span className="text-fluid">Complete</span></h2>
                <p style={{ color: 'var(--ink-700)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '32px' }}>
                  Core competency verification finalized. Module data synchronized.
                </p>

               <div style={styles.resultDisplay}>
                 <div style={styles.resultItem}>
                   <div style={styles.resLabel}>SCORE_INDEX</div>
                   <div style={styles.resValue}>{score}/{quiz.questions.length}</div>
                 </div>
                 <div style={styles.resItemDivider}></div>
                 <div style={styles.resultItem}>
                   <div style={styles.resLabel}>ACCURACY</div>
                   <div style={styles.resValue}>{Math.round((score/quiz.questions.length)*100)}%</div>
                 </div>
               </div>

               <div style={{ display: 'grid', gap: '12px' }}>
                  <button onClick={() => navigate('/student-home')} className="btn-elite" style={{ justifyContent: 'center' }}>
                    Return to Commander
                  </button>
                  <button onClick={() => { setShowResults(false); setReviewMode(true); setCurrentStep(0); }} className="btn-elite" style={{ background: 'white', color: 'var(--ink-900)', border: '1px solid var(--border-light)', boxShadow: 'none', justifyContent: 'center' }}>
                    Review Protocols
                  </button>
                  <button 
                    onClick={() => { setShowResults(false); setCurrentStep(0); setUserAnswers({}); }}
                    style={{ background: 'none', border: 'none', color: 'var(--ink-700)', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', marginTop: '12px' }}
                  >
                    RE-INITIALIZE_SESSION
                  </button>
               </div>
             </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

const styles = {
  bgPulse: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(to right, transparent, var(--fluid-primary), transparent)',
    zIndex: 2000,
    animation: 'scan 4s infinite linear',
  },
  protoBadge: {
    fontSize: '0.6rem',
    fontWeight: 900,
    letterSpacing: '0.2em',
    color: 'var(--fluid-primary)',
    background: 'rgba(99, 102, 241, 0.08)',
    padding: '6px 12px',
    borderRadius: '4px',
    display: 'inline-block',
  },
  progTrack: {
    height: '6px',
    background: 'rgba(0,0,0,0.03)',
    borderRadius: '50px',
    overflow: 'hidden',
    marginBottom: '32px',
    border: '1px solid rgba(0,0,0,0.02)',
  },
  progFill: {
    height: '100%',
    background: 'linear-gradient(to right, var(--fluid-primary), var(--fluid-secondary))',
    boxShadow: '0 0 20px var(--fluid-primary-glow)',
  },
  optionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    borderRadius: '20px',
    border: '2px solid',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    width: '100%',
  },
  optionIndex: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85rem',
    fontWeight: 900,
    flexShrink: 0,
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(2, 6, 23, 0.85)',
    backdropFilter: 'blur(12px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3000,
    padding: '20px',
  },
  modalCard: {
    maxWidth: '480px',
    width: '100%',
    textAlign: 'center',
    padding: 'clamp(32px, 8vw, 48px)',
    background: 'white',
  },
  modalIcon: {
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, var(--fluid-primary), #4f46e5)',
    borderRadius: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 32px',
    boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
  },
  resultDisplay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f8fafc',
    borderRadius: '20px',
    padding: '24px',
    marginBottom: '32px',
  },
  resultItem: {
    flex: 1,
  },
  resLabel: {
    fontSize: '0.6rem',
    fontWeight: 900,
    letterSpacing: '0.15em',
    color: 'var(--ink-700)',
    marginBottom: '4px',
  },
  resValue: {
    fontSize: '2rem',
    fontWeight: 900,
    color: 'var(--ink-900)',
    lineHeight: 1,
  },
  resItemDivider: {
    width: '1px',
    height: '40px',
    background: 'rgba(0,0,0,0.08)',
    margin: '0 24px',
  }
};

export default Quiz;
