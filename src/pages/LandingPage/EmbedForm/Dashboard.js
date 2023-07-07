import React, { useState, useContext, useEffect, useRef } from "react";
import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, NavLink, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, Spinner, SSRProvider, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip } from 'react-bootstrap';

import {
  LOOKER_MODEL,
  LOOKER_EXPLORE,
  LOOKML_FIELD_TAGS,
  PRODUCT_MOVEMENT_VIS_DASHBOARD_ID,
} from "../../../utils/constants";
import { ExtensionContext } from "@looker/extension-sdk-react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import "../../../styles.css";

import InnerTableTabs from "./InnerTableTabs";


import Fields from "./helpers/Fields";
import Filters from "./helpers/Filters";

import SlideOut from "./nav/SlideOut";

import EmbedTable from "./EmbedTable";
const Dashboard = () => {
  const { core40SDK: sdk } = useContext(ExtensionContext);
  const [selectedFilters, setSelectedFilters] = useState({});
  console.log(
    "🚀 ~ file: ProductMovement.js:40 ~ ProductMovement ~ selectedFilters:",
    selectedFilters
  );
  const [selectedFields, setSelectedFields] = useState([]);
  const [productMovementVisQid, setProductMovementVisQid] = useState();
  const defaultChecked = true;
  const [isDefaultDashboard, setIsDefaultDashboard] = useState(defaultChecked);
  const [updateBtnClickedDash, setUpdateBtnClickedDash] = useState(false);

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
      console.log(
        "🚀 ~ file: ProductMovement.js:55 ~ fetchDefaultFieldsAndFilters ~ dashboard_elements:",
        dashboard_elements
      );
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

  // Fetch filter and field options by tag from LookML view on load
  const [isFetchingLookmlFields, setIsFetchingLookmlFields] = useState(true);
  const [fieldOptions, setFieldOptions] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    function groupFieldsByTags(fields) {
      const fieldsByTag = {};
      fields.forEach((field) => {
        field.tags.forEach((tag) => {
          if (fieldsByTag[tag] === undefined) {
            fieldsByTag[tag] = [field];
          } else {
            fieldsByTag[tag].push(field);
          }
        });
      });
      return fieldsByTag;
    }

    async function fetchLookmlFields() {

      const {
        fields: { dimensions, filters, measures },
      } = await sdk.ok(
        sdk.lookml_model_explore(LOOKER_MODEL, LOOKER_EXPLORE, "fields")
      );


      const lookmlFields = [...dimensions, ...filters, ...measures];
      const fieldsByTag = groupFieldsByTags(lookmlFields);


      console.log("fields stuff", lookmlFields)

      const _filterOptions = fieldsByTag[LOOKML_FIELD_TAGS.filter];
      const _fieldOptions = fieldsByTag[LOOKML_FIELD_TAGS.productMovementField];
      // debugger;
      const defaultFilterSelections = Object.fromEntries(
        _filterOptions.map((filter) => [filter.name, "N/A"])
      );

      setFilterOptions(_filterOptions);
      setFieldOptions(_fieldOptions);
      setSelectedFilters(defaultFilterSelections);
      setIsFetchingLookmlFields(false);
    }

    try {
      fetchLookmlFields();
    } catch (e) {
      console.error("Error fetching Looker filters and fields", e);
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
          // handle rejectd failures
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

  const [active, setActive] = useState(false);

  const [faClass, setFaClass] = useState(true);

  const [toggle, setToggle] = useState(true);

  const handleClick = () => {
    setToggle(!toggle);

    setTimeout(() => {
      setActive(!active);

      setFaClass(!faClass);
    }, 600);
  };




  const [slide, setSlide] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
    Unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.
    </Tooltip>
  );



  const [showModal, setShowModal] = useState(false);

  const [show3, setShow3] = useState();



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
    setIsDefaultDashboard(false);
    setUpdateBtnClickedDash(true);
    setSelectedFields([])
  };


  async function handleRestoreDefault() {
    setIsDefaultDashboard(defaultChecked);
    setUpdateBtnClickedDash(true)
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
      <p className="m-0"><span className="noMobile">Filter Options</span></p>


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
      <Accordion.Item eventKey="0">
      <Accordion.Header>Current Selections</Accordion.Header>
      <Accordion.Body>


      </Accordion.Body>
      </Accordion.Item>

      </Col>
      <Col xs={12} md={12}>
      <Accordion.Item eventKey="1">
      <Accordion.Header>Account Groups</Accordion.Header>
      <Accordion.Body>


      </Accordion.Body>
      </Accordion.Item>

      </Col>


      <Col xs={12} md={12}>
      <Accordion.Item eventKey="3">
      <Accordion.Header>Rx</Accordion.Header>
      <Accordion.Body>



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
      isDefault={isDefaultDashboard}
      setIsDefault={setIsDefaultDashboard}
      updateBtn={updateBtnClickedDash}
      setUpdateBtn={setUpdateBtnClickedDash}
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
      isDefault={isDefaultDashboard}
      setIsDefault={setIsDefaultDashboard}
      updateBtn={updateBtnClickedDash}
      setUpdateBtn={setUpdateBtnClickedDash}
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

      <div className="d-flex justify-content-between align-items-center mt-3 mb-3">

      </div>

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
      <Col xs={12} md={6}>

      <p className="mt-0 mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p>Total Invoice: 17</p>


      </Col>

      <Col xs={12} md={6}>


      <div class="wrapFilters">

      <ButtonGroup>
      <Button active>

      <Form.Group controlId="formBasicCheckbox15">
      <Form.Check type="radio" label="MTD" name="filters" />
      </Form.Group>

      </Button>
      <Button>

      <Form.Group controlId="formBasicCheckbox16">
      <Form.Check type="radio" label="Prev Month" name="filters" />
      </Form.Group>

      </Button>
      <Button>

      <Form.Group controlId="formBasicCheckbox17">
      <Form.Check type="radio" label="QTD" name="filters" />
      </Form.Group>

      </Button>
      <Button>

      <Form.Group controlId="formBasicCheckbox18">
      <Form.Check type="radio" label="Prev QTR" name="filters" />
      </Form.Group>

      </Button>
      <Button>

      <Form.Group controlId="formBasicCheckbox19">
      <Form.Check type="radio" label="YTD" name="filters" />
      </Form.Group>

      </Button>
      <Button>

      <Form.Group controlId="formBasicCheckbox20">
      <Form.Check type="radio" label="Prev Year" name="filters" />
      </Form.Group>

      </Button>
      <Button>

      <Form.Group controlId="formBasicCheckbox21">
      <Form.Check type="radio" label="All Years" name="filters" />
      </Form.Group>

      </Button>
      </ButtonGroup>


      </div>


      <Row className="mt-3">

      <Col xs={12} md={6}>
      <Form>

      <div class="columnStart">
      <p className="small">Search Report</p>
      <Form.Control
      type="search"
      label=""
      placeholder="Search Report"
      className="fomr-control big"
      aria-label="Search"
      />


      </div>
      </Form>

      </Col>
      <Col xs={12} md={6}>
      <div class="d-flex">

      <div class="columnStart mr2">
      <p className="small">Start Date</p>
      <Form.Control type="date" />
      </div>
      <div class="columnStart">
      <p className="small">End Date</p>
      <Form.Control type="date" />
      </div>
      </div>

      </Col>

      </Row>

      </Col>
      </Row>



      <Row className="mt-3 mb-3">
      <Col md={12}>
      <InnerTableTabs productMovementVisQid={productMovementVisQid} />
      </Col>
      </Row>


      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      <Modal.Title><h4>Lorem Ipsum</h4></Modal.Title>
      </Modal.Header>
      <Modal.Body><div class="col-12 col-xs-12">

      <p>CONTENT</p>

      </div>
      </Modal.Body>
      <Modal.Footer>
      <Button className="btn iguana" onClick={handleClose}>
      <span class="blueFill">
      Close
      </span>
      </Button>


      </Modal.Footer>
      </Modal>



      </>
    )}
    </Container>
  )


}


export default Dashboard;
