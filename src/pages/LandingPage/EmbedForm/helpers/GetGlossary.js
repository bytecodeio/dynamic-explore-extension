import React, {Fragment, useEffect, useState} from "react";


import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, NavLink, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, Spinner, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip} from 'react-bootstrap';

function GetGlossary() {
  const [message, setMessage] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      View Glossary
    </Tooltip>
    );


    return (
    <div>


    <OverlayTrigger
    placement="right"
    overlay={renderTooltip}
    >
    <div className="mb-0 showModal me-2 mb-0" onClick={handleShow}> <i class="fal fa-book"></i></div>
  </OverlayTrigger>


  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title><h4>Welcome Project Member</h4></Modal.Title>
    </Modal.Header>
    <Modal.Body><div class="col-12 col-xs-12">

      <p>Glossary</p>

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

export default GetGlossary;
