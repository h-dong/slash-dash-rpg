import React from "react";
import ProgressBar from "./ProgressBar";
import { LEVEL_XP } from "../database/experience";
import styled from "styled-components";
import { getLevelFromXP } from "../utils/levelHelper";
import { Tooltip } from "react-tippy";

type Props = {
  label: string;
  value: number | string;
  xp?: number;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.6rem 0;
`;

const StatsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;

  &:first-child {
    text-align: left;
  }

  &:last-child {
    text-align: right;
    padding-bottom: 0.25rem;
  }
`;

const ValueWrapper = styled.strong`
  display: flex;
  align-items: center;

  small {
    font-weight: bold;
    color: red;
    margin-left: 0.5rem;
  }
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

function renderValue(value: number | string, xp: number | undefined) {
  let valueBlock = <strong>{value}</strong>;
  if (xp && typeof value === "number") {
    const level = getLevelFromXP(xp);
    if (level !== value) {
      valueBlock = (
        <ValueWrapper>
          <div>{level}</div>
          <small>{`( +${Number(value) - level} )`}</small>
        </ValueWrapper>
      );
    }
  }
  return valueBlock;
}

function renderProgressBar(xp: number) {
  const level = getLevelFromXP(xp);
  const nextLevelXp = LEVEL_XP[level - 1];
  return (
    <ProgressBarWrapper>
      <Tooltip
        title={`Experience: ${xp} / ${nextLevelXp}`}
        position="top"
        trigger="mouseenter"
        key="drop"
        arrow
      >
        <ProgressBar
          now={xp}
          max={nextLevelXp}
          height="1rem"
          showText={false}
        />
      </Tooltip>
    </ProgressBarWrapper>
  );
}

function CharacterSkillStat({ label, value, xp }: Props) {
  return (
    <Wrapper>
      <StatsWrapper>
        <label>{label}</label>
        {renderValue(value, xp)}
      </StatsWrapper>
      {xp && renderProgressBar(xp)}
    </Wrapper>
  );
}

export default CharacterSkillStat;
