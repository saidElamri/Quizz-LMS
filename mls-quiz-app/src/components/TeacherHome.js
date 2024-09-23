import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TeacherHome = () => {
  const [step, setStep] = useState(1);
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [pendingGrading, setPendingGrading] = useState([]);
  const [studentProgress, setStudentProgress] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Fetch recent activity, pending grading, student progress, etc. from API
    fetchRecentActivity();
    fetchPendingGrading();
    fetchStudentProgress();
    fetchAnnouncements();
  }, []);

  const fetchRecentActivity = async () => {
    const data = []; // Replace with actual API call
    setRecentActivity(data);
  };

  const fetchPendingGrading = async () => {
    const data = []; // Replace with actual API call
    setPendingGrading(data);
  };

  const fetchStudentProgress = async () => {
    const data = []; // Replace with actual API call
    setStudentProgress(data);
  };

  const fetchAnnouncements = async () => {
    const data = []; // Replace with actual API call
    setAnnouncements(data);
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
    // Send quizData to the backend API
    console.log(quizData); // Replace with actual API call
    // Reset form
    setQuizTitle('');
    setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
    setStep(1);
  };

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <h1>Welcome, Teacher!</h1>

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

        {/* Your Existing Sections */}

        <div style={styles.section}>
          <h2>Recent Activity</h2>
          <ul>
            {recentActivity.map((activity, index) => (
              <li key={index}>{activity.name} - {activity.date}</li>
            ))}
          </ul>
        </div>

        <div style={styles.section}>
          <h2>Pending Grading</h2>
          <ul>
            {pendingGrading.map((quiz, index) => (
              <li key={index}>{quiz.name} - {quiz.student}</li>
            ))}
          </ul>
        </div>

        <div style={styles.section}>
          <h2>Student Progress</h2>
          <ul>
            {studentProgress.map((student, index) => (
              <li key={index}>{student.name} - {student.progress}%</li>
            ))}
          </ul>
        </div>

        <div style={styles.section}>
          <h2>Announcements</h2>
          <ul>
            {announcements.map((announcement, index) => (
              <li key={index}>{announcement.text}</li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  quizContainer: {
    width: '100%',
    maxWidth: '600px',
    
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginBottom: '20px', // Added to separate it from other sections
  },
  stepContainer: {
    marginBottom: '20px',
  },
  questionSection: {
   
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  addButton: {
    backgroundColor: '#28a745',
    color: '#ffffff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  removeButton: {
    backgroundColor: '#dc3545',
    color: '#ffffff',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  nextButton: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  prevButton: {
    backgroundColor: '#6c757d',
    color: '#ffffff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  section: {
    marginBottom: '20px',
  },
};

export default TeacherHome;
