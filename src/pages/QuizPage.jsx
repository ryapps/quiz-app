import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuizQuestions } from '../services/quizApi';
import QuestionCard from './components/quiz/QuestionCard';
import QuizHeader from './components/quiz/QuizHeader';

const QUIZ_DURATION = 120; // 2 menit, kamu bisa ubah bebas jumlah detiknya

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await fetchQuizQuestions();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    getQuestions();
  }, []);

  useEffect(() => {
    if (loading || questions.length === 0 || isFinished) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [loading, questions.length, isFinished]);

  useEffect(() => {
    if (isFinished) {
      navigate('/result', {
        state: {
          correctCount,
          incorrectCount,
          totalQuestions: questions.length,
        },
        replace: true, 
      });
    }
  }, [isFinished, navigate, correctCount, incorrectCount, questions.length]);

  const handleSelect = (option) => {
    console.log('select:', option);
    const currentQ = questions[currentIndex];
    const isCorrect = option === currentQ.correctAnswer;
    const newCorrect = correctCount + (isCorrect ? 1 : 0);
    const newIncorrect = incorrectCount + (isCorrect ? 0 : 1);

    setCorrectCount(newCorrect);
    setIncorrectCount(newIncorrect);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log('Quiz done!');
      setIsFinished(true);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-blue-100 items-center justify-center">
        <div className="text-2xl font-bold text-gray-700 animate-pulse">Loading questions...</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-blue-100 items-center justify-center">
        <div className="text-2xl font-bold text-red-500">No questions found.</div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="flex flex-col min-h-screen bg-blue-100">
      <QuizHeader timeLeft={timeLeft} />

      <div className="flex-1 flex flex-col items-center justify-center py-8">
        <QuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          onSelectOption={handleSelect}
          currentQuestionIndex={currentIndex}
          totalQuestions={questions.length}
        />
      </div>
    </div>
  );
}
