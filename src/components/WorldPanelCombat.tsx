import React, { useState } from "react";
import styled from "styled-components";
import CollapseChevron from "../atomic/CollapseChevron";
import FULL_MONSTERS, { MONSTERS } from "../database/monsters";
import {
  CharacterInterface,
  EquipmentsInterface
} from "../machines/GameMachine";
import {
  getLevel,
  generateStatsByLevel,
  calcCharacterStatsWithItems
} from "../utils/levelHelper";
import ProgressBar from "../atomic/ProgressBar";
import CombatLevels from "../atomic/CombatLevels";
import { getRandomMonsterType } from "../utils/random";
import { getMultiplierByCombatant, COMBATANT_TYPE } from "../utils/combat";

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
  character: CharacterInterface;
  equipments: EquipmentsInterface;
  opponent: MONSTERS | null;
};

const WorldPanelCombat = ({ character, opponent, equipments }: Props) => {
  const [collapse, setCollapse] = useState<boolean>(false);

  function renderOpponent() {
    const fullMonster = FULL_MONSTERS.find(monster => monster.key === opponent);

    if (!fullMonster) return null;

    const monsterStats = generateStatsByLevel(fullMonster.level);
    const monsterType: COMBATANT_TYPE = getRandomMonsterType();
    const monsterMultiplier = getMultiplierByCombatant(monsterType);
    const attack = Math.floor(monsterStats.attack * monsterMultiplier);
    const strength = Math.floor(monsterStats.strength * monsterMultiplier);
    const defence = Math.floor(monsterStats.defence * monsterMultiplier);
    let monsterTypeText = "";
    let borderColour = "border-secondary";
    if (monsterType === COMBATANT_TYPE.ELITE_MONSTER) {
      borderColour = "border-warning";
      monsterTypeText = "Elite ";
    }
    if (monsterType === COMBATANT_TYPE.BOSS_MONSTER) {
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
        <ProgressBar now={monsterStats.hp} max={monsterStats.hp} />
        <CombatLevels
          attack={attack}
          strength={strength}
          defence={defence}
          movementSpeed={monsterStats.movementSpeed}
        />
      </CombatProfile>
    );
  }

  function renderActions() {
    return (
      <ButtonWrapper>
        <button className="btn btn-primary">Attack</button>
        <button className="btn btn-warning">Escape</button>
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
    const {
      attack,
      strength,
      defence,
      movementSpeed
    } = calcCharacterStatsWithItems(character, equipments);
    return (
      <CombatProfile>
        <h6>{title}</h6>
        <ProgressBar now={character.health} max={character.health} />
        <CombatLevels
          attack={attack}
          strength={strength}
          defence={defence}
          movementSpeed={movementSpeed}
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
