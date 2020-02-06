import React from "react";
import ProgressBar from "./ProgressBar";
import styled from "styled-components";
import {
  getLevelFromExp,
  getNextLevelExp,
  getCurrentLevelBaseExp
} from "../utils/levelHelper";
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
    color: green;
    margin-left: 0.5rem;
  }
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

function renderValue(value: number | string, xp: number) {
  let valueBlock = <strong>{value}</strong>;
  if (xp >= 0 && typeof value === "number") {
    const level = getLevelFromExp(xp);
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
  const level = getLevelFromExp(xp);
  const currentBaseExp = getCurrentLevelBaseExp(level);
  const nextLevelExp = getNextLevelExp(level);
  const current = xp - currentBaseExp;
  const goal = nextLevelExp - currentBaseExp;
  return (
    <ProgressBarWrapper>
      <Tooltip
        title={`Experience: ${current} / ${goal}`}
        position="top"
        trigger="mouseenter"
        key="drop"
        arrow
      >
        <ProgressBar now={current} max={goal} height="1rem" showText={false} />
      </Tooltip>
    </ProgressBarWrapper>
  );
}

function CharacterSkillStat({ label, value, xp = -1 }: Props) {
  return (
    <Wrapper>
      <StatsWrapper>
        <label>{label}</label>
        {renderValue(value, xp)}
      </StatsWrapper>
      {xp >= 0 && renderProgressBar(xp)}
    </Wrapper>
  );
}

export default CharacterSkillStat;
