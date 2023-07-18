import React, { useState, useContext, useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import EmbedTable from "../EmbedTable";

const queryDashboardId = "";

const PurchasesTable3 = ({ productMovementVisQid }) => {
  return (
    <Container fluid className="padding-0 innerTab middleHeight">
      <Tabs defaultActiveKey="comparison" className="inner" fill>
        <Tab eventKey="comparison" title="Trade/Generic Name">
          <EmbedTable queryId={productMovementVisQid} />
        </Tab>
        <Tab eventKey="AHFS/Fineline" title="AHFS/Fineline"></Tab>
        <Tab eventKey="GPI" title="GPI"></Tab>
        <Tab eventKey="manufacturer" title="Manufacturer"></Tab>
      </Tabs>
    </Container>
  );
};

export default PurchasesTable3;
