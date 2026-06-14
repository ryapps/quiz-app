export default function Timer({ secondsLeft }) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const formattedTime = `${String(minutes).padStart(
    2,
    '0'
  )}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="px-5 py-2 border border-red-500 rounded-md">
      <div className="font-semibold text-lg text-red-500">
         {formattedTime}
      </div>
    </div>
  );
}