import React, { useState } from "react";
import styled from "styled-components";
import CollapseChevron from "../atomic/CollapseChevron";
import FULL_MONSTERS, { MonsterDropInterface } from "../database/monsters";
import {
  CharacterInterface,
  EquipmentsInterface,
  BattleInterface
} from "../machines/GameMachine";
import { getLevel, calcCharacterStatsWithItems } from "../utils/levelHelper";
import ProgressBar from "../atomic/ProgressBar";
import CombatLevels from "../atomic/CombatLevels";
import { attackForOneRound, CombatResultsInterface } from "../utils/combat";
import {
  getMonsterNameWithCombatantType,
  getMonsterBorderColour
} from "../utils/monster";
import {
  getRandomNumByMinMax,
  getRandomBooleanByProbability
} from "../utils/random";

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
  battle: BattleInterface;
  character: CharacterInterface;
  equipments: EquipmentsInterface;
};

const WorldPanelCombat = ({ send, battle, character, equipments }: Props) => {
  const [collapse, setCollapse] = useState<boolean>(false);
  const monster = battle;
  const fullMonster = FULL_MONSTERS.find(
    elem => elem.key === battle.monsterKey
  );
  const characterStatsWithItems = calcCharacterStatsWithItems(
    character,
    equipments
  );

  if (!fullMonster) return null;

  function attack() {
    const results: CombatResultsInterface = attackForOneRound(
      { ...characterStatsWithItems, health: character.health.current },
      { ...monster.stats, health: monster.health }
    );
    const playerNewHealth =
      character.health.current - Number(results.damageRecieved);
    const monsterNewHealth = monster.health - results.damageDelt;
    if (playerNewHealth <= 0) {
      defeated();
      return;
    }
    if (monsterNewHealth <= 0) {
      won();
      return;
    }
    send({
      type: "UPDATE_BATTLE",
      playerHealth: playerNewHealth,
      monsterHealth: monsterNewHealth,
      log: `You have dealt ${results.damageDelt} damage, and recieved ${results.damageRecieved} damage.`
    });
    send({
      type: "ADD_LOG",
      log: "You have won the battle! All hail the champion!"
    });
  }

  function won() {
    const drops = fullMonster?.drops
      .filter((drop: MonsterDropInterface) =>
        getRandomBooleanByProbability(drop.rarity)
      )
      .map((drop: MonsterDropInterface) => ({
        itemKey: drop.itemKey,
        quantity: getRandomNumByMinMax(drop.quantity.min, drop.quantity.max)
      }));

    send({
      type: "WON_BATTLE",
      log: "You have won the battle! All hail the champion!",
      monsterKey: monster.monsterKey,
      drops
    });
  }

  function defeated() {
    const title = getMonsterNameWithCombatantType(
      monster.monsterKey,
      monster.combatantType
    );
    send({
      type: "LOST_BATTLE",
      log: `You have been defeated by ${title} (level ${fullMonster?.level})`
    });
  }

  function escapeFromBattle() {
    send({
      type: "ESCAPE_BATTLE",
      log: "You ran away from battle like a coward..."
    });
  }

  function renderOpponent() {
    const borderColour = getMonsterBorderColour(monster.combatantType);
    const name = getMonsterNameWithCombatantType(
      monster.monsterKey,
      monster.combatantType
    );

    return (
      <CombatProfile>
        <div className="header">
          <span className={`border ${borderColour}`}>
            <img alt={fullMonster?.name} src={fullMonster?.icon} />
          </span>
          <h6>{`${name} (Level ${fullMonster?.level})`}</h6>
        </div>
        <ProgressBar now={monster.health} max={monster.stats.health} />
        <CombatLevels
          attack={monster.stats.attack}
          strength={monster.stats.strength}
          defence={monster.stats.defence}
          movementSpeed={monster.stats.movementSpeed}
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
        <ProgressBar
          now={character.health.current}
          max={character.health.max}
        />
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
