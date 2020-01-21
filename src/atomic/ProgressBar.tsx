import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  font-size: 1rem;
  font-weight: bold;
  height: 1.5rem;
`;

type Props = {
  now: number;
  max: number;
};

export default function ProgressBar({ now, max }: Props) {
  const text = `${now}/${max}`;
  const percentage = Math.floor((now / max) * 100);
  let colour = "bg-success";
  if (percentage <= 60) colour = "bg-warning";
  if (percentage <= 20) colour = "bg-danger";

  return (
    <Wrapper className="progress">
      <div
        className={`progress-bar ${colour}`}
        role="progressbar"
        style={{ width: `${percentage}%` }}
        aria-valuenow={now}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        {text}
      </div>
    </Wrapper>
  );
}
