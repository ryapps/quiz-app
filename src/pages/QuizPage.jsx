import { useEffect, useState } from 'react';
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

  if (isFinished) {
    return (
      <div className="flex flex-col min-h-screen bg-blue-100">
        <QuizHeader timeLeft={timeLeft} />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-md flex flex-col items-center w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Kuis Selesai!</h1>
            <div className="flex flex-col w-full gap-4 mb-8">
              <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg border border-blue-100">
                <span className="font-semibold text-gray-700">Terjawab:</span>
                <span className="text-xl font-bold text-blue-600">
                  {correctCount + incorrectCount} / {questions.length}
                </span>
              </div>
              <div className="flex justify-between items-center bg-green-50 p-4 rounded-lg border border-green-100">
                <span className="font-semibold text-gray-700">Benar:</span>
                <span className="text-xl font-bold text-green-600">{correctCount}</span>
              </div>
              <div className="flex justify-between items-center bg-red-50 p-4 rounded-lg border border-red-100">
                <span className="font-semibold text-gray-700">Salah:</span>
                <span className="text-xl font-bold text-red-600">{incorrectCount}</span>
              </div>
            </div>
          </div>
        </div>
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
