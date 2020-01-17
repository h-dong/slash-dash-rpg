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
  const level = Math.floor((attack + strength + defence) / 3 / 3);
  if (level < 1) return 1;
  if (level > 10) return 10;
  return level;
}

export function getHealth(
  attack: number,
  strength: number,
  defence: number
): number {
  return Math.floor(((attack + strength + defence) / 3) * 10);
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
