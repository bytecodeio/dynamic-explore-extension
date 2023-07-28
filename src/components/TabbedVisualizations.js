import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import EmbedTable from "./EmbedTable";
import { ExtensionContext } from "@looker/extension-sdk-react";

const DimensionToggle = ({ dimensionToggleFields, tab }) => {
  const tag = Object.keys(dimensionToggleFields).find((tag) =>
    tag.toLowerCase().endsWith(tab.title.toLowerCase())
  );

  if (!tag) {
    return <></>;
  }

  const field = dimensionToggleFields[tag][0];
  const options = field.enumerations;

  return (
    <ButtonGroup size="sm">
      {options.map((option) => (
        <Button
          key={option.value}
          onClick={() => handleDimensionToggle(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

const Visualization = ({ dimensionToggleFields, tab }) => {
  const [queryId, setQueryId] = useState(tab.query);

  return (
    <>
      <DimensionToggle
        dimensionToggleFields={dimensionToggleFields}
        tab={tab}
      />
      <EmbedTable queryId={queryId} />
    </>
  );
};

const TabbedVisualizations = ({ dashboardId, dimensionToggleFields }) => {
  const { core40SDK: sdk } = useContext(ExtensionContext);
  const [tabs, setTabs] = useState([]);
  const [error, setError] = useState("");
  const [selectedTabIndex, setSelectedTabIndex] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVisualizationsFromDashboard() {
      const { dashboard_elements } = await sdk.ok(
        sdk.dashboard(dashboardId, "dashboard_elements")
      );

      // Throw error if no dashboard elements were returned
      if (!dashboard_elements?.length) {
        throw new Error(
          "No elements returned from dashboard. The tabbed visualizations requires a dashboard with one or more elements."
        );
      }

      // Throw error if dashboard elements have duplicate titles
      const hasTilesWithDuplicateTitles =
        dashboard_elements.length !== new Set(dashboard_elements).size;
      if (hasTilesWithDuplicateTitles) {
        throw new Error(
          "Dashboard has tiles with duplicate titles. The tabbed visualizations requires each dashboard tile to have a unique title."
        );
      }

      const _tabs = dashboard_elements.map((tile) => ({
        title: tile.title,
        query: tile.result_maker.query.client_id,
      }));

      setTabs(_tabs);
      setSelectedTabIndex(0);
      setIsLoading(false);
    }

    try {
      fetchVisualizationsFromDashboard();
    } catch (error) {
      setError(error.message);
      console.error(
        "Error fetching tabbed visualizations from dashboard",
        error
      );
    }
  }, []);

  const handleTabChange = (event) => {
    setSelectedTabIndex(event);
  };

  return (
    <Container fluid className="padding-0">
      <Container fluid className="padding-0 innerTab">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Tabs
            className="inner"
            fill
            activeKey={selectedTabIndex}
            onSelect={handleTabChange}
          >
            {tabs?.map((tab, i) => {
              return (
                <Tab key={tab.title} eventKey={i} title={tab.title}>
                  <Visualization
                    dimensionToggleFields={dimensionToggleFields}
                    tab={tab}
                  />
                </Tab>
              );
            })}
          </Tabs>
        )}
      </Container>
    </Container>
  );
};

export default TabbedVisualizations;
