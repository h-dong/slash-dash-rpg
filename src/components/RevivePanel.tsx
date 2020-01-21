import React, { useState } from "react";
import styled from "styled-components";
import CollapseChevron from "../atomic/CollapseChevron";

const CardHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

type Props = {
  send: any;
};

export default function RevivePanel({ send }: Props) {
  const [collapse, setCollapse] = useState<boolean>(false);

  return (
    <div className="card border-secondary mb-3">
      <div className="card-header">
        <CardHeaderWrapper>
          <span>Revive</span>
          <CollapseChevron collapse={collapse} setCollapse={setCollapse} />
        </CardHeaderWrapper>
      </div>
      {!collapse && (
        <div className="card-body">
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={() => send({ type: "REVIVE" })}
          >
            Revive Me
          </button>
        </div>
      )}
    </div>
  );
}
