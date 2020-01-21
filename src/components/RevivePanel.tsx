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
        <div className="card-body text-center">
          <p>
            You opened your eyes and seems to be robbed and thrown out in the
            wild.
          </p>
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={() => send({ type: "REVIVE" })}
          >
            Find a way out
          </button>
        </div>
      )}
    </div>
  );
}
