import React, { useState, useContext, useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { ExtensionContext } from "@looker/extension-sdk-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "../../../styles.css";
import EmbedTable from "./EmbedTable";


const queryDashboardId = "";

const  AutoSubTable = ({ productMovementVisQid }) => {
  return (
    <Container fluid className="padding-0">
      <Container fluid className="padding-0 innerTab">
        <Tabs defaultActiveKey="auto" className="inner" fill>
          <Tab eventKey="auto" title="Auto Substitution">
            <EmbedTable queryId={productMovementVisQid} />
          </Tab>

          <Tab eventKey="custom" title="Custom Subtotaling">
          </Tab>
        </Tabs>
      </Container>
    </Container>
  );
};

export default AutoSubTable;
