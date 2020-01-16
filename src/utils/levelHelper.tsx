import { getRandomNumByMinMax } from "./random";

/*
Monster stats = level * 2
Player stats = level * 3
*/

export function getLevel(
  attack: number,
  strength: number,
  defence: number
): number {
  // divide by 9 = 3 stats * 3 stat levels
  return Math.floor((attack + strength + defence) / 3 / 3);
}

export function generateStatsByLevel(level: number) {
  let minLevel = level === 1 ? level : level - 1;
  let maxLevel = level + 1;

  return {
    hp: getRandomNumByMinMax(minLevel, maxLevel) * 20,
    attack: getRandomNumByMinMax(minLevel, maxLevel),
    strength: getRandomNumByMinMax(minLevel, maxLevel),
    defence: getRandomNumByMinMax(minLevel, maxLevel)
  };
}
