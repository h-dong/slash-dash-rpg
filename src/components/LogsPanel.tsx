import React, { useState } from "react";
import styled from "styled-components";
import CollapseChevron from "../atomic/CollapseChevron";

const CardHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LogWrapper = styled.div`
  min-height: 20rem;
  max-height: 20rem;
  overflow: auto;
  text-align: left;
`;

const LogsPanel = ({ logs }: { logs: string }) => {
  const [collapse, setCollapse] = useState<boolean>(false);

  return (
    <div className="card bg-light border-secondary mb-3">
      <div className="card-header">
        <CardHeaderWrapper>
          <span>Logs</span>
          <CollapseChevron collapse={collapse} setCollapse={setCollapse} />
        </CardHeaderWrapper>
      </div>
      {!collapse && (
        <div className="card-body">
          <LogWrapper dangerouslySetInnerHTML={{ __html: logs }} />
        </div>
      )}
    </div>
  );
};

export default LogsPanel;
