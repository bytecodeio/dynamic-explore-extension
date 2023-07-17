import React, { useState, useContext, useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import EmbedTable from "../EmbedTable";

const queryDashboardId = "";

const PurchasesTable5 = ({ productMovementVisQid }) => {
  return (
    <Container fluid className="padding-0 innerTab smallerHeight">
      <EmbedTable queryId={productMovementVisQid} />
    </Container>
  );
};

export default PurchasesTable5;
