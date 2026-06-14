import { getName } from '../utils/localStorage';
import { Navigate } from 'react-router-dom';

export default function QuizPage() {
  const name = getName();
  if (!name) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="font-semibold">Welcome, {name}</h2>
    </div>
  );
}
