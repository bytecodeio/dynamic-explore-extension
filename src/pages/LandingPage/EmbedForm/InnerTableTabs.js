import React, { useState, useContext, useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { ExtensionContext } from "@looker/extension-sdk-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "../../../styles.css";
import EmbedTable from "./EmbedTable";

const InnerTableTabs = ({ tabs, setSelectedFields, currentInnerTab,setCurrentInnerTab }) => {
 

  const handleTabChange = (event) => {
    setCurrentInnerTab(event)
    console.log(tabs[event])
    setSelectedFields(tabs[event]['selected_fields'])
  }

  return (
    <Container fluid className="padding-0">
      <Container fluid className="padding-0 innerTab">
        <Tabs className="inner" fill activeKey={currentInnerTab} onSelect={(e) => handleTabChange(e)}>
          {tabs?.map((t,i) => (
            <Tab eventKey={i} title={t.title} >
              <EmbedTable queryId={t['query']} />
            </Tab>
          ))}
        </Tabs>
      </Container>
    </Container>
  );
};

export default InnerTableTabs;
