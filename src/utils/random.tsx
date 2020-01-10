function getRandomNumByMinMax(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomBooleanByProbability(probability: number) {
  const randomNum = getRandomNumByMinMax(1, probability);
  return 1 === randomNum;
}

export { getRandomNumByMinMax, getRandomBooleanByProbability };
