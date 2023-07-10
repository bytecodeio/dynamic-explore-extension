import React, { useState, useContext, useEffect, useRef } from "react";
import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Button, ButtonGroup, ButtonToolbar, CloseButton, Col, Collapse, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, Overlay, OverlayTrigger, Row, Spinner, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ToggleButton, ToggleButtonGroup, Tooltip } from 'react-bootstrap';

import {
  LOOKER_MODEL,
  LOOKER_EXPLORE,
  LOOKML_FIELD_TAGS,
  PRODUCT_MOVEMENT_VIS_DASHBOARD_ID,
} from "../../../../utils/constants";
import { ExtensionContext } from "@looker/extension-sdk-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "../../../../styles.css";
import InnerTableTabs from "../InnerTableTabs";
import Fields from "./helpers/Fields";
import Filters from "./helpers/Filters";
import DateContainer from "./helpers/DateContainer";
import Rx from "./helpers/Rx";
import AccountGroups from "./helpers/AccountGroups";
import EmbedTable from "../EmbedTable";
import { DateFilterGroup } from "./helpers/DateFilterGroup";
import { CurrentSelection } from "./helpers/CurrentSelection";

const AutoSub = ({selectedFilters, setSelectedFilters,filterOptions,dateFilterOptions,fieldOptions,isFetchingLookmlFields,selectedDateFilter, setSelectedDateFilter}) => {
  const { core40SDK: sdk } = useContext(ExtensionContext);

  const [slide, setSlide] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showModal, setShowModal] = useState(false);
  const [show3, setShow3] = useState();
  const [active, setActive] = useState(false);
  const [faClass, setFaClass] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [selectedFields, setSelectedFields] = useState([]);
  const [productMovementVisQid, setProductMovementVisQid] = useState();
  const defaultChecked = true;
  const [isDefaultProduct, setIsDefaultProduct] = useState(defaultChecked);
  const [updateButtonClicked, setUpdateButtonClicked] = useState(false);
  const [defaults, setDefaults] = useState({})
  function handleClearAll() {}

  // Fetch default selected fields and filters + query for embedded visualization from Looker dashboard on load
  const [isFetchingDefaultDashboard, setIsFetchingDefaultDashboard] =
  useState(true);
  useEffect(() => {
    async function fetchDefaultFieldsAndFilters() {
      const { dashboard_elements } = await sdk.ok(
        sdk.dashboard(PRODUCT_MOVEMENT_VIS_DASHBOARD_ID, "dashboard_elements")
      );
      const { client_id, fields, filters } =
      dashboard_elements[0].result_maker.query;

      setSelectedFields(fields);
      if (filters) setSelectedFilters(filters);
      setProductMovementVisQid(client_id);
      setIsFetchingDefaultDashboard(false);
    }

    try {
      fetchDefaultFieldsAndFilters();
    } catch (e) {
      console.error("Error fetching default dashboard", e);
    }
  }, []);

  // Fetch the suggestions for each filter field, after fetching all filter fields
  const [isFetchingFilterSuggestions, setIsFetchingFilterSuggestions] =
  useState(true);
  const [filterSuggestions, setFilterSuggestions] = useState({});
  useEffect(() => {
    if (isFetchingLookmlFields || !filterOptions.length) {
      return;
    }

    function fetchFilterSuggestions(filterFieldName) {
      return sdk.ok(
        sdk.run_inline_query({
          result_format: "json",
          body: {
            model: LOOKER_MODEL,
            view: LOOKER_EXPLORE,
            fields: [filterFieldName],
          },
        })
      );
    }

    async function fetchAllFilterSuggestions() {
      const filterSuggestionPromises = filterOptions.map((filterField) => {
        return fetchFilterSuggestions(filterField.name);
      });
      const filterSuggestionResponses = await Promise.allSettled(
        filterSuggestionPromises
      );

      const filterSuggestionsMap = {};
      filterSuggestionResponses.forEach((response) => {
        // Error handling
        if (response.status !== "fulfilled") {
          // handle rejected failures
          return;
        }
        if (response.value[0].looker_error) {
          console.error(
            "Error fetching suggestions for a Looker filter field ",
            response.value[0].looker_error
          );
          return;
        }

        // Add filter suggestions to map if no errors
        const fieldName = Object.keys(response.value[0])[0];
        const suggestions = response.value.map((row) => row[fieldName]);
        filterSuggestionsMap[fieldName] = suggestions;
      });

      setFilterSuggestions(filterSuggestionsMap);
      setIsFetchingFilterSuggestions(false);
    }

    fetchAllFilterSuggestions();
  }, [filterOptions, isFetchingLookmlFields]);

  // Page loading state
  const [isPageLoading, setIsPageLoading] = useState(true);
  useEffect(() => {
    if (!isFetchingDefaultDashboard && !isFetchingLookmlFields) {
      setIsPageLoading(false);
    }
  }, [isFetchingDefaultDashboard, isFetchingLookmlFields]);

  const handleClick = () => {
    setToggle(!toggle);

    setTimeout(() => {
      setActive(!active);

      setFaClass(!faClass);
    }, 600);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
       These are the filters you use to query data. Select the accordions individually below to choose the different filter options inside. Once you are done you can choose the "Submit Values" button to update the data.
    </Tooltip>
  );

  // Handle run button click
  async function handleVisUpdate() {
    const prevVisQid = productMovementVisQid;
    setProductMovementVisQid();
    // remove filters with a value of "N/A"
    const filters = {};
    for (const filter in selectedFilters) {
      if (selectedFilters[filter] && selectedFilters[filter] !== "N/A") {
        filters[filter] = selectedFilters[filter];
      }
    }

    if (selectedDateFilter != "") {
      filters[selectedDateFilter] = 'Yes'
    }

    const { visConfig } = await sdk.ok(sdk.query_for_slug(prevVisQid));
    const { client_id } = await sdk.ok(
      sdk.create_query({
        model: LOOKER_MODEL,
        view: LOOKER_EXPLORE,
        fields: selectedFields,
        filters,
        visConfig,
      })
    );
    setProductMovementVisQid(client_id);
  }

  async function handleClearAll() {
    setIsDefaultProduct(false);
    setUpdateButtonClicked(true);
    setSelectedFields([])
  };

  async function handleRestoreDefault() {
    setIsDefaultProduct(defaultChecked);
    setUpdateButtonClicked(true)
  };


  return (
    <Container fluid>
    {isPageLoading ? (
      <Spinner />
    ) : (
      <>
      <div id="slideOut3" className={show3 ? "show3" : ""}>
      <div className="slideOutTab3">
        <div id="one3" className="openTab bottomShadow" role="button" tabindex="0" onClick={() => setShow3(true)}>
          <p className="black m-0 mb-2"><i class="far fa-bars"></i></p>
          <p className="m-0"><span className="noMobile">Auto-Sub Filters</span></p>
        </div>
      </div>

      <div className="modal-content">
        <div className="modal-header">
          <OverlayTrigger
          placement="right"
          overlay={renderTooltip}
          className="tooltipHover"
          ><p className="pb-1">Filter Options <i class="fal fa-info-circle red"></i></p>
          </OverlayTrigger>
        <div className="closeThisPlease" id="close1">
          <Button role="button" className="close" data-dismiss="modal" id="closeThisPlease1" onClick={() => setShow3(false)}>
          &#10005;
          </Button>
        </div>

        </div>
      <div className="modal-body">
      <Accordion defaultActiveKey={0} className="mt-3 mb-3">
    <Row>
      <Col xs={12} md={12}>
        <Row>

          <Col xs={12} md={12}>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Account Groups</Accordion.Header>
              <Accordion.Body>
                  <AccountGroups/>
              </Accordion.Body>
            </Accordion.Item>

          </Col>


          <Col xs={12} md={12}>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Rx</Accordion.Header>
              <Accordion.Body>
                <Rx/>
              </Accordion.Body>
            </Accordion.Item>

          </Col>
          <Col xs={12} md={12}>
            <Accordion.Item eventKey="5">
              <Accordion.Header>Filters</Accordion.Header>
              <Accordion.Body>
                  <Filters
                  isLoading={isFetchingFilterSuggestions}
                  filterOptions={filterOptions}
                  filterSuggestions={filterSuggestions}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  isDefault={isDefaultProduct}
                  setIsDefault={setIsDefaultProduct}
                  updateBtn={updateButtonClicked}
                  setUpdateBtn={setUpdateButtonClicked}
                  />
              </Accordion.Body>
            </Accordion.Item>

          </Col>


          <Col xs={12} md={12}>
            <Accordion.Item eventKey="6">
              <Accordion.Header>Fields</Accordion.Header>
              <Accordion.Body>
                  <Fields
                  fieldOptions={fieldOptions}
                  selectedFields={selectedFields}
                  setSelectedFields={setSelectedFields}
                  isDefault={isDefaultProduct}
                  setIsDefault={setIsDefaultProduct}
                  updateBtn={updateButtonClicked}
                  setUpdateBtn={setUpdateButtonClicked}

                  />

              </Accordion.Body>
            </Accordion.Item>

          </Col>

          <Col xs={12} md={12}>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Bookmarks</Accordion.Header>
              <Accordion.Body>

              </Accordion.Body>
            </Accordion.Item>

          </Col>

        </Row>

      </Col>
    </Row>
  </Accordion>
      </div>

    <div className="modal-footer">
        <div className="d-flex justify-content-center align-items-center mt-3 mb-3">
            <input placeholder="Search Filter" type="search" class="form-control" />
            <input placeholder="Top % Products" type="search" class="form-control" />
            <Button
            onClick={handleVisUpdate}
            className="btn mw200">
            Submit Values
            </Button>

       </div>

      <div className="lineAcross"></div>

      <div className="d-flex justify-content-between mt-3 pt-3">
          <Button onClick={handleRestoreDefault} className="btn-clear">
          Restore Default <i class="fal fa-undo"></i>
          </Button>
          <Button className="btn-clear">
          Print <i class="fal fa-print"></i>
          </Button>
          <Button onClick={handleClearAll} className="btn">
          Clear All
          </Button>
          </div>
        </div>
      </div>

      </div>

      <Row>
      <Col xs={12} md={5}>
          <CurrentSelection selectedDateFilter={selectedDateFilter} selectedFilters={selectedFilters}/>
          <p className="mt-5">Total Invoice: <span className="highlight large">17</span></p>
      </Col>

      <Col xs={12} md={7}>
          <div class="wrapFilters">
            <DateFilterGroup dateFilterOptions={dateFilterOptions} setSelectedDateFilter={setSelectedDateFilter} selectedDateFilter={selectedDateFilter}/>
          </div>

          <DateContainer/>

      </Col>
      </Row>

      <Row className="mt-3 mb-3">
        <Col md={12}>
          <InnerTableTabs productMovementVisQid={productMovementVisQid} />
        </Col>
      </Row>

      </>
    )}
    </Container>
  )
}

export default AutoSub;
