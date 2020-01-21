import FULL_MONSTERS, { MONSTERS } from "../database/monsters";
import { COMBATANT_TYPE } from "./combat";

export function getMonsterNameWithCombatantType(
  monsterKey: MONSTERS,
  combatantType: COMBATANT_TYPE
): string {
  const fullMonster = FULL_MONSTERS.find(elem => elem.key === monsterKey);
  if (!fullMonster) return "";
  if (combatantType === COMBATANT_TYPE.ELITE_MONSTER)
    return `${COMBATANT_TYPE.ELITE_MONSTER} ${fullMonster.name}`;
  if (combatantType === COMBATANT_TYPE.BOSS_MONSTER)
    return `${COMBATANT_TYPE.BOSS_MONSTER} ${fullMonster.name}`;
  return fullMonster.name;
}
