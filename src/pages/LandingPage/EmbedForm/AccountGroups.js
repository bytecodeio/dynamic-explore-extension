
import React, {Fragment, useState, useContext, useEffect } from "react";
import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, NavLink, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import "../../../styles.css";

const AccountGroups = () => {


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.
  </Tooltip>
  );


return (

  <Fragment>

  <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">


  <p className="mb-2 text-center"> <span className="strong">Account Groups</span>
  <OverlayTrigger
  placement="right"
  overlay={renderTooltip}
  >
  <i class="fal fa-info-circle red ps-1"></i>
  </OverlayTrigger>
  </p>
  <div className="whiteBubble">

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



  </div>



  </div>



<Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title><h4>Welcome Project Member</h4></Modal.Title>
  </Modal.Header>
  <Modal.Body><div class="col-12 col-xs-12">

  <p>CONTENT</p>

        </div></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="diagonal" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>

</Fragment>


)

}
export default AccountGroups;
