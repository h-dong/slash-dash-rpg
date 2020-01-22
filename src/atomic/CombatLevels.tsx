import React from "react";
import styled from "styled-components";

const Wrapper = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  //   width: 100%;
`;

type Props = {
  attack: number;
  strength: number;
  defence: number;
  movementSpeed?: number;
};

export default function CombatLevels({
  attack,
  strength,
  defence,
  movementSpeed
}: Props) {
  return (
    <Wrapper className="list-group list-group-horizontal">
      <li className="list-group-item">
        <span>Att: </span>
        <strong>{attack}</strong>
      </li>
      <li className="list-group-item">
        <span>Str: </span>
        <strong>{strength}</strong>
      </li>
      <li className="list-group-item">
        <span>Def: </span>
        <strong>{defence}</strong>
      </li>
      <li className="list-group-item">
        <span>Mv Speed: </span>
        <strong>{movementSpeed}</strong>
      </li>
    </Wrapper>
  );
}
