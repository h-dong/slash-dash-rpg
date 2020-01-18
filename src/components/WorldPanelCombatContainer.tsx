import React, { useState } from "react";
import WorldPanelCombat from "./WorldPanelCombat";
import {
  EquipmentsInterface,
  CharacterInterface
} from "../machines/GameMachine";
import FULL_MONSTERS, { MONSTERS } from "../database/monsters";
import { generateStatsByLevel } from "../utils/levelHelper";
import { getRandomMonsterType } from "../utils/random";
import { COMBATANT_TYPE } from "../utils/combat";

type Props = {
  send: any;
  character: CharacterInterface;
  equipments: EquipmentsInterface;
  monsterKey: MONSTERS | null;
};

export interface MonsterCombatInterface {
  monsterKey: MONSTERS;
  health: number;
  attack: number;
  strength: number;
  defence: number;
  movementSpeed: number;
  combatantType: COMBATANT_TYPE;
}

function generateMonsterStats(
  monsterKey: MONSTERS
): MonsterCombatInterface | null {
  const fullMonster = FULL_MONSTERS.find(monster => monster.key === monsterKey);

  if (!fullMonster) return null;

  const monsterStats = generateStatsByLevel(fullMonster.level);
  //   const multiplier = applyStatsBoosts(, monsterStats);
  //   const health = monsterStats.health * multiplier;
  //     const attack = monsterStats.attack * multiplier;
  //     const strength = monsterStats.strength * multiplier;
  //     const defence = monsterStats.defence * multiplier;
  const monsterType: COMBATANT_TYPE = getRandomMonsterType();

  return {
    ...monsterStats,
    combatantType: monsterType,
    monsterKey: monsterKey
  };
}

export default function WorldPanelCombatContainer(props: Props) {
  const [monsterHealth, setMonsterHealth] = useState<number>(0);
  const [characterHealth, setCharacterHealth] = useState<number>(
    props.character.health
  );

  if (!props.monsterKey) return null;

  const monsterObj = generateMonsterStats(props.monsterKey);
  if (monsterHealth === 0) setMonsterHealth(monsterObj?.health || 0);

  if (!monsterObj) return null;

  const combinedProps = {
    ...props,
    opponent: monsterObj,
    monsterHealth,
    setMonsterHealth,
    characterHealth,
    setCharacterHealth
  };

  return <WorldPanelCombat {...combinedProps} />;
}
