import React, { useState, useContext, useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import EmbedTable from "../EmbedTable";

const queryDashboardId = "";

const PurchasesTable4 = ({ productMovementVisQid }) => {
  return (
    <Container fluid className="padding-0 innerTab">
      <Tabs defaultActiveKey="comparison" className="inner" fill>
        <Tab eventKey="comparison" title="Monthly Comparison">
          <EmbedTable queryId={productMovementVisQid} />
        </Tab>
        <Tab eventKey="summary" title="Monthly Summary"></Tab>
        <Tab eventKey="invoice" title="Invoice Summary"></Tab>
        <Tab eventKey="price" title="Top Price Change"></Tab>
      </Tabs>
    </Container>
  );
};

export default PurchasesTable4;
