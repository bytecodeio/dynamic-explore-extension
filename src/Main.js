import React, { useState, useContext, useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import SideForm from "./components/nav/Form.js";
import PurchasesReview from "./pageTemplates/PurchasesReview/PurchasesReview";
import InflationDeflation from "./pageTemplates/InflationDeflation/InflationDeflation";
import ToTopButton from "./components/ToTopButton.js";
import NavbarMain from "./components/NavbarMain";
import Footer from "./components/Footer.js";
import { ExtensionContext } from "@looker/extension-sdk-react";
import moment from "moment";
import Template1 from "./pageTemplates/Template1/Template1";
import TopNav from './components/nav/TopNav.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import {
  LOOKER_MODEL,
  LOOKER_EXPLORE,
  LOOKML_FIELD_TAGS,
  PRODUCT_MOVEMENT_VIS_DASHBOARD_ID,
} from "./utils/constants";

import { sortDateFilterList } from "./utils/globalFunctions";

export const Main = () => {
  const { core40SDK: sdk } = useContext(ExtensionContext);

  const [currentNavTab, setCurrentNavTab] = useState("dashboard");

  //Create states for global variables
  const [isFetchingLookmlFields, setIsFetchingLookmlFields] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedDateFilter, setSelectedDateFilter] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState();
  const [currentInvoiceCount, setCurrentInvoiceCount] = useState("");
  const [selectedAccountGroup, setSelectedAccountGroup] = useState([]);

  const [productMovementFields, setProductMovementFields] = useState([]);
  const [totalInvoiceField, setTotalInvoiceField] = useState()
  const [filterOptions, setFilterOptions] = useState([]);
  const [dateFilterOptions, setDateFilterOptions] = useState([]);
  const [quickFilter, setQuickFilter] = useState([]);
  const [accountGroupOptions, setAccountGroupOptions] = useState([])
  const [accountGroupField, setAccountGroupField] = useState();

  const [dateRange, setDateRange] = useState("");
  const [showMenu, setShowMenu] = useState();

  const slideIt = (show) => {
    setShowMenu(show)
  }

  // Initialize the states
  useEffect(() => {
    function groupFieldsByTags(fields) {
      const fieldsByTag = {};
      fields.forEach((field) => {
        // console.log('fields plural', fields);
        // console.log('field alone', field);
        // console.log(field.tags)
        if (field.tags != "") {
          field.tags.toString().split(",").forEach((tag) => {
            tag = tag.trim()
            // console.log('tag alone', tag);
            // console.log(`fieldsByTag[${tag}] `, fieldsByTag[tag]);
            // console.log('fieldsByTag ', fieldsByTag);

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



    const fetchLookmlFields = async () => {
      const {
        fields: { dimensions, filters, measures },
      } = await sdk.ok(
        sdk.lookml_model_explore(LOOKER_MODEL, LOOKER_EXPLORE, "fields")
      );

      const lookmlFields = [...dimensions, ...filters, ...measures];
      // console.log('lookmlFields ', lookmlFields);
      const fieldsByTag = groupFieldsByTags(lookmlFields);

      // console.log("fields", fieldsByTag)

      const _filterOptions = fieldsByTag[LOOKML_FIELD_TAGS.filter];
      const _dateFilterOptions = fieldsByTag[LOOKML_FIELD_TAGS.date_filter];

      const _productMovementfieldOptions = fieldsByTag[LOOKML_FIELD_TAGS.productMovementField];
      const _quickFilterOptions = fieldsByTag[LOOKML_FIELD_TAGS.quick_filter];

      let _accountGroupField = undefined
      try {
        _accountGroupField = fieldsByTag[LOOKML_FIELD_TAGS.accountGroups][0];
      } catch (err) {
        console.error(`No account group field using tag ${LOOKML_FIELD_TAGS.accountGroups}`)
      }



      // console.log("fieldsByTag", fieldsByTag)
      //
      // console.log("this is field", LOOKML_FIELD_TAGS.productMovementField)
      // console.log("this is quick", LOOKML_FIELD_TAGS.quick_filter)
      // console.log("this is LOOKML_FIELD_TAGS", LOOKML_FIELD_TAGS)
      //
      // console.log('_quickFilterOptions', _quickFilterOptions)

      const _dateRange = fieldsByTag[LOOKML_FIELD_TAGS.dateRange];
      let _totalInvoice = undefined
      try {
        _totalInvoice = fieldsByTag[LOOKML_FIELD_TAGS.totalInvoices][0]
      } catch (err) {
        console.error(`No total invoice field with the tag ${LOOKML_FIELD_TAGS.totalInvoices}`)
      }


      let defaultFilterSelections = []
      try {
        defaultFilterSelections = Object.fromEntries(
          _filterOptions.map((filter) => [filter.name, "N/A"])
          );
      } catch(error) {
        console.error(`No filter options found using tag ${LOOKML_FIELD_TAGS.filter}`)
      }


      const defaultDateFilterSelections = _dateFilterOptions?.find((filter) => {
        if (filter["suggestions"]) {
          return filter["suggestions"].find((s) => {
            return s.toUpperCase() === "YES";
          });
        }
      });

      if (defaultDateFilterSelections != undefined) {
        setSelectedDateFilter(defaultDateFilterSelections["name"]);
      }

      setSelectedDateRange(getDefaultDateRange());

      if (_totalInvoice != undefined) {
        setTotalInvoiceField(_totalInvoice)
        let values = await getValues(_totalInvoice)
        setCurrentInvoiceCount(values[0][_totalInvoice['name']])
      }

      if (_filterOptions) {
        setFilterOptions(_filterOptions);
      } else {
        console.error(`No filter options found using tag ${LOOKML_FIELD_TAGS.filter}`)
      }


      if (_productMovementfieldOptions) {
        setProductMovementFields(_productMovementfieldOptions);
      } else {
        console.error(`No fields found using tag ${LOOKML_FIELD_TAGS.productMovementField}`)
      }


      if (_dateFilterOptions) {
        setDateFilterOptions(sortDateFilterList(_dateFilterOptions));
      } else {
        console.error(`No date filters found using tag ${LOOKML_FIELD_TAGS.date_filter}`)
      }

      setQuickFilter(_quickFilterOptions);

      if (_accountGroupField != undefined) {
        setAccountGroupField(_accountGroupField);
        let values = await getDefaultValues(_accountGroupField)
        setAccountGroupOptions(values.splice(0, 50).map((v,i) => {return v[_accountGroupField['name']]}));
      }


      setSelectedFilters(defaultFilterSelections);

      try {
        setDateRange(_dateRange[0]);
      } catch(error) {
        console.error(`No date range found using tag ${LOOKML_FIELD_TAGS.dateRange}`)
      }

      setIsFetchingLookmlFields(false);
    };

    try {
      fetchLookmlFields();
    } catch (e) {
      console.error("Error fetching Looker filters and fields", e);
    }
  }, []);

  useEffect(() => { }, [selectedDateRange]);

  const getDefaultDateRange = () => {
    let prevMonth = moment().subtract(1, "month");
    let startOfMonth = prevMonth
      .startOf("month")
      .format("YYYY-MM-DD")
      .toString();
    let endOfMonth = prevMonth.endOf("month").format("YYYY-MM-DD").toString();
    return `${startOfMonth} to ${endOfMonth}`;
  };

  const getValues = (field) => {
    return sdk.ok(
      sdk.run_inline_query({
        result_format: "json",
        body: {
          model: LOOKER_MODEL,
          view: field['view'],
          fields: [field['name']],
          filters: getAllFilters()
        },
      })
    );
  }

  const getDefaultValues = (field) => {
    return sdk.ok(
      sdk.run_inline_query({
        result_format: "json",
        body: {
          model: LOOKER_MODEL,
          view: field['view'],
          fields: [field['name']],
          filters: {}
        },
      })
    );
  }

  const getAllFilters = () => {
    let filters = {};
    for (const filter in selectedFilters) {
      if (selectedFilters[filter] && selectedFilters[filter] !== "N/A") {
        filters[filter] = selectedFilters[filter];
      }
    }

    if (selectedDateFilter != "") {
      filters[selectedDateFilter] = "Yes";
    } else {
      if (selectedDateRange) {
        filters[dateRange["name"]] = selectedDateRange;
      }
    }

    if (selectedAccountGroup.length > 0) {
      filters[accountGroupField['name']] = selectedAccountGroup.join(",")
    }
    return filters
  }

  const updateInvoiceCount = async () => {
    let newCount = await getValues(totalInvoiceField);
    setCurrentInvoiceCount(newCount[0][totalInvoiceField['name']])
  }

  return (
    <>
      <NavbarMain />
      <Container fluid className="mt-50 padding-0">
        <TopNav />
        <div className={showMenu ? "largePadding" : "slideOver largePadding"}>
          <div id="nav2">
            <Tabs
              defaultActiveKey={currentNavTab}
              onSelect={(k) => setCurrentNavTab(k)}
              className="mb-0"
              fill
            >
              <Tab eventKey="dashboard" title="Purchases Review">
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
                  currentNavTab={currentNavTab}
                  showMenu={showMenu}
                  setShowMenu={setShowMenu}
                  quickFilterOptions={quickFilter}


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
                  quickFilterOptions={quickFilter}
                  isFetchingLookmlFields={isFetchingLookmlFields}
                  setSelectedDateFilter={setSelectedDateFilter}
                  selectedDateFilter={selectedDateFilter}
                  setSelectedDateRange={setSelectedDateRange}
                  selectedDateRange={selectedDateRange}
                  dateRange={dateRange}
                  config={{tabbedVis1: PRODUCT_MOVEMENT_VIS_DASHBOARD_ID}}
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
                  config={{tabbedVis1: PRODUCT_MOVEMENT_VIS_DASHBOARD_ID}}
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
                  config={{tabbedVis1: PRODUCT_MOVEMENT_VIS_DASHBOARD_ID}}
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
                    tabbedVis1:PRODUCT_MOVEMENT_VIS_DASHBOARD_ID,
                    vis1:PRODUCT_MOVEMENT_VIS_DASHBOARD_ID
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
                />
              </Tab>
            </Tabs>
          </div>
        </div>
      </Container>
      <ToTopButton />
      <SideForm />
      <Footer />
    </>
  );
};
