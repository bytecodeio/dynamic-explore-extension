import React, { useState, useRef, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {Link} from 'react-router-dom';
import EmbedTable from "../EmbedTable";

import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, NavLink, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip} from 'react-bootstrap';


const SlideOut = () => {



const [showMenu, setShowMenu] = React.useState();
 const [startDate, setStartDate] = useState(new Date());


// const wrapperRef = React.useRef(null);
//
// React.useEffect(() => {
//   document.addEventListener("mouseenter", handleClickOutside, false);
//   return () => {
//     document.removeEventListener("mouseleave", handleClickOutside, false);
//
//   };
// }, []);
//
// const handleClickOutside = event => {
//   if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//     setShowMenu(false);
//
//   }
// };
//
//
// const location = useLocation()
// location.pathname
//
// console.log(location)
// console.log(location.pathname)


  return (
    <Container fluid className="mt-50 padding-0 position-relative">


      <Row>
        <Col sm={12} md={12}>



        <Tab.Container id="left-tabs-example" defaultActiveKey="dashboard">
            <Row>
              <Col lg={2} sm={12}>


<div id="slideOut1" className={showMenu ? "show" : ""} >
        <div className="slideOutTab1">


              <div id="one1" className="openTab bottomShadow" role="button" tabindex="0">

                           <div className="toggleMenu" onClick={() => setShowMenu(!showMenu)}>
                           <i class="fal fa-bars"></i>
                           </div>


                           <Nav variant="pills" className="flex-column outerPills">
                           <div class="side-header">
                             <div className="smallLogo"></div>
                            </div>
                             <Nav.Item>
                               <Nav.Link eventKey="dashboard">

                             <i class="fal fa-info-circle"></i>


                               </Nav.Link>
                             </Nav.Item>
                             <Nav.Item>
                               <Nav.Link eventKey="user-profile"><i class="fal fa-chart-bar"></i></Nav.Link>
                             </Nav.Item>
                             <Nav.Item>
                               <Nav.Link eventKey="company-profile"><i class="fal fa-file-alt"></i></Nav.Link>
                             </Nav.Item>
                             <Nav.Item>
                               <Nav.Link eventKey="covid-info"><i class="fal fa-file-invoice-dollar"></i></Nav.Link>
                             </Nav.Item>

                             <Nav.Item>
                               <Nav.Link eventKey="payroll-wages"><i class="fal fa-folders"></i></Nav.Link>
                             </Nav.Item>

                               <Nav.Item>
                                   <Nav.Link eventKey="benefits"><i class="fal fa-sort-alt"></i></Nav.Link>
                               </Nav.Item>


                               <Nav.Item>
                                   <Nav.Link eventKey="file-history"><i class="fal fa-book"></i></Nav.Link>
                               </Nav.Item>

                           </Nav>



          </div>

        </div>

        <div className="modal-content">

          <div className="modal-body">

          <Nav variant="pills" className="flex-column bottom">

            <div className="logo"></div>

            <Nav.Item>
              <Nav.Link eventKey="dashboard">

            <i class="fal fa-info-circle"></i> <p className="small mb-0">How To</p>


              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="user-profile">
            <i class="fal fa-chart-bar"></i> <p className="small mb-0">Dashboard</p>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="company-profile"><i class="fal fa-file-alt"></i>
               <p className="small mb-0">Product Movement</p>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="covid-info"><i class="fal fa-file-invoice-dollar"></i>
               <p className="small mb-0">Invoice Report</p>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="payroll-wages"><i class="fal fa-folders"></i>
              <p className="small mb-0">Auto-Sub Report</p>

              </Nav.Link>
            </Nav.Item>

              <Nav.Item>
                  <Nav.Link eventKey="benefits"><i class="fal fa-sort-alt"></i>
                  <p className="small mb-0">Inflation/Deflation</p>
                  </Nav.Link>
              </Nav.Item>


              <Nav.Item>
                  <Nav.Link eventKey="file-history"><i class="fal fa-book"></i>
                  <p className="small mb-0">Glossary</p>
                  </Nav.Link>
              </Nav.Item>

          </Nav>


                </div>
              </div>



              </div>


              </Col>
              <Col lg={12} sm={12}>
                <Tab.Content className={showMenu ? "slideOver" : ""}>
                  <Tab.Pane eventKey="dashboard">

                  <div className="section pb-0">
                     <div className="container-fluid">

                   <div class="row"><h4 class="text-center fw-semibold">How To</h4><span class="landing-title"></span><h2 class="text-center fw-semibold mb-7"></h2></div>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                  </div>


                  </Tab.Pane>
                  <Tab.Pane eventKey="user-profile">
                  <div className="section pb-0">
                     <div className="container-fluid">

                   <div class="row"><h4 class="text-center fw-semibold">Dashboard</h4><span class="landing-title"></span><h2 class="text-center fw-semibold mb-7"></h2></div>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                  </div>


                  </Tab.Pane>

                <Tab.Pane eventKey="company-profile">


                   <div className="section pb-0">
                      <div className="container-fluid">

                    <div class="row"><h4 class="text-center fw-semibold">Product Movement Report</h4><span class="landing-title"></span><h2 class="text-center fw-semibold mb-7"></h2>
                    </div>




<div class="text-center services-statistics  row">
<div class="row base">
<div class="col-lg-4 col-md-6 landing-statistics">
<div class="row top">

<div class="col-lg-7 col-md-6">
<div className="header">
<div className="main-header-center ms-3 d-none d-lg-block">

<div class="position-relative">
<input placeholder="Search for results..." type="search" class="form-control" />


</div>
</div>
</div>
</div>
<div class="col-lg-2 col-md-6">
<button type="button" class="btn btn-primary">Clear All</button>
</div>



</div>


{/*<div class="row">

<div className="text-dark card-body">
<div className="statistics-info">
<div className="row base">
    <div class="col-lg-7">
        <div class="mt-0">
            <div class="text-dark">
                <div class="services-statistics my-5">
                    <div class="text-center row across">

                            <div class="card">
                                <div class="p-0 card-body">
                                    <div class="counter-status">
                                        <div class="counter-icon bg-primary-transparent box-shadow-primary">

                                        <i class="fal fa-bookmark text-primary fs-23"></i>
                                        </div>
                                        <p class="mb-2 mt-0 fw-semibold">Bookmarks</p>

                                    </div>
                                </div>
                            </div>



                            <div class="card">
                                <div class="p-0 card-body">
                                    <div class="counter-status">
                                        <div class="counter-icon counter bg-secondary-transparent box-shadow-secondary">

                                      <i class="fas fa-circle"><h6 class="numberCounter">17</h6></i>

                                        </div>
                                        <p class="mb-2 mt-0 fw-semibold">Invoice Count</p>
                                    </div>
                                </div>
                            </div>

                            <div class="card">
                                <div class="p-0 card-body">
                                    <div class="counter-status">
                                        <div class="counter-icon bg-success-transparent box-shadow-success">
                                        <i class="fal fa-undo text-success fs-23"></i>



                                        </div>
                                            <p class="mb-2 mt-0 fw-semibold">Restore Default</p>
                                    </div>
                                </div>


                        </div>




                    </div>
                </div>
            </div>
        </div>
    </div>






</div>
</div>
</div>



</div>*/}





</div>



<div class="col-lg-4 landing-statistics">

<div class="row">

<div className="text-dark card-body">
<div className="statistics-info">
<div className="row base">
    <div class="col-lg-7">
        <div class="mt-0">
            <div class="text-dark">
                <div class="services-statistics my-5">
                    <div class="text-center row across">

                            <div class="card">
                                <div class="p-0 card-body">
                                    <div class="counter-status">
                                        <div class="counter-icon bg-primary-transparent box-shadow-primary">

                                        <i class="fal fa-bookmark text-primary fs-23"></i>
                                        </div>
                                        <p class="mb-2 mt-0 fw-semibold">Bookmarks</p>

                                    </div>
                                </div>
                            </div>



                            <div class="card">
                                <div class="p-0 card-body">
                                    <div class="counter-status">
                                        <div class="counter-icon counter bg-secondary-transparent box-shadow-secondary">

                                      <i class="fas fa-circle"><h6 class="numberCounter">17</h6></i>

                                        </div>
                                        <p class="mb-2 mt-0 fw-semibold">Invoice Count</p>
                                    </div>
                                </div>
                            </div>

                            <div class="card">
                                <div class="p-0 card-body">
                                    <div class="counter-status">
                                        <div class="counter-icon bg-success-transparent box-shadow-success">
                                        <i class="fal fa-undo text-success fs-23"></i>



                                        </div>
                                            <p class="mb-2 mt-0 fw-semibold">Restore Default</p>
                                    </div>
                                </div>


                        </div>




                    </div>
                </div>
            </div>
        </div>
    </div>



  <div class="col-lg-5">
    <div class="position-relative d-flex align-items-center">




    <input placeholder="Top % Products" type="search" class="form-control small" />




    </div>

</div>



</div>
</div>
</div>



</div>



</div>


<div class="col-lg-4">
<div class="column">

<div class="col-lg-12 col-md-12">
    <div class="card">
        <div class="card-header">
            <div class="card-title h5">Date Filters</div>

        </div>
        <div class="card-body p-5">

        <div class="d-flex flex-wrap">

    <Form.Group  controlId="formBasicCheckbox15">
      <Form.Check  type="radio" label="MTD" name="filters" />
    </Form.Group>

    <Form.Group controlId="formBasicCheckbox16">
      <Form.Check  type="radio" label="Prev Month" name="filters" />
    </Form.Group>

    <Form.Group controlId="formBasicCheckbox17">
      <Form.Check type="radio" label="QTD" name="filters"/>
    </Form.Group>

    <Form.Group controlId="formBasicCheckbox18">
      <Form.Check type="radio" label="Prev QTR" name="filters"/>
    </Form.Group>



    <Form.Group controlId="formBasicCheckbox19">
      <Form.Check type="radio" label="YTD" name="filters"/>
    </Form.Group>



    <Form.Group controlId="formBasicCheckbox20">
      <Form.Check type="radio" label="Prev Year" name="filters"/>
    </Form.Group>



    <Form.Group controlId="formBasicCheckbox21">
      <Form.Check type="radio" label="All Years" name="filters"/>
    </Form.Group>



</div>

        </div>
    </div>
</div>


{/*<div class="d-flex">

<div class="columnStart mr2">
<p className="small">Start Date</p>
<Form.Control type="date"/>
</div>
<div class="columnStart">
<p className="small">End Date</p>
<Form.Control type="date"  />
</div>
</div>*/}





</div>
</div>
</div>
    </div>
                    </div>
                    </div>







                    <div className="row">
                    <div className="col-lg-4 col-md-12">


                    <div class="card">
                        <div class="card-header"><h4 class="fw-semibold card-title">Current Selections</h4></div>
                        <div class="card-body">
                            <ul class="task-list">
                                <li class="d-sm-flex">
                                    <div>
                                        <i class="task-icon bg-primary"></i>

                                        <Form.Group controlId="formBasicCheckbox4">
                                          <Form.Check type="checkbox" label="Taxes & Fees" />
                                        </Form.Group>
                                        <p class="text-muted fs-12">&nbsp;<a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>
                                    <div class="ms-auto d-md-flex">
                                        <a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-edit me-2 text-muted"></span></a><a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-trash text-muted"></span></a>
                                    </div>
                                </li>
                                <li class="d-sm-flex">
                                    <div>
                                          <i class="task-icon bg-primary"></i>
                                        <Form.Group controlId="formBasicCheckbox2">
                                          <Form.Check  type="checkbox" label="Account Name Selector" />
                                        </Form.Group>
                                        <p class="text-muted fs-12">&nbsp; <a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>
                                    <div class="ms-auto d-md-flex">
                                        <a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-edit me-2 text-muted"></span></a><a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-trash text-muted"></span></a>
                                    </div>
                                </li>
                                <li class="d-sm-flex">
                                    <div>
                                    <i class="task-icon bg-primary"></i>
                                        <Form.Group controlId="formBasicCheckbox3">
                                        <Form.Check type="checkbox" label="Top %" />
                                        </Form.Group>
                                          <p class="text-muted fs-12">&nbsp; <a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>
                                    <div class="ms-auto d-md-flex">
                                        <a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-edit me-2 text-muted"></span></a><a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-trash text-muted"></span></a>
                                    </div>
                                </li>
                                <li class="d-sm-flex">
                                    <div>
                                        <i class="task-icon bg-primary"></i>
                                        <Form.Group controlId="formBasicCheckbox4">
                                        <Form.Check type="checkbox" label="Invoice Date" />
                                        </Form.Group>
                                        <p class="text-muted fs-12">&nbsp; <a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>
                                    <div class="ms-auto d-md-flex">
                                        <a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-edit me-2 text-muted"></span></a><a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-trash text-muted"></span></a>
                                    </div>
                                </li>
                                <li class="d-sm-flex">
                                    <div>
                                    <i class="task-icon bg-primary"></i>
                                    <Form.Group controlId="formBasicCheckbox5">
                                    <Form.Check type="checkbox" label="Name Selector" />
                                    </Form.Group>
                                      <p class="text-muted fs-12">&nbsp; <a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>
                                    <div class="ms-auto d-md-flex">
                                        <a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-edit me-2 text-muted"></span></a><a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-trash text-muted"></span></a>
                                    </div>
                                </li>
                                <li class="d-sm-flex">
                                    <div>
                                    <i class="task-icon bg-primary"></i>
                                    <Form.Group controlId="formBasicCheckbox6">
                                    <Form.Check type="checkbox" label="Include MTD" />
                                    </Form.Group>
                                      <p class="text-muted fs-12">&nbsp; <a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>
                                    <div class="ms-auto d-md-flex">
                                        <a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-edit me-2 text-muted"></span></a><a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-trash text-muted"></span></a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>




                    </div>
                    <div className="col-lg-4 col-md-12">


                    <div class="card">
                        <div class="card-header"><h4 class="fw-semibold card-title">Account Groups</h4></div>
                        <div class="card-body">
                            <ul class="task-list">
                                <li class="d-sm-flex">
                                    <div>
                                        <i class="task-icon bg-primary"></i>

                                        <Form.Group controlId="formBasicCheckbox4">
                                          <Form.Check type="checkbox" label="Taxes & Fees" />
                                        </Form.Group>
                                        <p class="text-muted fs-12">&nbsp;<a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>
                                    <div class="ms-auto d-md-flex">
                                        <a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-edit me-2 text-muted"></span></a><a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-trash text-muted"></span></a>
                                    </div>
                                </li>
                                <li class="d-sm-flex">
                                    <div>
                                          <i class="task-icon bg-primary"></i>
                                        <Form.Group controlId="formBasicCheckbox2">
                                          <Form.Check  type="checkbox" label="Account Name Selector" />
                                        </Form.Group>
                                        <p class="text-muted fs-12">&nbsp; <a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>
                                    <div class="ms-auto d-md-flex">
                                        <a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-edit me-2 text-muted"></span></a><a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-trash text-muted"></span></a>
                                    </div>
                                </li>
                                <li class="d-sm-flex">
                                    <div>
                                    <i class="task-icon bg-primary"></i>
                                        <Form.Group controlId="formBasicCheckbox3">
                                        <Form.Check type="checkbox" label="Top %" />
                                        </Form.Group>
                                          <p class="text-muted fs-12">&nbsp; <a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>
                                    <div class="ms-auto d-md-flex">
                                        <a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-edit me-2 text-muted"></span></a><a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-trash text-muted"></span></a>
                                    </div>
                                </li>
                                <li class="d-sm-flex">
                                    <div>
                                        <i class="task-icon bg-primary"></i>
                                        <Form.Group controlId="formBasicCheckbox4">
                                        <Form.Check type="checkbox" label="Invoice Date" />
                                        </Form.Group>
                                        <p class="text-muted fs-12">&nbsp; <a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>
                                    <div class="ms-auto d-md-flex">
                                        <a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-edit me-2 text-muted"></span></a><a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-trash text-muted"></span></a>
                                    </div>
                                </li>
                                <li class="d-sm-flex">
                                    <div>
                                    <i class="task-icon bg-primary"></i>
                                    <Form.Group controlId="formBasicCheckbox5">
                                    <Form.Check type="checkbox" label="Name Selector" />
                                    </Form.Group>
                                      <p class="text-muted fs-12">&nbsp; <a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>
                                    <div class="ms-auto d-md-flex">
                                        <a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-edit me-2 text-muted"></span></a><a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-trash text-muted"></span></a>
                                    </div>
                                </li>
                                <li class="d-sm-flex">
                                    <div>
                                    <i class="task-icon bg-primary"></i>
                                    <Form.Group controlId="formBasicCheckbox6">
                                    <Form.Check type="checkbox" label="Include MTD" />
                                    </Form.Group>
                                      <p class="text-muted fs-12">&nbsp; <a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>
                                    <div class="ms-auto d-md-flex">
                                        <a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-edit me-2 text-muted"></span></a><a href="/sash/preview/components/dashboard/dashboard/#!"><span class="fal fa-trash text-muted"></span></a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>




                    </div>

                    <div className="col-lg-4 col-md-12">


                    <div class="card pt-2">

                        <div class="card-body wrapFilters">
                            <ul class="task-list">
                                <li class="d-sm-flex">
                                    <div>
                                        <i class="task-icon bg-primary"></i>

                                        <Form.Group  controlId="formBasicCheckbox">
                                        <Form.Check  type="checkbox" label="Rx" />
                                        </Form.Group>
                                        <p class="text-muted fs-12">&nbsp;<a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>

                                </li>
                                <li class="d-sm-flex">
                                    <div>
                                          <i class="task-icon bg-primary"></i>
                                          <Form.Group controlId="formBasicCheckbox2">
                                          <Form.Check  type="checkbox" label="Brand" />
                                          </Form.Group>
                                        <p class="text-muted fs-12">&nbsp; <a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>

                                </li>
                                <li class="d-sm-flex">
                                    <div>
                                    <i class="task-icon bg-primary"></i>
                                    <Form.Group controlId="formBasicCheckbox3">
                                    <Form.Check type="checkbox" label="On Contract" />
                                    </Form.Group>
                                          <p class="text-muted fs-12">&nbsp; <a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>

                                </li>
                                <li class="d-sm-flex">
                                    <div>
                                        <i class="task-icon bg-primary"></i>
                                        <Form.Group controlId="formBasicCheckbox5">
                                        <Form.Check type="checkbox" label="SOURCE" />
                                        </Form.Group>
                                        <p class="text-muted fs-12">&nbsp; <a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>

                                </li>
                                <li class="d-sm-flex">
                                    <div>
                                    <i class="task-icon bg-primary"></i>
                                    <Form.Group controlId="formBasicCheckbox4">
                                    <Form.Check type="checkbox" label="Controlled" />
                                    </Form.Group>
                                      <p class="text-muted fs-12">&nbsp; <a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>

                                </li>
                                <li class="d-sm-flex">
                                    <div>
                                    <i class="task-icon bg-primary"></i>
                                    <Form.Group controlId="formBasicCheckbox6">
                                    <Form.Check type="checkbox" label="SPX" />
                                    </Form.Group>
                                      <p class="text-muted fs-12">&nbsp; <a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>

                                </li>

                                <li class="d-sm-flex">
                                    <div>
                                    <i class="task-icon bg-primary"></i>
                                    <Form.Group controlId="formBasicCheckbox14">
                                    <Form.Check type="checkbox" label="Purchases" />
                                    </Form.Group>
                                      <p class="text-muted fs-12">&nbsp; <a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>

                                </li>
                            </ul>

                            <ul class="task-list">
                                <li class="d-sm-flex">
                                    <div>
                                        <i class="task-icon bg-primary"></i>

                                        <Form.Group controlId="formBasicCheckbox7">
                                        <Form.Check type="checkbox" label="Speciality" />
                                        </Form.Group>
                                        <p class="text-muted fs-12">&nbsp;<a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>

                                </li>
                                <li class="d-sm-flex">
                                    <div>
                                          <i class="task-icon bg-primary"></i>
                                          <Form.Group  controlId="formBasicCheckbox8">
                                          <Form.Check  type="checkbox" label="Non-Rx" />
                                          </Form.Group>
                                        <p class="text-muted fs-12">&nbsp; <a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>

                                </li>
                                <li class="d-sm-flex">
                                    <div>
                                    <i class="task-icon bg-primary"></i>
                                    <Form.Group controlId="formBasicCheckbox9">
                                    <Form.Check  type="checkbox" label="Generic" />
                                    </Form.Group>
                                          <p class="text-muted fs-12">&nbsp; <a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>

                                </li>
                                <li class="d-sm-flex">
                                    <div>
                                        <i class="task-icon bg-primary"></i>
                                        <Form.Group controlId="formBasicCheckbox10">
                                        <Form.Check type="checkbox" label="Off Contract" />
                                        </Form.Group>
                                        <p class="text-muted fs-12">&nbsp; <a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>

                                </li>
                                <li class="d-sm-flex">
                                    <div>
                                    <i class="task-icon bg-primary"></i>
                                    <Form.Group controlId="formBasicCheckbox11">
                                    <Form.Check type="checkbox" label="Non-Controlled" />
                                    </Form.Group>
                                      <p class="text-muted fs-12">&nbsp; <a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>

                                </li>
                                <li class="d-sm-flex">
                                    <div>
                                    <i class="task-icon bg-primary"></i>
                                    <Form.Group controlId="formBasicCheckbox12">
                                    <Form.Check type="checkbox" label="Non-SOURCE" />
                                    </Form.Group>
                                      <p class="text-muted fs-12">&nbsp; <a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>

                                </li>

                                <li class="d-sm-flex">
                                    <div>
                                    <i class="task-icon bg-primary"></i>
                                    <Form.Group controlId="formBasicCheckbox13">
                                    <Form.Check type="checkbox" label="Non-SPX" />
                                    </Form.Group>
                                      <p class="text-muted fs-12">&nbsp; <a class="fw-semibold" href="/sash/preview/components/dashboard/dashboard/#!">&nbsp;</a></p>
                                    </div>

                                </li>
                            </ul>
                        </div>
                    </div>


                    </div>
                    </div>
                    <div class="col-md-12">
                    <div class="card">


                    <div class="card-body">
                    <div class="row">
                    <div class="col-md-10">
                        <div class="content_wrapper border tab-content">
                            <div role="tabpanel" id="right-tabs-example-tabpane-first" aria-labelledby="right-tabs-example-tab-first" class="fade tab_content tab-pane active show">
                            <EmbedTable/>
                            </div>
                            <div role="tabpanel" id="right-tabs-example-tabpane-second" aria-labelledby="right-tabs-example-tab-second" class="fade tab_content tab-pane">
                                <p>
                                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
                                    College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum
                                    comes from sections 1.10.32 and 1.10.33 of"de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.
                                    The first line of Lorem Ipsum,"Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                    from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going
                                    through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of"de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                                    written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                                </p>
                            </div>
                            <div role="tabpanel" id="right-tabs-example-tabpane-third" aria-labelledby="right-tabs-example-tab-third" class="fade tab_content tab-pane">
                                <p>
                                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
                                    opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum'
                                    will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like) It is a long established fact that a reader
                                    will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content
                                    here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in
                                    their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                </p>
                            </div>
                            <div role="tabpanel" id="right-tabs-example-tabpane-fourth" aria-labelledby="right-tabs-example-tab-fourth" class="fade tab_content tab-pane">
                                <p>
                                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
                                    College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum
                                    comes from sections 1.10.32 and 1.10.33 of"de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.
                                    The first line of Lorem Ipsum,"Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                    from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going
                                    through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of"de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                                    written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                                </p>
                            </div>
                            <div role="tabpanel" id="right-tabs-example-tabpane-fifth" aria-labelledby="right-tabs-example-tab-fifth" class="fade tab_content tab-pane">
                                <p>
                                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going
                                    to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making
                                    this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum
                                    is therefore always free from repetition, injected humour, or non-characteristic words etc. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by
                                    injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All
                                    the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of
                                    model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                                </p>
                            </div>
                            <div role="tabpanel" id="right-tabs-example-tabpane-sixth" aria-labelledby="right-tabs-example-tab-sixth" class="fade tab_content tab-pane">
                                <p>
                                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
                                    College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum
                                    comes from sections 1.10.32 and 1.10.33 of"de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.
                                    The first line of Lorem Ipsum,"Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                    from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going
                                    through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of"de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                                    written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="flex-column tab_wrapper second_tab right_side nav nav-pills" role="tablist">
                            <div class="nav-item">
                                <a role="tab" data-rr-ui-event-key="first" id="right-tabs-example-tab-first" aria-controls="right-tabs-example-tabpane-first" aria-selected="true" class="nav-link active" tabindex="0" href="#">Product Movement Details</a>
                            </div>
                            <div class="nav-item"><a role="tab" data-rr-ui-event-key="second" id="right-tabs-example-tab-second" aria-controls="right-tabs-example-tabpane-second" aria-selected="false" tabindex="-1" class="nav-link" href="#">Top Product View</a></div>
                            <div class="nav-item"><a role="tab" data-rr-ui-event-key="third" id="right-tabs-example-tab-third" aria-controls="right-tabs-example-tabpane-third" aria-selected="false" tabindex="-1" class="nav-link" href="#">Custom Subtotaling</a></div>

                        </div>
                    </div>
                    </div>


                    <pre class="mt-2 collapse">


                    <code>

                    <p>dsvvsdjkhbvsd</p>
                    </code>
                    </pre>



                    </div>
                    </div>
                    </div>

                </Tab.Pane>

                <Tab.Pane eventKey="covid-info">
                <div className="section pb-0">
                   <div className="container-fluid">

                 <div class="row"><h4 class="text-center fw-semibold">Invoice Report</h4><span class="landing-title"></span><h2 class="text-center fw-semibold mb-7"></h2></div>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                </div>
                  </Tab.Pane>


                  <Tab.Pane eventKey="payroll-wages">
                  <div className="section pb-0">
                     <div className="container-fluid">

                   <div class="row"><h4 class="text-center fw-semibold">Auto-Sub Report</h4><span class="landing-title"></span><h2 class="text-center fw-semibold mb-7"></h2></div>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                  </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="benefits">
                  <div className="section pb-0">
                   <div className="container-fluid">

                   <div class="row"><h4 class="text-center fw-semibold">Inflation/Deflation Report</h4><span class="landing-title"></span><h2 class="text-center fw-semibold mb-7"></h2></div>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                  </div>
                  </Tab.Pane>


                  <Tab.Pane eventKey="file-history">
                  <div className="section pb-0">
               <div className="container-fluid">

                   <div class="row"><h4 class="text-center fw-semibold">Glossary</h4><span class="landing-title"></span><h2 class="text-center fw-semibold mb-7"></h2></div>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                  </div>
                  </Tab.Pane>

                  </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>

          </Col>

          </Row>






          </Container>





  );

  }


  export default SlideOut;
