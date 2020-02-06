import {
  getRandomNumByMinMax,
  getRandomBooleanByProbability,
  getRandomMonsterType,
  getRandomFlux
} from "./random";
import FULL_MONSTERS, { MONSTER } from "../database/monsters";
import { generateStatsByLevel } from "./levelHelper";
import { BattleInterface } from "../machines/GameMachine";

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
  missed: boolean;
  damageRecieved: number;
}

export function getDefenceExp(
  blocked: boolean,
  damageRecieved: number
): number {
  return blocked ? damageRecieved * 2 : Math.floor(damageRecieved * 0.5);
}

export function getAttackExp(missed: boolean, damageDelt: number): number {
  let exp = Math.ceil(damageDelt * 0.6);
  if (exp < 1) exp = 1;
  return missed ? 0 : exp;
}

export function getStrengthExp(damageDelt: number): number {
  const exp = Math.ceil(damageDelt * 0.2);
  return exp < 1 ? 1 : exp;
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
  monsterKey: MONSTER
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
  const baseDamage = getRandomNumByMinMax(1, attackerStrength + 1);
  // then depending on attacker's strength and defender's defence, there could be more damage
  let attackDamage = Math.floor(attackerStrength - defenderDefence);

  if (attackDamage < 0) attackDamage = 0;

  const damage = baseDamage + attackDamage;
  let critChance = Math.floor(2 + 10 * attackerStrength);
  // max crit 10%
  if (critChance > 10) critChance = 10;
  let isCrit = getRandomBooleanByProbability(critChance / 100);
  return isCrit ? Math.floor(damage * 1.5) : damage;
}

export function attackForOneRound(
  player: CombatStatsInterface,
  monster: CombatStatsInterface
): CombatResultsInterface {
  let damageDelt = 0;
  let blocked = false;
  let missed = false;
  let damageRecieved = 0;

  if (player.movementSpeed < monster.movementSpeed) {
    const monsterAttack: CombatResultInterface = fight(monster, player);
    const playerAttack: CombatResultInterface = fight(player, monster);
    damageDelt = playerAttack.damage;
    missed = playerAttack.blocked;
    blocked = monsterAttack.blocked;
    damageRecieved = monsterAttack.damage;
  } else {
    const playerAttack: CombatResultInterface = fight(player, monster);
    const monsterAttack: CombatResultInterface = fight(monster, player);
    damageDelt = playerAttack.damage;
    missed = playerAttack.blocked;
    blocked = monsterAttack.blocked;
    damageRecieved = monsterAttack.damage;
  }
  damageDelt = getRandomFlux(damageDelt);
  damageRecieved = getRandomFlux(damageRecieved);
  if (damageDelt < 0) damageDelt = 0;
  if (damageRecieved < 0) damageRecieved = 0;
  return {
    damageDelt,
    blocked,
    missed,
    damageRecieved
  };
}

export default function fight(
  attackSide: CombatStatsInterface,
  defendSide: CombatStatsInterface
): CombatResultInterface {
  const damage = calcDamage(attackSide.strength, defendSide.strength);
  let strikeChange =
    (80 +
      attackSide.attack * 2 -
      defendSide.defence +
      defendSide.movementSpeed * 0.1) /
    100;

  // Max strike chance is 85%
  if (strikeChange > 0.85) strikeChange = 0.85;

  // Min strike changce is 10%
  if (strikeChange < 0.05) strikeChange = 0.05;

  const landAttack = getRandomBooleanByProbability(strikeChange);

  return { damage, blocked: !landAttack };
}
