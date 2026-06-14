import { useLocation, useNavigate } from 'react-router-dom';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state || {};
  const { correctCount = 0, incorrectCount = 0, totalQuestions = 0 } = state;

  return (
    <div className="flex flex-col min-h-screen bg-blue-100">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-md flex flex-col items-center w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Quiz Done!</h1>
          <div className="flex flex-col w-full gap-4 mb-8">
            <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg border border-blue-100">
              <span className="font-semibold text-gray-700">Answered:</span>
              <span className="text-xl font-bold text-blue-600">
                {correctCount + incorrectCount} / {totalQuestions}
              </span>
            </div>
            <div className="flex justify-between items-center bg-green-50 p-4 rounded-lg border border-green-100">
              <span className="font-semibold text-gray-700">Correct:</span>
              <span className="text-xl font-bold text-green-600">{correctCount}</span>
            </div>
            <div className="flex justify-between items-center bg-red-50 p-4 rounded-lg border border-red-100">
              <span className="font-semibold text-gray-700">Incorrect:</span>
              <span className="text-xl font-bold text-red-600">{incorrectCount}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl w-full transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
