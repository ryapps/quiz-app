export const getName = () => {
  return localStorage.getItem('name');
};

export const removeName = () => {
  localStorage.removeItem('name');
};