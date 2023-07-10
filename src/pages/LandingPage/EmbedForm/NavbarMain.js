import React, { useState, useContext, useEffect } from "react";
import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, NavLink, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import "../../../styles.css";


import { EmbedExplore } from "../EmbedExplore/EmbedExplore";
import { EmbedMultiExplores } from "../EmbedMultiExplores/EmbedMultiExplores";
import { ExtensionContext } from "@looker/extension-sdk-react";
import { connection, scratch_schema } from "../../../utils/writebackConfig";

const NavbarMain = ({showMenu,setShowMenu}) => {
  const { extensionSDK, core40SDK } = useContext(ExtensionContext);
  const [message, setMessage] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        const value = await core40SDK.ok(core40SDK.me());
        setMessage(`${value.display_name}`);
      } catch (error) {
        setMessage("Error occured getting information about me!");
        console.error(error);
      }
    };
    initialize();
  }, []);

  const [faClass, setFaClass] = useState(true);

  const handleClick = () => {
    setFaClass(!faClass);
     document.body.classList.toggle('dark-mode');
   };

  return (
<Container fluid className="padding-0">
<div className="inner_page_block white_option"></div>

    <Navbar collapseOnSelect expand="lg">
      <Container fluid>

      <a href="" target="_blank" class="mneg5">

      </a>

      <div className="white-logo"></div>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav className="align-items-center">

        <Navbar.Text>

        <a className="dark-layout" onClick={handleClick}>
          <i className={faClass ? 'far fa-moon' : 'far fa-sun'}></i>
          </a>

            <i class="fal fa-user me-1 blue"></i><a href="#login" className="me-2 blue">{message}</a>
        </Navbar.Text>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

</Container>
)


}


export default NavbarMain;
