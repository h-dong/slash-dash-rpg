import FULL_MONSTERS, { MONSTER } from "../database/monsters";
import { COMBATANT_TYPE } from "./combat";

export function getMonsterNameWithCombatantType(
  monsterKey: MONSTER,
  combatantType: COMBATANT_TYPE
): string {
  const fullMonster = FULL_MONSTERS.find(elem => elem.key === monsterKey);
  if (!fullMonster) return "";
  if (combatantType === COMBATANT_TYPE.ELITE_MONSTER)
    return `${fullMonster.name} [Elite]`;
  if (combatantType === COMBATANT_TYPE.BOSS_MONSTER)
    return `${fullMonster.name} [Boss]`;
  return fullMonster.name;
}

export function getMonsterBorderColour(combatantType: COMBATANT_TYPE): string {
  if (combatantType === COMBATANT_TYPE.ELITE_MONSTER) {
    return "border-warning";
  }
  if (combatantType === COMBATANT_TYPE.BOSS_MONSTER) {
    return "border-danger";
  }
  return "border-secondary";
}
