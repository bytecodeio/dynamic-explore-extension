import React, { useState, useContext, useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { ExtensionContext } from "@looker/extension-sdk-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "../../../styles.css";
import EmbedTable from "./EmbedTable";


const queryDashboardId = "";

const InnerTableTabs = ({ productMovementVisQid }) => {
  return (
    <Container fluid className="padding-0">
      <Container fluid className="padding-0 innerTab">
        <Tabs defaultActiveKey="product-movement" className="inner" fill>
          <Tab eventKey="product-movement" title="Product Movement Details">
            <EmbedTable queryId={productMovementVisQid} />
          </Tab>
          <Tab eventKey="top" title="Top Product View">

          </Tab>

          <Tab eventKey="custom" title="Custom Subtotaling">

          </Tab>
        </Tabs>
      </Container>
    </Container>
  );
};

export default InnerTableTabs;
