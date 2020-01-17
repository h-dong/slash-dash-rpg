import { getRandomNumByMinMax, getRandomBooleanByProbability } from "./random";

/*
Protagonist blessing +20% of all level effect
(normal) +0% of all level effect
Primal rage (elite) +30% of one level effect, +50% of two level effect, +100% of one level effect, 
Ancient Instinct (boss) +100% of all level effect

Attack speed: 100% + item boosts

Strike: 50% + log(attack * 2) (max 85%)
Damage: (own strength * 2) + own item boosts - opponent defence - opponent item block boosts
Crit %: 5% + (10% * own strength) + item boosts (max 50%) (dmg * 2)
block %: 5% + (10% * own defence) + item boosts (max 20%) (no dmg taken)
Damage Taken: (opponent strength * 5) + item boosts - own defence

defence xp:
* block (2x dmg would have taken) or dmg taken (1x dmg)

strength xp:
* dmg delt * 2
* crit * 1

attack xp:
* land attack (attack level) + (50% * dmg delt)

*/

// function exchangeAttacks() {}

// function fight(characterA, characterB) {
//   while (characterA.hp > 0 && characterB.hp > 0) {
//     exchangeAttacks();
//   }
// }

// export default fight;

export enum COMBATANT_TYPE {
  PLAYER = "PLAYER",
  NORMAL_MONSTER = "NORMAL_MONSTER",
  ELITE_MONSTER = "ELITE_MONSTER",
  BOSS_MONSTER = "BOSS_MONSTER"
}

interface CombatantInterface {
  attack: number;
  strength: number;
  defence: number;
  movementSpeed: number;
  combatantType: COMBATANT_TYPE;
}

interface CombatResultInterface {
  damage: number;
  blocked: boolean;
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

function applyStatsBoosts(combatant: CombatantInterface): CombatantInterface {
  const boostedCombatant = { ...combatant };
  const multiplier = getMultiplierByCombatant(combatant.combatantType);
  boostedCombatant.attack = Math.floor(boostedCombatant.attack * multiplier);
  boostedCombatant.defence = Math.floor(boostedCombatant.defence * multiplier);
  boostedCombatant.attack = Math.floor(boostedCombatant.attack * multiplier);
  return boostedCombatant;
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

export default function fight(
  attackSide: CombatantInterface,
  defendSide: CombatantInterface
): CombatResultInterface {
  const boostedAttackSide = applyStatsBoosts(attackSide);
  const boostedDefendSide = applyStatsBoosts(defendSide);

  // block %: 5% + (10% * own defence) + item boosts (max 20%) (no dmg taken)
  const defendingSideBlockChance = Math.floor(
    (5 + 10 * boostedDefendSide.defence) * 100
  );

  let attackingSideStrikeChance = Math.floor(
    50 +
      Math.log(boostedAttackSide.attack * 2) -
      (100 - attackSide.movementSpeed)
  );

  // Max strike chance is 85%
  if (attackingSideStrikeChance > 85) attackingSideStrikeChance = 85;

  const damage = calcDamage(
    boostedAttackSide.strength,
    boostedDefendSide.strength
  );

  const landAttack = getRandomBooleanByProbability(
    Math.floor(attackingSideStrikeChance - defendingSideBlockChance) / 100
  );

  if (!landAttack) return { damage, blocked: true };

  return { damage, blocked: false };
}
