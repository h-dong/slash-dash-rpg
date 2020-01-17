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
};

export default function CombatLevels({ attack, strength, defence }: Props) {
  return (
    <Wrapper className="list-group list-group-horizontal-sm">
      <li className="list-group-item">
        <span>Attack</span>&nbsp;
        <strong>{attack}</strong>
      </li>
      <li className="list-group-item">
        <span>Strength</span>&nbsp;
        <strong>{strength}</strong>
      </li>
      <li className="list-group-item">
        <span>Defence</span>&nbsp;
        <strong>{defence}</strong>
      </li>
    </Wrapper>
  );
}
