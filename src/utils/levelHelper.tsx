import { getRandomNumByMinMax } from "./random";
import { calcEquipmentsBonusStats } from "./itemHelper";
import {
  CharacterInterface,
  EquipmentsInterface
} from "../machines/GameMachine";

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
    defence: getRandomNumByMinMax(minLevel, maxLevel),
    movementSpeed: getRandomNumByMinMax(-50, 50)
  };
}

export function calcCharacterStatsWithItems(
  character: CharacterInterface,
  equipments: EquipmentsInterface
) {
  const equipmentBonusStats = calcEquipmentsBonusStats(equipments);
  const attack = character.attack + Number(equipmentBonusStats?.attack);
  const strength = character.strength + Number(equipmentBonusStats?.strength);
  const defence = character.defence + Number(equipmentBonusStats?.defence);
  const movementSpeed = 0 + Number(equipmentBonusStats?.movementSpeed);
  return { attack, strength, defence, movementSpeed };
}
