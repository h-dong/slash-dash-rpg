import { getRandomNumByMinMax } from "./random";
import { calcEquipmentsBonusStats } from "./itemHelper";
import {
  CharacterInterface,
  EquipmentsInterface
} from "../machines/GameMachine";
import { LEVEL_XP } from "../database/experience";

/*
Monster stats = level * 2
Player stats = level * 3
*/

export function getLevelFromExp(xp: number): number {
  let level: number = 1;

  LEVEL_XP.forEach((elem, index) => {
    if (xp >= elem) level = index + 1;
  });

  return level;
}

export function getMaxExp(): number {
  return LEVEL_XP[LEVEL_XP.length - 1];
}

export function getMaxLevel(): number {
  return getLevelFromExp(getMaxExp());
}

export function getCurrentLevelBaseExp(level: number): number {
  return LEVEL_XP[level - 1];
}

export function getPreviousLevelExp(level: number): number {
  return level > 1 ? LEVEL_XP[level - 2] : 0;
}

export function getNextLevelExp(level: number): number {
  return level < getMaxLevel() ? LEVEL_XP[level] : getMaxExp();
}

export function getLevel(
  attack: number,
  strength: number,
  defence: number
): number {
  // divide by 3, average stats level
  const allStatsLevels =
    getLevelFromExp(attack) +
    getLevelFromExp(strength) +
    getLevelFromExp(defence);
  const level: number = Math.floor(allStatsLevels / 3);
  if (level < 1) return 1;
  const maxLevel = getMaxLevel();
  if (level > maxLevel) return maxLevel;
  return level;
}

export function getHealthByLevel(level: number): number {
  return level * 20;
}

export function generateStatsByLevel(level: number) {
  let minLevel = level === 1 ? level : level - 1;
  let maxLevel = level + 1;

  return {
    health: level * 20,
    attack: getRandomNumByMinMax(minLevel, maxLevel),
    strength: getRandomNumByMinMax(minLevel, maxLevel),
    defence: getRandomNumByMinMax(minLevel, maxLevel),
    movementSpeed: getRandomNumByMinMax(-50, 50)
  };
}

export function calcExpGain(currentExp: number, addExp: number): number {
  let newExp = currentExp;
  const maxLevelExp = getMaxExp();

  if (currentExp < maxLevelExp) {
    if (currentExp + addExp <= maxLevelExp) {
      newExp = currentExp + addExp;
    } else {
      newExp = maxLevelExp;
    }
  }

  return newExp;
}

export function calcCharacterStatsWithItems(
  character: CharacterInterface,
  equipments: EquipmentsInterface
) {
  const equipmentBonusStats = calcEquipmentsBonusStats(equipments);
  const attack =
    getLevelFromExp(character.attack) + Number(equipmentBonusStats?.attack);
  const strength =
    getLevelFromExp(character.strength) + Number(equipmentBonusStats?.strength);
  const defence =
    getLevelFromExp(character.defence) + Number(equipmentBonusStats?.defence);
  const movementSpeed = 0 + Number(equipmentBonusStats?.movementSpeed);
  return { attack, strength, defence, movementSpeed };
}
