import React from "react";
import styled from "styled-components";

const LogWrapper = styled.div`
  min-height: 20rem;
  max-height: 20rem;
  overflow: auto;
  text-align: left;
`;

const LogsPanel = ({ logs }: { logs: string }) => (
  <div className="card bg-light border-secondary mb-3">
    <div className="card-header">Logs</div>
    <div className="card-body">
      <LogWrapper dangerouslySetInnerHTML={{ __html: logs }} />
    </div>
  </div>
);

export default LogsPanel;
