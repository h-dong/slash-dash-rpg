import React, { useState } from "react";
import styled from "styled-components";
import CollapseChevron from "../atomic/CollapseChevron";
import FULL_MONSTERS from "../database/monsters";
import {
  CharacterInterface,
  EquipmentsInterface
} from "../machines/GameMachine";
import { getLevel, calcCharacterStatsWithItems } from "../utils/levelHelper";
import ProgressBar from "../atomic/ProgressBar";
import CombatLevels from "../atomic/CombatLevels";
import {
  COMBATANT_TYPE,
  attackForOneRound,
  CombatResultsInterface
} from "../utils/combat";
import { MonsterCombatInterface } from "./WorldPanelCombatContainer";

const CardHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CombatProfile = styled.div`
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;

    img {
      width: 3rem;
      height: 3rem;
      padding: 0.25rem;
    }

    h6 {
      margin-left: 0.25rem;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1.5rem 0;
`;

type Props = {
  send: any;
  character: CharacterInterface;
  equipments: EquipmentsInterface;
  opponent: MonsterCombatInterface;
  monsterHealth: number;
  setMonsterHealth: React.Dispatch<React.SetStateAction<number>>;
  characterHealth: number;
  setCharacterHealth: React.Dispatch<React.SetStateAction<number>>;
};

const WorldPanelCombat = ({
  send,
  character,
  opponent,
  equipments,
  monsterHealth,
  setMonsterHealth,
  characterHealth,
  setCharacterHealth
}: Props) => {
  const [collapse, setCollapse] = useState<boolean>(false);
  const characterStatsWithItems = calcCharacterStatsWithItems(
    character,
    equipments
  );

  function attack() {
    const characterBattleStats = {
      ...characterStatsWithItems,
      combatantType: COMBATANT_TYPE.PLAYER
    };
    const results: CombatResultsInterface = attackForOneRound(
      characterBattleStats,
      opponent
    );
    const playerNewHealth = characterHealth - Number(results.damageRecieved);
    const monsterNewHealth = monsterHealth - results.damageDelt;
    if (playerNewHealth <= 0) {
      defeated();
      return;
    }
    if (monsterNewHealth <= 0) {
      won();
      return;
    }
    setMonsterHealth(monsterNewHealth);
    setCharacterHealth(playerNewHealth);
  }

  function won() {
    send({
      type: "WON_BATTLE",
      log: "You have won the battle! All hail the champion!"
    });
  }

  function defeated() {
    const fullMonster = FULL_MONSTERS.find(
      monster => monster.key === opponent.monsterKey
    );
    send({
      type: "LOST_BATTLE",
      log: `You have been defeated by ${fullMonster?.name} (level ${fullMonster?.level})`
    });
  }

  function escapeFromBattle() {
    send({
      type: "ESCAPE_BATTLE",
      log: "You ran away from battle like a coward..."
    });
  }

  function renderOpponent() {
    const fullMonster = FULL_MONSTERS.find(
      monster => monster.key === opponent.monsterKey
    );

    if (!fullMonster) return null;

    let monsterTypeText = "";
    let borderColour = "border-secondary";
    if (opponent.combatantType === COMBATANT_TYPE.ELITE_MONSTER) {
      borderColour = "border-warning";
      monsterTypeText = "Elite ";
    }
    if (opponent.combatantType === COMBATANT_TYPE.BOSS_MONSTER) {
      borderColour = "border-danger";
      monsterTypeText = "Boss ";
    }
    const title = `${monsterTypeText}${fullMonster.name} (Level ${fullMonster.level})`;

    return (
      <CombatProfile>
        <div className="header">
          <span className={`border ${borderColour}`}>
            <img alt={fullMonster.name} src={fullMonster.icon} />
          </span>
          <h6>{title}</h6>
        </div>
        <ProgressBar now={monsterHealth} max={opponent.health} />
        <CombatLevels
          attack={opponent.attack}
          strength={opponent.strength}
          defence={opponent.defence}
          movementSpeed={opponent.movementSpeed}
        />
      </CombatProfile>
    );
  }

  function renderActions() {
    return (
      <ButtonWrapper>
        <button className="btn btn-primary" onClick={() => attack()}>
          Attack
        </button>
        <button className="btn btn-warning" onClick={() => escapeFromBattle()}>
          Escape
        </button>
      </ButtonWrapper>
    );
  }

  function renderCharacter() {
    const level = getLevel(
      character.attack,
      character.strength,
      character.defence
    );
    const title = `${character.name} (Level ${level})`;
    return (
      <CombatProfile>
        <h6>{title}</h6>
        <ProgressBar now={characterHealth} max={character.health} />
        <CombatLevels
          attack={characterStatsWithItems.attack}
          strength={characterStatsWithItems.strength}
          defence={characterStatsWithItems.defence}
          movementSpeed={characterStatsWithItems.movementSpeed}
        />
      </CombatProfile>
    );
  }

  return (
    <div className="card border-secondary mb-3">
      <div className="card-header">
        <CardHeaderWrapper>
          <span>Fight!</span>
          <CollapseChevron collapse={collapse} setCollapse={setCollapse} />
        </CardHeaderWrapper>
      </div>
      {!collapse && (
        <div className="card-body">
          {renderOpponent()}
          {renderActions()}
          {renderCharacter()}
        </div>
      )}
    </div>
  );
};

export default WorldPanelCombat;
