import {
  getRandomNumByMinMax,
  getRandomBooleanByProbability,
  getRandomMonsterType,
  getRandomFlux,
  getRandomAttackType
} from "./random";
import FULL_MONSTERS, { MONSTER } from "../database/monsters";
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

export enum AttackType {
  quick = "QUICK_ATTACK",
  normal = "NORMAL_ATTACK",
  strong = "STRONG_ATTACK",
  defensive = "DEFENSIVE_ATTACK"
}

export enum AttackOutcome {
  miss = "miss",
  block = "block",
  hit = "hit",
  crit = "crit"
}

const COMBAT_MODIFIERS = {
  QUICK_ATTACK: {
    hit: 1.25, // quick attacks are harder to react to
    damage: 0.75, // deal less damage
    crit: 1.25, // more likely to crit
    block: 1 // keep you steady on your feet
  },
  NORMAL_ATTACK: {
    hit: 1,
    damage: 1,
    crit: 1,
    block: 1
  },
  STRONG_ATTACK: {
    hit: 0.75, // strong attacks are easier to react to
    damage: 2, // deal a lot more damage
    crit: 1, 
    block: 0 // prevent you from blocking
  },
  DEFENSIVE_ATTACK: {
    hit: 1,
    damage: 0.5,
    crit: 0.75,
    block: 2 
  }
}

export interface CombatStatsInterface {
  health: number;
  attack: number;
  strength: number;
  defence: number;
  movementSpeed: number;
  attackType: AttackType;
}

export interface AttackResultInterface {
  outcome: AttackOutcome;
  damage: number;
}

export interface CombatResultsInterface {
  damageDealt: number;
  playerAttackOutcome: AttackOutcome;
  damageReceived: number;
  monsterAttackOutcome: AttackOutcome;
  playerAttacksFirst: boolean;
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

function calcDamage(attacker: CombatStatsInterface, defender: CombatStatsInterface, attackOutcome: AttackOutcome): number {
  // always has a base damage based on strength;
  const baseDamage = getRandomNumByMinMax(attacker.strength * 0.5, attacker.strength);
  // then depending on attacker's strength and defender's defence, there could be more damage
  const strengthVersusDefence = attacker.strength - defender.defence;
  const attackerDamageModifier = COMBAT_MODIFIERS[attacker.attackType].damage
  const modifiedDamage = (baseDamage + strengthVersusDefence) * attackerDamageModifier;
  // Add some randomnesness
  const finalDamage = getRandomNumByMinMax(modifiedDamage * 0.75, modifiedDamage * 1.25);
  if (attackOutcome === AttackOutcome.block) {
    return finalDamage * 0.5;
  } else if (attackOutcome === AttackOutcome.crit) {
    return finalDamage * 2;
  }
  return finalDamage;
}

export function combat(
  player: CombatStatsInterface,
  monster: CombatStatsInterface,
): CombatResultsInterface {
  let damageDealt = 0;
  let blocked = false;
  let damageReceived = 0;
  console.log(monster.attackType)

  const playerAttacksFirst = player.movementSpeed > monster.movementSpeed
  monster.attackType = getRandomAttackType();
  const monsterAttackOutcome: AttackOutcome = attack(monster, player);
  const playerAttackOutcome: AttackOutcome = attack(player, monster);
  damageDealt = playerAttackOutcome === AttackOutcome.miss ? 0 : calcDamage(player, monster, playerAttackOutcome);
  damageReceived = monsterAttackOutcome === AttackOutcome.miss ? 0 : calcDamage(monster, player, monsterAttackOutcome);
  console.log(playerAttackOutcome, monsterAttackOutcome);
  return {
    damageDealt,
    playerAttackOutcome,
    damageReceived,
    monsterAttackOutcome,
    playerAttacksFirst
  };
}

const getHitChance = (attacker: CombatStatsInterface, defender: CombatStatsInterface) => {
  const baseChance = 85;
  const speedDiff = attacker.movementSpeed - defender.movementSpeed;
  const attackerHitModifier = COMBAT_MODIFIERS[attacker.attackType].hit;
  return (baseChance + speedDiff) * attackerHitModifier;
}

const getBlockChance = (attacker: CombatStatsInterface, defender: CombatStatsInterface) => {
  const baseChance = 5;
  const defenceCoefficient = 10;
  if (defender.defence < attacker.attack) {
    return 0;
  }
  const defenceVersusAttack = defender.defence - attacker.attack + 1;
  const defenderBlockModifier = COMBAT_MODIFIERS[defender.attackType].block;
  return (baseChance + defenceVersusAttack * defenceCoefficient) * defenderBlockModifier;
}

const getAttackTable = (hitChance: number, blockChance: number, critChance: number): AttackOutcome  => {
  /*
    Shamelessly copying the attack table from World of Warcraft - attack can first miss, then be blocked, then crit. If all of these fail,
    then the attack is a normal hit. This ensures that the crit chance and block chance are realistic and not just counted for the attacks that
    actually land.
  */
  const roll = Math.random() * 100;
  console.log(roll, hitChance);
  if (roll > hitChance) {
    return AttackOutcome.miss
  } else if (roll > hitChance - blockChance) {
    return AttackOutcome.block
  } else if (roll > hitChance - blockChance - critChance) {
    return AttackOutcome.crit
  }
  return AttackOutcome.hit
}

const getCritChance = (attacker: CombatStatsInterface, defender: CombatStatsInterface) => {
  const baseChance = 5;
  const attackCoefficient = 5;
  const defenceCoefficient = 2;
  const attackerCritModifier = COMBAT_MODIFIERS[attacker.attackType].crit;
  return (baseChance + attacker.attack * attackCoefficient - defender.defence * defenceCoefficient) * attackerCritModifier;
}

export default function attack(
  attackSide: CombatStatsInterface,
  defendSide: CombatStatsInterface
): AttackOutcome {
  console.log(attackSide, defendSide);
  // block %: 5% + (10% * own defence) + item boosts (max 20%) (no dmg taken)
  const hitChance = getHitChance(attackSide, defendSide);
  const blockChance = getBlockChance(attackSide, defendSide);
  const critChance = getCritChance(attackSide, defendSide);
  return getAttackTable(hitChance, blockChance, critChance);
};
