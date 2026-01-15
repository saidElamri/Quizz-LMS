import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecentActivity from './TeacherComponents/recentActivity'; 
import PendingGrading from './TeacherComponents/pendingGrading'; 
import StudentProgress from './TeacherComponents/StudentProgress'; 
import Announcements from './TeacherComponents/Announcements'; 

const TeacherHome = () => {
  const [step, setStep] = useState(1);
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  const [studentProgress, setStudentProgress] = useState([]);
  const [initialAnnouncements, setInitialAnnouncements] = useState([]);

  useEffect(() => {
    fetchStudentProgress();
    fetchInitialAnnouncements();
  }, []);

  const fetchStudentProgress = async () => {
    const data = [
      { name: 'Alice', progress: 85 },
      { name: 'Bob', progress: 60 },
      { name: 'Charlie', progress: 40 },
    ]; 
    setStudentProgress(data);
  };

  const fetchInitialAnnouncements = async () => {
    const data = []; 
    setInitialAnnouncements(data);
  };

  const handleQuizTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index][event.target.name] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleNextStep = () => {
    if (step === 1 && quizTitle) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizData = {
      title: quizTitle,
      questions,
    };

    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch('https://quizz-lms.onrender.com/api/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(quizData),
      });

      if (response.ok) {
        console.log('Quiz created successfully');
        setQuizTitle('');
        setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
        setStep(1);
      } else {
        console.error('Failed to create quiz');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.content}>
        <h1 style={styles.title}>Welcome, Teacher!</h1>

        <div style={styles.quizContainer}>
          {step === 1 && (
            <div style={styles.stepContainer}>
              <h2>Create a New Quiz</h2>
              <label>Quiz Title:</label>
              <input
                type="text"
                value={quizTitle}
                onChange={handleQuizTitleChange}
                style={styles.input}
                placeholder="Enter quiz title"
                required
              />
              <button style={styles.nextButton} onClick={handleNextStep}>
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={styles.stepContainer}>
              <h2>Add Questions</h2>
              {questions.map((question, qIndex) => (
                <div key={qIndex} style={styles.questionSection}>
                  <label>Question {qIndex + 1}:</label>
                  <input
                    type="text"
                    name="question"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(qIndex, e)}
                    style={styles.input}
                    placeholder="Enter the question"
                    required
                  />
                  <div>
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} style={styles.option}>
                        <label>Option {oIndex + 1}:</label>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                          style={styles.input}
                          placeholder="Enter an option"
                          required
                        />
                      </div>
                    ))}
                  </div>
                  <label>Correct Answer:</label>
                  <input
                    type="text"
                    name="correctAnswer"
                    value={question.correctAnswer}
                    onChange={(e) => handleQuestionChange(qIndex, e)}
                    style={styles.input}
                    placeholder="Enter the correct answer"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    style={styles.removeButton}
                  >
                    Remove Question
                  </button>
                </div>
              ))}

              <button type="button" onClick={addQuestion} style={styles.addButton}>
                Add Another Question
              </button>

              <div style={styles.buttonContainer}>
                <button style={styles.prevButton} onClick={handlePrevStep}>
                  Previous
                </button>
                <button style={styles.submitButton} onClick={handleSubmit}>
                  Create Quiz
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Integrating Components */}
        <div style={styles.componentsContainer}>
          <RecentActivity />
          <PendingGrading />
          <StudentProgress students={studentProgress} />
          <Announcements initialAnnouncements={initialAnnouncements} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flex: 1,
    width: '80%',
    padding: '40px', // Adjusted padding for better spacing
    maxWidth: '1200px',
    margin: '0 auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: '40px',
    color: '#333',
    fontSize: '2.5rem',
  },
  quizContainer: {
    marginBottom: '40px', // Reduced margin for tighter layout
    borderBottom: '2px solid #007bff',
    paddingBottom: '20px', // Reduced padding
    width: '100%',
  },
  stepContainer: {
    marginBottom: '30px',
    width: '100%',
    maxWidth: '600px',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '10px', // Adjusted padding for consistency
    marginBottom: '10px', // Reduced margin
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  nextButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 15px', // Adjusted padding for consistency
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  prevButton: {
    backgroundColor: '#6c757d',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '15px',
    fontSize: '16px',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  addButton: {
    backgroundColor: '#17a2b8',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px', // Adjusted margin
  },
  removeButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  componentsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', // Increased minimum width for better layout
    gap: '30px',
    width: '100%',
    marginTop: '30px',
  },
  questionSection: {
    marginBottom: '20px',
  },
  option: {
    marginBottom: '15px',
  },
};

export default TeacherHome;

