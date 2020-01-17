import { getRandomNumByMinMax } from "./random";

interface CHARACTER {
  level: number;
  hp: number;
  attack: number;
  defence: number;
  strength: number;
}

const generateLevelStats = (character: CHARACTER) => {
  const newCharacter = {
    hp: character.hp ? character.hp : 0,
    attack: character.attack ? character.attack : 0,
    strength: character.strength ? character.strength : 0,
    defence: character.defence ? character.defence : 0
  };

  for (let i = 1; i <= character.level; i++) {
    if (!character.hp) newCharacter.hp += getRandomNumByMinMax(15, 20);
    if (!character.attack) newCharacter.attack += getRandomNumByMinMax(1, 10);
    if (!character.defence) newCharacter.defence += getRandomNumByMinMax(1, 10);
    if (!character.strength)
      newCharacter.strength += getRandomNumByMinMax(1, 10);
  }

  return {
    ...character,
    ...newCharacter
  };
};

export default generateLevelStats;
