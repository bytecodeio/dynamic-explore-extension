import React, { useState, useContext, useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { ExtensionContext } from "@looker/extension-sdk-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "../../../styles.css";
import EmbedTable from "./EmbedTable";
import QueryTwo from "./QueryTwo";

const InnerTableTabs = () => {
  const [queryId, setQueryId] = useState();
  const { core40SDK: sdk } = useContext(ExtensionContext);

  useEffect(() => {
    sdk.ok(sdk.dashboard("Y5mgkGp6GY2w9YcwK1bGP3")).then((res) => {
      console.log("queryId", res.dashboard_elements[0].query.id);
      setQueryId(res.dashboard_elements[0].query.id);
    });
  }, []);
  return (
    <Container fluid className="padding-0">
      <Container fluid className="padding-0 innerTab">
        <Tabs defaultActiveKey="product-movement" className="inner" fill>
          <Tab eventKey="product-movement" title="Product Movement Details">

          
            <EmbedTable queryId={queryId} />
          </Tab>
          <Tab eventKey="top" title="Top Product View">
        <QueryTwo/>
          </Tab>

          <Tab eventKey="custom" title="Custom Subtotaling">
            <p>sdiubsvivdsb</p>
          </Tab>
        </Tabs>
      </Container>
    </Container>
  );
};

export default InnerTableTabs;
