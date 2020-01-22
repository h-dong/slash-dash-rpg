import {
  getRandomNumByMinMax,
  getRandomBooleanByProbability,
  getRandomMonsterType,
  getRandomFlux
} from "./random";
import FULL_MONSTERS, { MONSTERS } from "../database/monsters";
import { generateStatsByLevel } from "./levelHelper";
import { BattleInterface } from "../machines/GameMachine";

/*
defence xp:
* block (2x dmg would have taken) or dmg taken (1x dmg)

strength xp:
* dmg delt * 2
* crit * 1

attack xp:
* land attack (attack level) + (50% * dmg delt)

*/

export enum COMBATANT_TYPE {
  PLAYER = "PLAYER",
  NORMAL_MONSTER = "NORMAL_MONSTER",
  ELITE_MONSTER = "ELITE_MONSTER",
  BOSS_MONSTER = "BOSS_MONSTER"
}

export interface CombatStatsInterface {
  health: number;
  attack: number;
  strength: number;
  defence: number;
  movementSpeed: number;
}

export interface CombatResultInterface {
  damage: number;
  blocked: boolean;
}

export interface CombatResultsInterface {
  damageDelt: number;
  blocked: boolean;
  damageRecieved: Number;
}

export function getMultiplierByCombatant(
  combatantType: COMBATANT_TYPE
): number {
  switch (combatantType) {
    case COMBATANT_TYPE.BOSS_MONSTER:
      // Ancient Instinct (boss) +100% of all level effect
      return 2;
    case COMBATANT_TYPE.ELITE_MONSTER:
      // Primal rage (elite) +50% of all level effect
      return 1.5;
    case COMBATANT_TYPE.PLAYER:
      // Protagonist blessing +20% of all level effect
      return 1.2;
    default:
      // +0%
      return 1;
  }
}

export function getStatsByMonsterKey(
  monsterKey: MONSTERS
): BattleInterface | null {
  const fullMonster = FULL_MONSTERS.find(monster => monster.key === monsterKey);
  if (!fullMonster) return null;

  const monsterType: COMBATANT_TYPE = getRandomMonsterType();
  const stats = generateStatsByLevel(fullMonster.level);
  const newStats = applyStatsBoosts(monsterType, stats);

  return {
    stats: newStats,
    combatantType: monsterType,
    monsterKey,
    health: newStats.health
  };
}

function applyStatsBoosts(
  combatantType: COMBATANT_TYPE,
  combatant: CombatStatsInterface
): CombatStatsInterface {
  const boosted = { ...combatant };
  const multiplier = getMultiplierByCombatant(combatantType);
  boosted.attack = Math.floor(boosted.attack * multiplier);
  boosted.defence = Math.floor(boosted.defence * multiplier);
  boosted.attack = Math.floor(boosted.attack * multiplier);
  return boosted;
}

function calcDamage(attackerStrength: number, defenderDefence: number): number {
  // always has a base damage
  const baseDamage = getRandomNumByMinMax(1, attackerStrength);
  // then depending on attacker's strength and defender's defence, there could be more damage
  const attackDamage = Math.floor(attackerStrength * 2 - defenderDefence);
  const damage = baseDamage + attackDamage;
  let critChance = Math.floor(2 + 10 * attackerStrength);
  // max crit 10%
  if (critChance > 10) critChance = 10;
  let isCrit = getRandomBooleanByProbability(critChance / 100);
  return isCrit ? damage * 2 : damage;
}

export function attackForOneRound(
  player: CombatStatsInterface,
  monster: CombatStatsInterface
): CombatResultsInterface {
  let damageDelt = 0;
  let blocked = false;
  let damageRecieved = 0;

  if (player.movementSpeed < monster.movementSpeed) {
    const monsterAttack: CombatResultInterface = fight(monster, player);
    const playerAttack: CombatResultInterface = fight(player, monster);
    damageDelt = playerAttack.damage;
    blocked = playerAttack.blocked;
    damageRecieved = monsterAttack.damage;
  } else {
    const playerAttack: CombatResultInterface = fight(player, monster);
    const monsterAttack: CombatResultInterface = fight(monster, player);
    damageDelt = playerAttack.damage;
    blocked = playerAttack.blocked;
    damageRecieved = monsterAttack.damage;
  }
  damageDelt = getRandomFlux(damageDelt);
  damageRecieved = getRandomFlux(damageRecieved);
  if (damageDelt < 0) damageDelt = 0;
  if (damageRecieved < 0) damageRecieved = 0;
  return {
    damageDelt,
    blocked,
    damageRecieved
  };
}

export default function fight(
  attackSide: CombatStatsInterface,
  defendSide: CombatStatsInterface
): CombatResultInterface {
  // block %: 5% + (10% * own defence) + item boosts (max 20%) (no dmg taken)
  const defendingSideBlockChance = Math.floor(
    (5 + 10 * defendSide.defence) * 100
  );

  let attackingSideStrikeChance = Math.floor(
    50 + Math.log(attackSide.attack * 2) - (100 - attackSide.movementSpeed)
  );

  // Max strike chance is 85%
  if (attackingSideStrikeChance > 85) attackingSideStrikeChance = 85;

  const damage = calcDamage(attackSide.strength, defendSide.strength);

  const landAttack = getRandomBooleanByProbability(
    Math.floor(attackingSideStrikeChance - defendingSideBlockChance) / 100
  );

  if (!landAttack) return { damage, blocked: true };

  return { damage, blocked: false };
}
