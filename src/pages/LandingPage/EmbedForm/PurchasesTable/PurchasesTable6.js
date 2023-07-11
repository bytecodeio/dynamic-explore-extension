import React, { useState, useContext, useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { ExtensionContext } from "@looker/extension-sdk-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "../../../../styles.css";
import EmbedTable from "../EmbedTable";


const queryDashboardId = "";

const PurchasesTable6 = ({ productMovementVisQid }) => {
  return (

      <Container fluid className="padding-0 innerTab smallerHeight">
         <EmbedTable queryId={productMovementVisQid} />
      </Container>

  );
};

export default PurchasesTable6;
