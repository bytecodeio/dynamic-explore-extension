import React, {Fragment, useEffect, useState} from "react";


import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, NavLink, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, Spinner, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip} from 'react-bootstrap';

function HowTo() {
  const [message, setMessage] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
    How To
    </Tooltip>
    );


    return (
    <div>


    <OverlayTrigger
    placement="right"
    overlay={renderTooltip}
    >

    <div className=""> <i class="fal fa-info-circle"></i></div>
  </OverlayTrigger>

  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title><h4>Welcome Project Member</h4></Modal.Title>
    </Modal.Header>
    <Modal.Body><div class="col-12 col-xs-12">

      <p>Welcome to the Cardinal Health demo site. Within the Cardinal Health demo site, users can generate estimates in real-time from the 2013 and 2014 Behavioral Risk Factor Surveillance System (BRFSS) data that were extracted from public use files (PUFs). Anyone can conduct interactive, live analyses with the weighted BRFSS data to produce results.</p>

      <p>Select what you would like to do:</p>
      <ul class="bullet">
        <li>
          <a class="orange" href="RptList.aspx?ScreenID=48">Documentation</a>: Provide project reports and other useful guidance.</li>
          <li>
            <a class="orange" href="RptList.aspx?ScreenID=14778">About the data</a>: Review BRFSS Cardinal Health site file contents and the BRFSS codebook. A subset of variables was selected from the PUFs for this demo site.
          </li>
          <li>
            <a class="orange" href="ReqFltr.aspx?ScreenID=14777&amp;tabID=24">Create a query</a>: To get started, the user simply selects the year, the topic, and then click on the “Get Results” button. Topics are categorical variables that form the table shell for the tabular results. Queries can be expanded upon by selecting a subgroup through the “Population Limits” panel. Analytical options are available under the “Statistical Options” panel. In that panel, other continuous variables are available for computing means or percentiles under the “Statistics of another Variable” option.</li>
          </ul>
          <p>Produce a customized report</p><p>
          </p><ul class="bullet">
            <li>
              <a class="orange" href="RptList.aspx?ScreenID=14782">Run distributions &amp; summary statistics</a>: Examples are provided to illustrate customizable sets of frequencies and summary statistics that can be produced.</li>
              <li>
                <a class="orange" href="RptList.aspx?ScreenID=14783">Run a regression model</a>:  Examples are provided for processing regression analyses. Projects can set up SAS macros to process queries through the Cardinal Health data tool.
              </li>
              <li>
                <a class="orange" target="_blank" href="../Public/Documents/Cardinal Health_Features.pdf">Cardinal Health system</a>: Learn about the special <a class="orange" target="_blank" href="../Public/Documents/Cardinal Health_Features.pdf">capabilities and benefits</a> of the Cardinal Health system and how to get started using the <a class="orange" target="_blank" href="../Public/Documents/Cardinal Health_QuickStartGuide.pdf">Cardinal Health® Quick Start Guide</a>.
              </li>
            </ul>

            <p>Cardinal Health enables clients, collaborators, and Westat staff to run online analyses and display various types of reports in real time using weighted (from complex samples) or unweighted data files. Cardinal Health is run from any standard web browser and is designed to allow users without high levels of technical and statistical expertise to have easy access to data. For more information, contact the <a class="orange" href="mailto:Cardinal HealthHelp@westat.com">Cardinal Health team</a>.</p>

            <p>The purpose is to demonstrate Cardinal Health using a subset of BRFSS variables, and although the results will match, we encourage you to make use of all the variables in the BRFSS public use data directly from CDC.</p>

          </div></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="diagonal" onClick={handleClose}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>



    </div>




  )

}

export default HowTo;
