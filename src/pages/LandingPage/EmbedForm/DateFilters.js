
import React, {Fragment, useState, useContext, useEffect } from "react";
import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, NavLink, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import "../../../styles.css";
import FilterHelp from "./helpers/FilterHelp";
const DateFilters = () => {


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

<p className="mb-2 text-center"> <span className="strong">Date Filters</span>
<OverlayTrigger
placement="right"
overlay={renderTooltip}
>
<i class="fal fa-info-circle red ps-1"></i>
  </OverlayTrigger>
</p>


<div className="selectFilters">

  <div className="whiteBubble">

    <div class="d-flex flex-wrap">

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
export default DateFilters;
