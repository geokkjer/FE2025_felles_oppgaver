const getScore = (score) => {
  if (!score) {
    score = 0;
  }
  return `${score}`;
};

export default (targetElement, { score }) => {
  const newScore = targetElement.cloneNode(true);
  newScore.textContent = getScore(score);
  return newScore;
};
