import React, { useState, useContext, useEffect } from "react";
import { Container, Tab, Tabs, Nav, NavItem} from "react-bootstrap";
import SideForm from "./components/nav/Form.js";
import PurchasesReview from "./pageTemplates/PurchasesReview/PurchasesReview.js";
import InflationDeflation from "./pageTemplates/InflationDeflation/InflationDeflation.js";
import ToTopButton from "./components/ToTopButton.js";
import NavbarMain from "./components/NavbarMain.js";
import Footer from "./components/Footer.js";
import { ExtensionContext } from "@looker/extension-sdk-react";
import moment from "moment";
import Template1 from "./pageTemplates/Template1/Template1.js";
import TopNav from "./components/nav/TopNav.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import {
  LOOKER_MODEL,
  LOOKER_EXPLORE,
  LOOKML_FIELD_TAGS,
  PRODUCT_MOVEMENT_VIS_DASHBOARD_ID,
} from "./utils/constants2.js";

import Template2 from "./pageTemplates/Template2/Template2.js";
import Template3 from "./pageTemplates/Template3/Template3.js";
import { BrowserRouter, Routes, Route, Link, useNavigate, Switch, useRouteMatch } from "react-router-dom";
import Test from "./Test.js";
import { useHistory, useLocation, useParams } from "react-router-dom/cjs/react-router-dom.js";
import { getApplication, getApplicationTabs, getTabVisualizations } from "./utils/writebackService.js";
import { LayoutSelector } from "./LayoutSelector.js";

export const Main2 = () => {
  const { core40SDK: sdk } = useContext(ExtensionContext);

  const [currentNavTab, setCurrentNavTab] = useState("dashboard");

  const [isFetchingLookmlFields, setIsFetchingLookmlFields] = useState(true);

  const [showMenu, setShowMenu] = useState();
  const [keyword, setKeyword] = useState("");

  const [filters, setFilters] = useState([]);
  const [fields, setFields] = useState([])
  const [properties, setProperties] = useState([])

  const [initialLoad, setInitialLoad] = useState(true)

  const [selectedFilters, setSelectedFilters] = useState([])

  const [tabs, setTabs] = useState([])
  const [application, setApplication] = useState({})

  const params = useParams();

  const route = useRouteMatch()

  const slideIt = (show) => {
    setShowMenu(show);
  };

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  // Initialize the states
  useEffect(() => {
    function groupFieldsByTags(fields) {
      const fieldsByTag = {};
      fields.forEach((field) => {
        if (field.tags != "") {
          field.tags
            .toString()
            .split(",")
            .forEach((tag) => {
              tag = tag.trim();

              if (fieldsByTag[tag] === undefined) {
                fieldsByTag[tag] = [field];
              } else {
                fieldsByTag[tag].push(field);
              }
            });
        }
      });
      return fieldsByTag;
    }

    const initializeApp = async () => {
      let app = await getApplication(params.path,sdk);
      if (app.length > 0) {
        setApplication(app[0])
        let appTabs = await getApplicationTabs(app[0].id, sdk)
        if (appTabs.length > 0) {
          for await (let tab of appTabs) {
            let vis = await getTabVisualizations(tab.id, sdk);
            tab['config'] = vis;
          }
          setTabs(appTabs)
        }
        console.log(appTabs)
      }
      return app[0];
    }



    const fetchLookmlFields = async () => {
      let {model, explore} = await initializeApp();
      console.log(model, explore)

      const response = await sdk.ok(
        sdk.lookml_model_explore(model, explore, "fields")
      );

      const {
        fields: { dimensions, filters, measures, parameters },
      } = response;

      const lookmlFields = [
        ...dimensions,
        ...filters,
        ...measures,
        ...parameters,
      ];
      const fieldsByTag = groupFieldsByTags(lookmlFields);

      let _filters = []
      for await(let f of LOOKML_FIELD_TAGS.filters) {
        let _type = f.type;
        let _tag = f.tag;
        let _fields = fieldsByTag[_tag];
        let _options = []
        if (f.options === "fields") {
          _options = _fields;
        }
        if (f.options === "date range") {
          _options = {field:_fields[0], values:getDefaultDateRange()}
        }
        if (f.options === "values") {
          for await (let field of _fields) {
            let values = await getValues(field, {})
            _options.push({field:field, values:values})
          }
        }
        if (f.options === "single_dimension_value") {
          console.log("account groups", _fields)
          if (_fields.length > 0) {
            let value = await getValues(_fields[0],{})
            console.log("account groups", value)
            _options = ({field:_fields[0], values:value})
          }
        }
        _filters.push({type:_type, fields:fieldsByTag[_tag], options:_options})
      }

      console.log("filters", _filters)

      let _appProperties = []
      for await (let p of LOOKML_FIELD_TAGS.properties){
        let _type = p.type;
        let _text = p.text;
        let _tag = p.tag;
        let _fields = fieldsByTag[_tag]
        let _options = ""
        if (p.options === "single_value") {
          let value = await getValues(_fields[0],{});
          _options = value[0]
        }
        _appProperties.push({type:_type, text:_text, fields:_fields[0], value:_options})
      }

      let _fields = LOOKML_FIELD_TAGS.fields.map(f => {
        let _tab = f.tab;
        let _tag = f.tag;
        return {tab:_tab, fields:fieldsByTag[_tag]}
      })

      setFilters(_filters)
      setProperties(_appProperties)
      setFields(_fields)

      console.log("app props",_appProperties)

      let defaultSelected = {}
      _filters.map(f => defaultSelected[f.type] = {})
      setSelectedFilters(defaultSelected)

      setIsFetchingLookmlFields(false);
    };

    try {
      fetchLookmlFields();
    } catch (e) {
      console.error("Error fetching Looker filters and fields", e);
    }
  }, []);

  const getDefaultDateRange = () => {
    let prevMonth = moment().subtract(1, "month");
    let startOfMonth = prevMonth
      .startOf("month")
      .format("YYYY-MM-DD")
      .toString();
    let endOfMonth = prevMonth.endOf("month").format("YYYY-MM-DD").toString();
    return `${startOfMonth} to ${endOfMonth}`;
  };

  const getValues = (field, filters) => {
    return sdk.ok(
      sdk.run_inline_query({
        result_format: "json",
        body: {
          model: LOOKER_MODEL,
          view: LOOKER_EXPLORE,
          fields: [field["name"]],
          filters: filters,
          limit:1000
        },
      })
    );
  };

  const updateAppProperties = async (filters) => {
    let newProps = []
    for await (let prop of properties) {
        let _value = await getValues(prop['fields'], filters)
        prop.value = _value[0]
        newProps.push(prop)
    }
    setProperties(newProps)
  }

  const layoutSelection = (tabProps) => {
    if (tabProps.layout_name === "Template1") {
      return <Template2 key={tabProps.id}
          currentNavTab={currentNavTab}
          filters={filters}
          fields={fields.find(({tab}) => tab === "Product Movement Report")}
          properties={properties}
          updateAppProperties={updateAppProperties}
          isFetchingLookmlFields={isFetchingLookmlFields}
          config={tabProps.config}
          tabKey={tabProps.route}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          description={{description: <div dangerouslySetInnerHTML={{__html:tabProps.description}} />}}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          initialLoad={initialLoad}
          setInitialLoad={setInitialLoad}/>;
    }
  }

  return (
    <>
      <NavbarMain />
      <Container fluid className="mt-50 padding-0">
        <TopNav />
         <div className={showMenu ? "largePadding" : "slideOver largePadding"}>
          <div id="nav2">
            <Tab.Container
              defaultActiveKey={currentNavTab}
              onSelect={(k) => setCurrentNavTab(k)}>
              <Nav className="inner nav nav-tabs nav-fill">
                {tabs?.map(t =>
                  <Nav.Item>
                    <Nav.Link eventKey={t.route} as={Link} to={`${route.url}/${t.route}`}>{t.title}</Nav.Link>
                  </Nav.Item>
                )}
              </Nav>
            </Tab.Container>
            <div className="show">
            <Tab.Content>
              <Switch>
                {tabs?.map((t,i) =>
                  <Route exact path={`${route.url}/${t.route}`}>
                    <LayoutSelector key={i}
                      tabProps={t}
                      currentNavTab={currentNavTab}
                      filters={filters}
                      fields={fields}
                      properties={properties}
                      updateAppProperties={updateAppProperties}
                      isFetchingLookmlFields={isFetchingLookmlFields}
                      showMenu={showMenu}
                      setShowMenu={setShowMenu}
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      initialLoad={initialLoad}
                      setInitialLoad={setInitialLoad}
                      />
                  </Route>
                )}
                <Route path={`${route.url}/`}>
                  <Test />
                </Route>
              </Switch>
            </Tab.Content>
            </div>
            {/* <Tabs
              defaultActiveKey={currentNavTab}
              onSelect={(k) => setCurrentNavTab(k)}
              className="mb-0"
              fill
            >
               {/* <Tab eventKey="dashboard" title="Purchases Review">
                <PurchasesReview
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  filterOptions={filterOptions}
                  dateFilterOptions={dateFilterOptions}
                  fieldOptions={productMovementFields}
                  isFetchingLookmlFields={isFetchingLookmlFields}
                  setSelectedDateFilter={setSelectedDateFilter}
                  selectedDateFilter={selectedDateFilter}
                  setSelectedDateRange={setSelectedDateRange}
                  selectedDateRange={selectedDateRange}
                  dateRange={dateRange}
                  currentNavTab={currentNavTab}
                  currentInvoiceCount={currentInvoiceCount}
                  updateInvoiceCount={updateInvoiceCount}
                  getAllFilters={getAllFilters}
                  setSelectedAccountGroup={setSelectedAccountGroup}
                  accountGroupOptions={accountGroupOptions}
                  selectedAccountGroup={selectedAccountGroup}
                  accountGroupField={accountGroupField}
                  showMenu={showMenu}
                  setShowMenu={setShowMenu}
                  dimensionToggleFields={dimensionToggleFields}
                  quickFilterOptions={quickFilterOptions}
                />
              </Tab>
              <Tab eventKey="product-movement" title="Product Movement Report">
                <Template1
                  currentNavTab={currentNavTab}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  filterOptions={filterOptions}
                  dateFilterOptions={dateFilterOptions}
                  fieldOptions={productMovementFields}
                  isFetchingLookmlFields={isFetchingLookmlFields}
                  setSelectedDateFilter={setSelectedDateFilter}
                  selectedDateFilter={selectedDateFilter}
                  setSelectedDateRange={setSelectedDateRange}
                  selectedDateRange={selectedDateRange}
                  dateRange={dateRange}
                  config={{ tabbedVis1: PRODUCT_MOVEMENT_VIS_DASHBOARD_ID }}
                  tabKey={"product-movement"}
                  showMenu={showMenu}
                  setShowMenu={setShowMenu}
                  currentInvoiceCount={currentInvoiceCount}
                  updateInvoiceCount={updateInvoiceCount}
                  getAllFilters={getAllFilters}
                  setSelectedAccountGroup={setSelectedAccountGroup}
                  accountGroupOptions={accountGroupOptions}
                  selectedAccountGroup={selectedAccountGroup}
                  accountGroupField={accountGroupField}
                  keyword={keyword}
                  handleChangeKeyword={handleChangeKeyword}
                  quickFilterOptions={quickFilterOptions}
                  setSelectedQuickFilter={setSelectedQuickFilter}
                  selectedQuickFilter={selectedQuickFilter}
                  description={{description: <div dangerouslySetInnerHTML={{__html:comment1}} />}}
                />
              </Tab>
              <Tab eventKey="invoice" title="Invoice Report">
                <Template1
                  currentNavTab={currentNavTab}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  filterOptions={filterOptions}
                  dateFilterOptions={dateFilterOptions}
                  fieldOptions={productMovementFields}
                  isFetchingLookmlFields={isFetchingLookmlFields}
                  setSelectedDateFilter={setSelectedDateFilter}
                  selectedDateFilter={selectedDateFilter}
                  setSelectedDateRange={setSelectedDateRange}
                  selectedDateRange={selectedDateRange}
                  dateRange={dateRange}
                  config={{ tabbedVis1: PRODUCT_MOVEMENT_VIS_DASHBOARD_ID }}
                  tabKey={"invoice"}
                  showMenu={showMenu}
                  setShowMenu={setShowMenu}
                  currentInvoiceCount={currentInvoiceCount}
                  updateInvoiceCount={updateInvoiceCount}
                  getAllFilters={getAllFilters}
                  setSelectedAccountGroup={setSelectedAccountGroup}
                  accountGroupOptions={accountGroupOptions}
                  selectedAccountGroup={selectedAccountGroup}
                  accountGroupField={accountGroupField}
                  quickFilterOptions={quickFilterOptions}
                  setSelectedQuickFilter={setSelectedQuickFilter}
                  selectedQuickFilter={selectedQuickFilter}
                  description={{description: <div dangerouslySetInnerHTML={{__html:comment2}} />}}
                />
              </Tab>
              <Tab eventKey="auto-sub" title="Auto-Sub Report">
                <Template1
                  currentNavTab={currentNavTab}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  filterOptions={filterOptions}
                  dateFilterOptions={dateFilterOptions}
                  fieldOptions={productMovementFields}
                  isFetchingLookmlFields={isFetchingLookmlFields}
                  setSelectedDateFilter={setSelectedDateFilter}
                  selectedDateFilter={selectedDateFilter}
                  setSelectedDateRange={setSelectedDateRange}
                  selectedDateRange={selectedDateRange}
                  dateRange={dateRange}
                  config={{ tabbedVis1: PRODUCT_MOVEMENT_VIS_DASHBOARD_ID }}
                  tabKey={"auto-sub"}
                  showMenu={showMenu}
                  setShowMenu={setShowMenu}
                  currentInvoiceCount={currentInvoiceCount}
                  updateInvoiceCount={updateInvoiceCount}
                  getAllFilters={getAllFilters}
                  setSelectedAccountGroup={setSelectedAccountGroup}
                  accountGroupOptions={accountGroupOptions}
                  selectedAccountGroup={selectedAccountGroup}
                  accountGroupField={accountGroupField}
                  quickFilterOptions={quickFilterOptions}
                  setSelectedQuickFilter={setSelectedQuickFilter}
                  selectedQuickFilter={selectedQuickFilter}
                  description={{description: <div dangerouslySetInnerHTML={{__html:comment3}} />}}
                />
              </Tab>
              <Tab eventKey="id" title="Inflation/Deflation Report">
                <InflationDeflation
                  currentNavTab={currentNavTab}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  filterOptions={filterOptions}
                  dateFilterOptions={dateFilterOptions}
                  fieldOptions={productMovementFields}
                  isFetchingLookmlFields={isFetchingLookmlFields}
                  setSelectedDateFilter={setSelectedDateFilter}
                  selectedDateFilter={selectedDateFilter}
                  setSelectedDateRange={setSelectedDateRange}
                  selectedDateRange={selectedDateRange}
                  dateRange={dateRange}
                  config={{
                    tabbedVis1: PRODUCT_MOVEMENT_VIS_DASHBOARD_ID,
                    vis1: PRODUCT_MOVEMENT_VIS_DASHBOARD_ID,
                  }}
                  tabKey={"id"}
                  showMenu={showMenu}
                  setShowMenu={setShowMenu}
                  currentInvoiceCount={currentInvoiceCount}
                  updateInvoiceCount={updateInvoiceCount}
                  getAllFilters={getAllFilters}
                  setSelectedAccountGroup={setSelectedAccountGroup}
                  accountGroupOptions={accountGroupOptions}
                  selectedAccountGroup={selectedAccountGroup}
                  accountGroupField={accountGroupField}
                  description={{description: <div dangerouslySetInnerHTML={{__html:comment4}} />}}
                />
              </Tab>
              <Tab eventKey="product_movement" title="Product Movement Report" mountOnEnter={true} unMountOnExit={false}>
                <Template2
                  currentNavTab={currentNavTab}
                  filters={filters}
                  fields={fields.find(({tab}) => tab === "Product Movement Report")}
                  properties={properties}
                  updateAppProperties={updateAppProperties}
                  isFetchingLookmlFields={isFetchingLookmlFields}
                  config={{ tabbedVis1: PRODUCT_MOVEMENT_VIS_DASHBOARD_ID }}
                  tabKey={"product_movement"}
                  showMenu={showMenu}
                  setShowMenu={setShowMenu}
                  description={{description: <div dangerouslySetInnerHTML={{__html:comment1}} />}}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  initialLoad={initialLoad}
                  setInitialLoad={setInitialLoad}
                />
              </Tab>
              <Tab eventKey="invoice_report" title="Invoice Report" mountOnEnter={true} unMountOnExit={false}>
                <Template2
                  currentNavTab={currentNavTab}
                  filters={filters}
                  fields={fields.find(({tab}) => tab === "Product Movement Report")}
                  properties={properties}
                  updateAppProperties={updateAppProperties}
                  isFetchingLookmlFields={isFetchingLookmlFields}
                  config={{ tabbedVis1: PRODUCT_MOVEMENT_VIS_DASHBOARD_ID }}
                  tabKey={"invoice_report"}
                  showMenu={showMenu}
                  setShowMenu={setShowMenu}
                  description={{description: <div dangerouslySetInnerHTML={{__html:comment2}} />}}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                />
              </Tab>
              <Tab eventKey="auto_sub" title="Auto Sub Report" mountOnEnter={true} unMountOnExit={false}>
                <Template2
                  currentNavTab={currentNavTab}
                  filters={filters}
                  fields={fields.find(({tab}) => tab === "Product Movement Report")}
                  properties={properties}
                  updateAppProperties={updateAppProperties}
                  isFetchingLookmlFields={isFetchingLookmlFields}
                  config={{ tabbedVis1: PRODUCT_MOVEMENT_VIS_DASHBOARD_ID }}
                  tabKey={"auto_sub"}
                  showMenu={showMenu}
                  setShowMenu={setShowMenu}
                  description={{description: <div dangerouslySetInnerHTML={{__html:comment3}} />}}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                />
              </Tab>
              <Tab eventKey="id" title="Inflation/Deflation Report" mountOnEnter={true} unMountOnExit={false}>
                <Template3
                  currentNavTab={currentNavTab}
                  filters={filters}
                  fields={fields.find(({tab}) => tab === "Product Movement Report")}
                  properties={properties}
                  updateAppProperties={updateAppProperties}
                  isFetchingLookmlFields={isFetchingLookmlFields}
                  config={{
                    tabbedVis1: PRODUCT_MOVEMENT_VIS_DASHBOARD_ID,
                    vis1: PRODUCT_MOVEMENT_VIS_DASHBOARD_ID
                   }}
                  tabKey={"id"}
                  showMenu={showMenu}
                  setShowMenu={setShowMenu}
                  description={{description: <div dangerouslySetInnerHTML={{__html:comment3}} />}}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                />
              </Tab>
            </Tabs> */}
          </div>
        </div>
      </Container>
      <ToTopButton />
      <SideForm />
      <Footer />
    </>
  );
};
