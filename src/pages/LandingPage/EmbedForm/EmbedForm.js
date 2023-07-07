import React, { useState, useContext, useEffect } from "react";
import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, NavLink, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route,  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


import "../../../styles.css";
import SlideOut from "./nav/SlideOut";

import SideForm from "./nav/Form.js";
import ProductMovement from "./ProductMovement";


import Dashboard from "./Dashboard";
import ToTopButton from './ToTopButton.js';
import NavbarMain from "./NavbarMain";
import HowTo from "./helpers/HowTo";
import { EmbedExplore } from "../EmbedExplore/EmbedExplore";
import { EmbedMultiExplores } from "../EmbedMultiExplores/EmbedMultiExplores";
import { ExtensionContext } from "@looker/extension-sdk-react";

import InnerTableTabs from "./InnerTableTabs";
import { connection, scratch_schema } from "../../../utils/writebackConfig";

import {
  LOOKER_MODEL,
  LOOKER_EXPLORE,
  LOOKML_FIELD_TAGS
} from "../../../utils/constants";

import { sortDateFilterList } from "../../../utils/globalFunctions";

export const EmbedForm = ({saveClicked, setSaveClicked}) => {
const { core40SDK: sdk } = useContext(ExtensionContext);


//Create states for global variables
const [isFetchingLookmlFields, setIsFetchingLookmlFields] = useState(true);
const [selectedFilters, setSelectedFilters] = useState({});
const [selectedDateFilter, setSelectedDateFilter] = useState("");
const [selectedDateRangeStart, setSelectedDateRangeStart] = useState();
const [selectedDateRangeEnd, setSelectedDateRangeEnd] = useState();

const [productMovementFields, setProductMovementFields] = useState([]);
const [filterOptions, setFilterOptions] = useState([]);
const [dateFilterOptions, setDateFilterOptions] = useState([]);
const [dateRangeStart, setDateRangeStart] = useState("");
const [dateRangeEnd, setDateRangeEnd] = useState("")

// Initialize the states
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

  const fetchLookmlFields = async () => {
    const {
      fields: { dimensions, filters, measures },
    } = await sdk.ok(
      sdk.lookml_model_explore(LOOKER_MODEL, LOOKER_EXPLORE, "fields")
    );

    const lookmlFields = [...dimensions, ...filters, ...measures];
    const fieldsByTag = groupFieldsByTags(lookmlFields);

    const _filterOptions = fieldsByTag[LOOKML_FIELD_TAGS.filter];    
    const _dateFilterOptions = fieldsByTag[LOOKML_FIELD_TAGS.date_filter];

    const _productMovementfieldOptions = fieldsByTag[LOOKML_FIELD_TAGS.productMovementField];

    const _dateRangeStart = fieldsByTag[LOOKML_FIELD_TAGS.dateRangeStart];
    const _dateRangeEnd = fieldsByTag[LOOKML_FIELD_TAGS.dateRangeEnd];

    console.log(_dateRangeStart)
    console.log(_dateRangeEnd)
    
    const defaultFilterSelections = Object.fromEntries(
      _filterOptions.map((filter) => [filter.name, "N/A"])
    );

    const defaultDateFilterSelections = _dateFilterOptions?.find(filter => {
      if (filter['suggestions']) {     
        console.log(filter['suggestions'])     
        return filter['suggestions'].find(s => {
          return s.toUpperCase() === "YES"
        })
      }
    });

    console.log(defaultDateFilterSelections)
    
    if (defaultDateFilterSelections != undefined) {
      setSelectedDateFilter(defaultDateFilterSelections['name'])
    }

    let defaultDateStart = await getValues(_dateRangeStart)
    console.log(defaultDateStart)
    setSelectedDateRangeStart(defaultDateStart[0])

    let defaultDateEnd = await getValues(_dateRangeEnd)
    console.log(defaultDateEnd)
    setSelectedDateRangeStart(defaultDateEnd[0])

    setFilterOptions(_filterOptions);
    setProductMovementFields(_productMovementfieldOptions);
    setDateFilterOptions(sortDateFilterList(_dateFilterOptions))
    setSelectedFilters(defaultFilterSelections);
    setDateRangeStart(_dateRangeStart);
    setDateRangeEnd(_dateRangeEnd);
    setIsFetchingLookmlFields(false);
  }

  try {
    fetchLookmlFields();
  } catch (e) {
    console.error("Error fetching Looker filters and fields", e);
  }
}, []);

const getValues = (dimension) => {
    return sdk.ok(
      sdk.run_inline_query({
        result_format: "json",
        body: {
          model: LOOKER_MODEL,
          view: dimension[0]['view'],
          fields: [dimension[0]['name']],
        },
      })
    );
}

    return (
    <>
<NavbarMain/>

<Container fluid className="mt-50 padding-0">
    <div className="largePadding">
     <div id="nav2">
      <Tabs
      defaultActiveKey="dashboard"
      className="mb-0"
      fill
      >
      <Tab eventKey="dashboard" title="Dashboard">

      {/* <Dashboard/> */}
      </Tab>

      <Tab eventKey="product-movement" title="Product Movement Report">
        <ProductMovement 
          selectedFilters={selectedFilters} 
          setSelectedFilters={setSelectedFilters}
          filterOptions={filterOptions}
          dateFilterOptions={dateFilterOptions}
          fieldOptions={productMovementFields}
          isFetchingLookmlFields={isFetchingLookmlFields}
          setSelectedDateFilter={setSelectedDateFilter}
          selectedDateFilter={selectedDateFilter}
        />
      </Tab>
      <Tab eventKey="invoice" title="Invoice Report">

      </Tab>
      <Tab eventKey="auto-sub" title="Auto-Sub Report">

      </Tab>
      <Tab eventKey="id" title="Inflation/Deflation Report">

      </Tab>
    </Tabs>
    </div>
  </div>





</Container>
<ToTopButton />

<SideForm/>



        </>
        )
      };
