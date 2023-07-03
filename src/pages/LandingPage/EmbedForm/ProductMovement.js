
import React, { useState, useContext, useEffect, useRef } from "react";
import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, NavLink, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import "../../../styles.css";

import InnerTableTabs from "./InnerTableTabs";
import CurrentSelections from "./CurrentSelections";
import AccountGroups from "./AccountGroups";
import Pharmacy from "./Pharmacy";
import DateFilters from "./DateFilters";

import Fields from "./helpers/Fields";
import Filters from "./helpers/Filters";

import SlideOut from "./nav/SlideOut";

import Collapse1 from "./helpers/Collapse1";
import EmbedTable from "./EmbedTable";
const ProductMovement = () => {

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




  const [slide, setSlide] = React.useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.
  </Tooltip>
  );



  const [showModal, setShowModal] = useState(false);

  const [show3, setShow3] = React.useState();

  return (
  <Container fluid>

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
                        <div class="wrapFilters">

                          <div className="one">
                            <Form.Group  controlId="formBasicCheckbox">
                              <Form.Check  type="checkbox" label="Taxes & Fees" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox2">
                              <Form.Check  type="checkbox" label="Account Name Selector" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox3">
                              <Form.Check type="checkbox" label="Top %" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox4">
                              <Form.Check type="checkbox" label="Invoice Date" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox2">
                              <Form.Check  type="checkbox" label="Selector" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox2">
                              <Form.Check  type="checkbox" label="Including MMS" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox4">
                              <Form.Check type="checkbox" label="Invoice Date" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox3">
                              <Form.Check type="checkbox" label="Including KP" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group  controlId="formBasicCheckbox">
                              <Form.Check  type="checkbox" label="Taxes & Fees" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox4">
                              <Form.Check type="checkbox" label="Invoice Date" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox2">
                              <Form.Check  type="checkbox" label="Name Selector" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox2">
                              <Form.Check  type="checkbox" label="Including MMS" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox3">
                              <Form.Check type="checkbox" label="Top %" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox4">
                              <Form.Check type="checkbox" label="Invoice Date" />
                            </Form.Group>
                          </div>



                        </div>

                      </Accordion.Body>
                    </Accordion.Item>

                  </Col>
                  <Col xs={12} md={12}>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Account Groups</Accordion.Header>
                      <Accordion.Body>
                        <div class="wrapFilters">

                          <div className="one">
                            <Form.Group  controlId="formBasicCheckbox">
                              <Form.Check  type="checkbox" label="Gold Cross" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox2">
                              <Form.Check  type="checkbox" label="Marina Hanson" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox3">
                              <Form.Check type="checkbox" label="Ambulance Duluth" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox4">
                              <Form.Check type="checkbox" label="Gonda" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox5">
                              <Form.Check type="checkbox" label="Coordinated Care" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox6">
                              <Form.Check type="checkbox" label="Blue Cross" />
                            </Form.Group>
                          </div>



                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox3">
                              <Form.Check type="checkbox" label="Ambulance Oregon" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox4">
                              <Form.Check type="checkbox" label="Synergy" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox4">
                              <Form.Check type="checkbox" label="Health Box" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox4">
                              <Form.Check type="checkbox" label="Glow" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox2">
                              <Form.Check  type="checkbox" label="Marina Hanson" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox3">
                              <Form.Check type="checkbox" label="Ambulance Duluth" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox4">
                              <Form.Check type="checkbox" label="Gonda" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox5">
                              <Form.Check type="checkbox" label="Coordinated Care" />
                            </Form.Group>
                          </div>




                        </div>

                      </Accordion.Body>
                    </Accordion.Item>

                  </Col>


                  <Col xs={12} md={12}>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>Rx</Accordion.Header>
                      <Accordion.Body>

                        <div class="wrapFilters">

                          <div className="one">
                            <Form.Group  controlId="formBasicCheckbox">
                              <Form.Check  type="checkbox" label="Rx" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox2">
                              <Form.Check  type="checkbox" label="Brand" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox3">
                              <Form.Check type="checkbox" label="On Contract" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox4">
                              <Form.Check type="checkbox" label="Controlled" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox5">
                              <Form.Check type="checkbox" label="SOURCE" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox6">
                              <Form.Check type="checkbox" label="SPX" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox7">
                              <Form.Check type="checkbox" label="Speciality" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group  controlId="formBasicCheckbox8">
                              <Form.Check  type="checkbox" label="Non-Rx" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox9">
                              <Form.Check  type="checkbox" label="Generic" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox10">
                              <Form.Check type="checkbox" label="Off Contract" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox11">
                              <Form.Check type="checkbox" label="Non-Controlled" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox12">
                              <Form.Check type="checkbox" label="Non-SOURCE" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox13">
                              <Form.Check type="checkbox" label="Non-SPX" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox14">
                              <Form.Check type="checkbox" label="Purchases" />
                            </Form.Group>
                          </div>


                        </div>

                      </Accordion.Body>
                    </Accordion.Item>

                  </Col>


                  <Col xs={12} md={12}>
                    <Accordion.Item eventKey="4">
                      <Accordion.Header>Bookmarks</Accordion.Header>
                      <Accordion.Body>

                        <div class="wrapFilters">

                          <div className="one">
                            <Form.Group  controlId="formBasicCheckbox">
                              <Form.Check  type="checkbox" label="Rx" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox2">
                              <Form.Check  type="checkbox" label="Brand" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox3">
                              <Form.Check type="checkbox" label="On Contract" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox4">
                              <Form.Check type="checkbox" label="Controlled" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox5">
                              <Form.Check type="checkbox" label="SOURCE" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox6">
                              <Form.Check type="checkbox" label="SPX" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox7">
                              <Form.Check type="checkbox" label="Speciality" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group  controlId="formBasicCheckbox8">
                              <Form.Check  type="checkbox" label="Non-Rx" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox9">
                              <Form.Check  type="checkbox" label="Generic" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox10">
                              <Form.Check type="checkbox" label="Off Contract" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox11">
                              <Form.Check type="checkbox" label="Non-Controlled" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox12">
                              <Form.Check type="checkbox" label="Non-SOURCE" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox13">
                              <Form.Check type="checkbox" label="Non-SPX" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox14">
                              <Form.Check type="checkbox" label="Purchases" />
                            </Form.Group>
                          </div>


                        </div>

                      </Accordion.Body>
                    </Accordion.Item>

                  </Col>



                  <Col xs={12} md={12}>
                    <Accordion.Item eventKey="5">
                      <Accordion.Header>Filters</Accordion.Header>
                      <Accordion.Body>

                        <div class="wrapFilters">

                          <div className="one">
                            <Form.Group  controlId="formBasicCheckbox">
                              <Form.Check  type="checkbox" label="Rx" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox2">
                              <Form.Check  type="checkbox" label="Brand" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox3">
                              <Form.Check type="checkbox" label="On Contract" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox4">
                              <Form.Check type="checkbox" label="Controlled" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox5">
                              <Form.Check type="checkbox" label="SOURCE" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox6">
                              <Form.Check type="checkbox" label="SPX" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox7">
                              <Form.Check type="checkbox" label="Speciality" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group  controlId="formBasicCheckbox8">
                              <Form.Check  type="checkbox" label="Non-Rx" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox9">
                              <Form.Check  type="checkbox" label="Generic" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox10">
                              <Form.Check type="checkbox" label="Off Contract" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox11">
                              <Form.Check type="checkbox" label="Non-Controlled" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox12">
                              <Form.Check type="checkbox" label="Non-SOURCE" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox13">
                              <Form.Check type="checkbox" label="Non-SPX" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox14">
                              <Form.Check type="checkbox" label="Purchases" />
                            </Form.Group>
                          </div>


                        </div>

                      </Accordion.Body>
                    </Accordion.Item>

                  </Col>


                  <Col xs={12} md={12}>
                    <Accordion.Item eventKey="6">
                      <Accordion.Header>Fields</Accordion.Header>
                      <Accordion.Body>

                        <div class="wrapFilters">

                          <div className="one">
                            <Form.Group  controlId="formBasicCheckbox">
                              <Form.Check  type="checkbox" label="Rx" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox2">
                              <Form.Check  type="checkbox" label="Brand" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox3">
                              <Form.Check type="checkbox" label="On Contract" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox4">
                              <Form.Check type="checkbox" label="Controlled" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox5">
                              <Form.Check type="checkbox" label="SOURCE" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox6">
                              <Form.Check type="checkbox" label="SPX" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox7">
                              <Form.Check type="checkbox" label="Speciality" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group  controlId="formBasicCheckbox8">
                              <Form.Check  type="checkbox" label="Non-Rx" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox9">
                              <Form.Check  type="checkbox" label="Generic" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox10">
                              <Form.Check type="checkbox" label="Off Contract" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox11">
                              <Form.Check type="checkbox" label="Non-Controlled" />
                            </Form.Group>
                          </div>


                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox12">
                              <Form.Check type="checkbox" label="Non-SOURCE" />
                            </Form.Group>
                          </div>

                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox13">
                              <Form.Check type="checkbox" label="Non-SPX" />
                            </Form.Group>
                          </div>
                          <div className="one">
                            <Form.Group controlId="formBasicCheckbox14">
                              <Form.Check type="checkbox" label="Purchases" />
                            </Form.Group>
                          </div>


                        </div>

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






        {/*<div class="counter"><p className="small m-0">Invoice Count</p><i class="fas fa-circle"><h6 class="numberCounter">17</h6></i></div>*/}



          </div>

  <div className="d-flex justify-content-center align-items-center mt-3 mb-3">



          <input placeholder="Search Filter" type="search" class="form-control" />

    <input placeholder="Top % Products" type="search" class="form-control" />


    <Button className="btn mw200">

      Clear All

    </Button>




</div>

<div className="lineAcross"></div>

  <div className="d-flex justify-content-between mt-3 pt-3">
  <Button className="btn-clear">

  Restore Default <i class="fal fa-undo"></i>

  </Button>

  <Button className="btn-clear">

  Print <i class="fal fa-print"></i>

  </Button>

  <Button className="btn">

  Submit Values

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

          <Form.Group  controlId="formBasicCheckbox15">
            <Form.Check  type="radio" label="MTD" name="filters" />
          </Form.Group>

        </Button>
        <Button>

          <Form.Group controlId="formBasicCheckbox16">
            <Form.Check  type="radio" label="Prev Month" name="filters" />
          </Form.Group>

    </Button>
  <Button>

          <Form.Group controlId="formBasicCheckbox17">
            <Form.Check type="radio" label="QTD" name="filters"/>
          </Form.Group>

    </Button>
        <Button>

          <Form.Group controlId="formBasicCheckbox18">
            <Form.Check type="radio" label="Prev QTR" name="filters"/>
          </Form.Group>

    </Button>
      <Button>

          <Form.Group controlId="formBasicCheckbox19">
            <Form.Check type="radio" label="YTD" name="filters"/>
          </Form.Group>

    </Button>
      <Button>

          <Form.Group controlId="formBasicCheckbox20">
            <Form.Check type="radio" label="Prev Year" name="filters"/>
          </Form.Group>

    </Button>
      <Button>

          <Form.Group controlId="formBasicCheckbox21">
            <Form.Check type="radio" label="All Years" name="filters"/>
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
            <Form.Control type="date"/>
          </div>
          <div class="columnStart">
            <p className="small">End Date</p>
            <Form.Control type="date"  />
          </div>
        </div>

</Col>

</Row>

      </Col>
    </Row>






    {/*<Accordion defaultActiveKey={0} className="mt-5 mb-3">
      <Row>
        <Col xs={12} md={12}>
          <Row>
            <Col xs={12} md={3}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Current Selections</Accordion.Header>
                <Accordion.Body>
                  <div class="wrapFilters">

                    <div className="one">
                      <Form.Group  controlId="formBasicCheckbox">
                        <Form.Check  type="checkbox" label="Taxes & Fees" />
                      </Form.Group>
                    </div>
                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox2">
                        <Form.Check  type="checkbox" label="Account Name Selector" />
                      </Form.Group>
                    </div>


                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox3">
                        <Form.Check type="checkbox" label="Top %" />
                      </Form.Group>
                    </div>
                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox4">
                        <Form.Check type="checkbox" label="Invoice Date" />
                      </Form.Group>
                    </div>


                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox2">
                        <Form.Check  type="checkbox" label="Selector" />
                      </Form.Group>
                    </div>

                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox2">
                        <Form.Check  type="checkbox" label="Including MMS" />
                      </Form.Group>
                    </div>
                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox4">
                        <Form.Check type="checkbox" label="Invoice Date" />
                      </Form.Group>
                    </div>
                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox3">
                        <Form.Check type="checkbox" label="Including KP" />
                      </Form.Group>
                    </div>

                    <div className="one">
                      <Form.Group  controlId="formBasicCheckbox">
                        <Form.Check  type="checkbox" label="Taxes & Fees" />
                      </Form.Group>
                    </div>

                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox4">
                        <Form.Check type="checkbox" label="Invoice Date" />
                      </Form.Group>
                    </div>


                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox2">
                        <Form.Check  type="checkbox" label="Name Selector" />
                      </Form.Group>
                    </div>

                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox2">
                        <Form.Check  type="checkbox" label="Including MMS" />
                      </Form.Group>
                    </div>

                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox3">
                        <Form.Check type="checkbox" label="Top %" />
                      </Form.Group>
                    </div>
                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox4">
                        <Form.Check type="checkbox" label="Invoice Date" />
                      </Form.Group>
                    </div>



                  </div>

                </Accordion.Body>
              </Accordion.Item>

            </Col>
            <Col xs={12} md={3}>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Account Groups</Accordion.Header>
                <Accordion.Body>
                  <div class="wrapFilters">

                    <div className="one">
                      <Form.Group  controlId="formBasicCheckbox">
                        <Form.Check  type="checkbox" label="Gold Cross" />
                      </Form.Group>
                    </div>
                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox2">
                        <Form.Check  type="checkbox" label="Marina Hanson" />
                      </Form.Group>
                    </div>


                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox3">
                        <Form.Check type="checkbox" label="Ambulance Duluth" />
                      </Form.Group>
                    </div>
                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox4">
                        <Form.Check type="checkbox" label="Gonda" />
                      </Form.Group>
                    </div>

                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox5">
                        <Form.Check type="checkbox" label="Coordinated Care" />
                      </Form.Group>
                    </div>

                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox6">
                        <Form.Check type="checkbox" label="Blue Cross" />
                      </Form.Group>
                    </div>



                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox3">
                        <Form.Check type="checkbox" label="Ambulance Oregon" />
                      </Form.Group>
                    </div>
                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox4">
                        <Form.Check type="checkbox" label="Synergy" />
                      </Form.Group>
                    </div>

                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox4">
                        <Form.Check type="checkbox" label="Health Box" />
                      </Form.Group>
                    </div>

                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox4">
                        <Form.Check type="checkbox" label="Glow" />
                      </Form.Group>
                    </div>

                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox2">
                        <Form.Check  type="checkbox" label="Marina Hanson" />
                      </Form.Group>
                    </div>


                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox3">
                        <Form.Check type="checkbox" label="Ambulance Duluth" />
                      </Form.Group>
                    </div>
                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox4">
                        <Form.Check type="checkbox" label="Gonda" />
                      </Form.Group>
                    </div>

                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox5">
                        <Form.Check type="checkbox" label="Coordinated Care" />
                      </Form.Group>
                    </div>




                  </div>

                </Accordion.Body>
              </Accordion.Item>

            </Col>

            <Col xs={12} md={3}>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Date Filters</Accordion.Header>
                <Accordion.Body>
                  <div class="wrapFilters">

                    <div className="one radio">
                      <Form.Group  controlId="formBasicCheckbox15">
                        <Form.Check  type="radio" label="MTD" name="filters" />
                      </Form.Group>
                    </div>
                    <div className="one radio">
                      <Form.Group controlId="formBasicCheckbox16">
                        <Form.Check  type="radio" label="Prev Month" name="filters" />
                      </Form.Group>
                    </div>


                    <div className="one radio">
                      <Form.Group controlId="formBasicCheckbox17">
                        <Form.Check type="radio" label="QTD" name="filters"/>
                      </Form.Group>
                    </div>
                    <div className="one radio">
                      <Form.Group controlId="formBasicCheckbox18">
                        <Form.Check type="radio" label="Prev QTR" name="filters"/>
                      </Form.Group>
                    </div>

                    <div className="one radio">
                      <Form.Group controlId="formBasicCheckbox19">
                        <Form.Check type="radio" label="YTD" name="filters"/>
                      </Form.Group>
                    </div>

                    <div className="one radio">
                      <Form.Group controlId="formBasicCheckbox20">
                        <Form.Check type="radio" label="Prev Year" name="filters"/>
                      </Form.Group>
                    </div>

                    <div className="one radio">
                      <Form.Group controlId="formBasicCheckbox21">
                        <Form.Check type="radio" label="All Years" name="filters"/>
                      </Form.Group>
                    </div>


                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Col>
            <Col xs={12} md={3}>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Pharmacy</Accordion.Header>
                <Accordion.Body>

                  <div class="wrapFilters">

                    <div className="one">
                      <Form.Group  controlId="formBasicCheckbox">
                        <Form.Check  type="checkbox" label="Rx" />
                      </Form.Group>
                    </div>
                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox2">
                        <Form.Check  type="checkbox" label="Brand" />
                      </Form.Group>
                    </div>


                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox3">
                        <Form.Check type="checkbox" label="On Contract" />
                      </Form.Group>
                    </div>
                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox4">
                        <Form.Check type="checkbox" label="Controlled" />
                      </Form.Group>
                    </div>

                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox5">
                        <Form.Check type="checkbox" label="SOURCE" />
                      </Form.Group>
                    </div>

                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox6">
                        <Form.Check type="checkbox" label="SPX" />
                      </Form.Group>
                    </div>


                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox7">
                        <Form.Check type="checkbox" label="Speciality" />
                      </Form.Group>
                    </div>


                    <div className="one">
                      <Form.Group  controlId="formBasicCheckbox8">
                        <Form.Check  type="checkbox" label="Non-Rx" />
                      </Form.Group>
                    </div>
                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox9">
                        <Form.Check  type="checkbox" label="Generic" />
                      </Form.Group>
                    </div>


                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox10">
                        <Form.Check type="checkbox" label="Off Contract" />
                      </Form.Group>
                    </div>


                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox11">
                        <Form.Check type="checkbox" label="Non-Controlled" />
                      </Form.Group>
                    </div>


                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox12">
                        <Form.Check type="checkbox" label="Non-SOURCE" />
                      </Form.Group>
                    </div>

                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox13">
                        <Form.Check type="checkbox" label="Non-SPX" />
                      </Form.Group>
                    </div>
                    <div className="one">
                      <Form.Group controlId="formBasicCheckbox14">
                        <Form.Check type="checkbox" label="Purchases" />
                      </Form.Group>
                    </div>


                  </div>

                </Accordion.Body>
              </Accordion.Item>

            </Col>

          </Row>

        </Col>


      </Row>

    </Accordion>*/}

    <Row className="mt-3 mb-3">
      <Col md={12}>

        <InnerTableTabs/>
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






</Container>
)


}


export default ProductMovement;
