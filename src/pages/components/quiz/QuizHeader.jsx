import { Navigate } from 'react-router-dom';
import { getName } from '../../../utils/localStorage';
import Timer from './Timer';

export default function QuizHeader({ timeLeft }) {
  const name = getName();
  if (!name) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }
  return (
    <header className="bg-white px-6 py-4 shadow-sm w-full flex justify-between items-center sticky top-0 z-10">
      <h2 className="font-semibold text-xl text-gray-700">Halo, {name}</h2>
      <Timer secondsLeft={timeLeft} />
    </header>
  );
}
