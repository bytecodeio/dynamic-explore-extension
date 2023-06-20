
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



  return (
<Container fluid>
{/*<h3 class="blue text-center mb-5">Product Movement Report</h3>*/}

<Row>
  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <Row>


     <div className={toggle ? 'slide-down' : 'slide-up'}>

      <div class="d-flex flex-wrap justify-content-evenly across align-items-baseline">
        {/*<p className="small strong">Search Report</p>*/}
        <Form>

          <Form.Control
          type="search"
          label="Search Report"
          placeholder="Search Report"
          className=""
          aria-label="Search"
          />
          {/*<Button variant="outline-success">Search</Button>*/}
        </Form>


        <p className="showModal" onClick={handleShow}>Bookmarks <i class="fal fa-bookmark"></i></p>

        <Filters/>


        <Fields/>

        <p className="showModal" onClick={handleShow}>Restore Default <i class="fal fa-undo"></i></p>


        <p className="showModal" onClick={handleShow}>Top Products <i class="fal fa-percent"></i></p>

         <div className="counter showModal"><p>Invoice Count: </p><i class="fas fa-circle"><h6 class="numberCounter">17</h6></i></div>

        <Button variant="secondary" className="diagonal">
          Clear All
        </Button>
      </div>
      </div>
    </Row>
  </div>


</Row>


    <div className="line">
    	<i className={faClass ? 'fas fa-minus-circle' : 'fas fa-plus-circle'}>&nbsp;
      <span className="dark" onClick={handleClick}> { active ? "expand" : "collapse"}</span></i>
    </div>




<Row>


<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">


<Row>

<div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">

<Row>


<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
<DateFilters/>
<Pharmacy/>




</div>
</Row>

</div>

<CurrentSelections/>


<AccountGroups/>




</Row>

</div>



</Row>









<div className="line two">
	<i class="fas fa-minus-circle tooltips-elements seeLess" role="button" tabindex="0" aria-label="Shows Less" data-original-title="" title="">&nbsp;
  <span className="dark">collapse</span></i>
</div>



<Row>

  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">




<InnerTableTabs/>



  </div>

</Row>






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





</Container>
)


}


export default ProductMovement;
