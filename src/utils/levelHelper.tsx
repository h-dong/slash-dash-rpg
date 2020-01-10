export function getLevel(
  attack: number,
  strength: number,
  defence: number
): number {
  return Math.floor((attack + strength + defence) / 3);
}

export function generateStatsByLevel(level: number) {
  return {
    hp: level * 20,
    attack: level,
    strength: level,
    defence: level
  };
}
