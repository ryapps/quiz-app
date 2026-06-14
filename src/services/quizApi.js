import axios from 'axios';

function decodeText(text) {
  const element = document.createElement('textarea');
  element.innerHTML = text;
  return element.value;
}

function shuffleAnswers(answers) {
  const shuffled = [...answers];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[i],
    ];
  }

  return shuffled;
}

export async function fetchQuizQuestions() {
  const { data } = await axios.get(
    'https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple'
  );

  return data.results.map((item) => {
    const answers = shuffleAnswers([
      ...item.incorrect_answers,
      item.correct_answer,
    ]);

    return {
      question: decodeText(item.question),
      options: answers.map(decodeText),
      correctAnswer: decodeText(item.correct_answer),
    };
  });
}