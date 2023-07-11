import React, { useState, useContext, useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { ExtensionContext } from "@looker/extension-sdk-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "../../../styles.css";
import EmbedTable from "./EmbedTable";


const queryDashboardId = "";

const InvoiceTable = ({ productMovementVisQid }) => {
  return (
    <Container fluid className="padding-0">
      <Container fluid className="padding-0 innerTab">
        <Tabs defaultActiveKey="invoice" className="inner" fill>
          <Tab eventKey="invoice" title="Invoice Review">
            <EmbedTable queryId={productMovementVisQid} />
          </Tab>
  
          <Tab eventKey="custom" title="Custom Subtotaling">
          </Tab>
        </Tabs>
      </Container>
    </Container>
  );
};

export default InvoiceTable;
