export default function QuestionCard({ question, options, onSelectOption, currentQuestionIndex, totalQuestions }) {
  return (
    <div className="w-full max-w-4xl mx-auto mt-4 px-4">
      <div className="relative bg-white rounded-xl shadow-sm p-6 md:p-10 pt-10 md:pt-12 mb-6 border-t-4 border-blue-500 mt-6">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-md text-gray-700 font-bold text-sm md:text-base border border-blue-200 px-6 py-2 whitespace-nowrap">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 leading-relaxed">{question}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {options.map((option, index) => (
          <button
            key={index}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold rounded-xl p-6 min-h-[120px] text-xl md:text-2xl transition-all shadow-sm"
            onClick={() => onSelectOption(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
