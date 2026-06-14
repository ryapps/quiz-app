import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import quizImage from '../assets/quiz-logo.png';
import { getName, getQuizState, clearQuizState } from '../utils/localStorage';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') {
     setError('Please enter your name');
      return;
    }
    setError('');

    const savedName = getName();
    const savedState = getQuizState();

    // Cek apakah namanya sama dan ada kuis yang menggantung
    if (savedName === name && savedState) {
      const resume = window.confirm(
        'You have an unfinished quiz. Do you want to resume? Your progress will be lost if you start a new quiz.'
      );
      
      if (!resume) {
        clearQuizState();
      }
    } else if (savedName !== name) {
      // Jika namanya beda, pastikan kuis dimulai dari awal
      clearQuizState();
    }

    localStorage.setItem('name', name);
    navigate('/quiz');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-12 rounded-2xl shadow-md flex flex-col items-center">
        <img src={quizImage} alt="Quiz Logo" className="w-24 h-24 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Let's Get Started</h1>
        <p className="text-gray-600 mb-8">Please enter your name to start the quiz</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col"
        >
          <input
            type="text"
            placeholder="Enter your name"
            id="name"
            name="name"
            value={name}

            className="border-2 border-gray-300 rounded-md p-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>{ setName(e.target.value); if(error) setError('');}}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 mt-5 rounded-md hover:bg-blue-600"
          >
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
}
