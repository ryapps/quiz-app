export const getName = () => {
  return localStorage.getItem('name');
};

export const removeName = () => {
  localStorage.removeItem('name');
};

export const getQuizState = () => {
  try {
    const state = localStorage.getItem('quizState');
    return state ? JSON.parse(state) : null;
  } catch {
    return null;
  }
};

export const saveQuizState = (state) => {
  try {
    localStorage.setItem('quizState', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving quiz state:', error);
  }
};

export const clearQuizState = () => {
  localStorage.removeItem('quizState');
};
