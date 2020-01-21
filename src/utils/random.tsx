import { COMBATANT_TYPE } from "./combat";

export function getRandomNumByMinMax(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomBooleanByProbability(probability: number) {
  return Math.random() <= probability;
}

export function getRandomMonsterType(): COMBATANT_TYPE {
  const eliteChance = 0.1;
  const bossChance = 0.01;
  const isElite = getRandomBooleanByProbability(eliteChance);
  const isBoss = getRandomBooleanByProbability(bossChance);

  if (isBoss) return COMBATANT_TYPE.BOSS_MONSTER;
  if (isElite) return COMBATANT_TYPE.ELITE_MONSTER;
  return COMBATANT_TYPE.NORMAL_MONSTER;
}

export function getRandomFlux(value: number): number {
  const min = Math.floor(value * 0.75);
  return getRandomNumByMinMax(min, value);
}