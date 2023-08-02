import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Spinner,
  Tooltip,
} from "react-bootstrap";
import { LOOKER_MODEL, LOOKER_EXPLORE } from "../../utils/constants";
import { ExtensionContext } from "@looker/extension-sdk-react";
import InnerTableTabs from "../../components/InnerTableTabs";
import Fields from "../Template1/helpers/Fields";
import Filters from "../Template1/helpers/Filters";
import Rx from "./helpers/Rx";
import QuickFilter from "./helpers/QuickFilter";
import AccountGroups from "../Template1/helpers/AccountGroups";
import { DateFilterGroup } from "../Template1/helpers/DateFilterGroup";
import { CurrentSelection } from "../Template1/helpers/CurrentSelection";
import CurrentAccountGroup  from "../Template1/helpers/CurrentAccountGroup";
import { DateRangeSelector } from "../Template1/helpers/DateRangeSelector";
import EmbedTable from "../../components/EmbedTable";
const InflationDeflation = ({
  currentNavTab,
  selectedFilters,
  setSelectedFilters,
  filterOptions,
  dateFilterOptions,
  fieldOptions,
  isFetchingLookmlFields,
  selectedDateFilter,
  setSelectedDateFilter,
  selectedDateRange,
  setSelectedDateRange,
  dateRange,
  tabKey,
  config,
  showMenu,
  setShowMenu,
  currentInvoiceCount,
  updateInvoiceCount,
  getAllFilters,
  quickFilterOptions,
  setSelectedAccountGroup,
  accountGroupOptions,
  selectedAccountGroup,
  accountGroupField,
  keyword,
  setKeyword,
  handleChangeKeyword,
  description
}) => {
  const { core40SDK: sdk } = useContext(ExtensionContext);
  const wrapperRef = useRef(null);
  const [show3, setShow3] = useState();
  const [selectedFields, setSelectedFields] = useState([]);
  const defaultChecked = true;
  const [isDefaultProduct, setIsDefaultProduct] = useState(defaultChecked);
  const [updateButtonClicked, setUpdateButtonClicked] = useState(false);
  const [tabList, setTabList] = useState([]);
  const [currentInnerTab, setCurrentInnerTab] = useState(0);
  const [isFilterChanged, setIsFilterChanged] = useState(false);
  const [vis1, setVis1] = useState("")
  function handleClearAll() {}

  useEffect(() => {
    if (currentNavTab == tabKey) {
      setIsFilterChanged(true);
      //handleTabVisUpdate();
      //slideIt(show3);
    }
  }, [currentNavTab]);

  // Fetch default selected fields and filters + query for embedded visualization from Looker dashboard on load
  const [isFetchingDefaultDashboard, setIsFetchingDefaultDashboard] =
    useState(true);
  useEffect(() => {
    async function fetchDefaultFieldsAndFilters() {
      const { dashboard_elements } = await sdk.ok(
        sdk.dashboard(config.tabbedVis1, "dashboard_elements")
      );

      dashboard_elements?.map((t) => {
        let { client_id } = t["result_maker"]["query"];
        setTabList((prev) => [
          ...prev,
          {
            title: t["title"],
            query: client_id,
            default_fields: [...t.result_maker.query["fields"]],
            selected_fields: [...t.result_maker.query["fields"]],
          },
        ]);
      });


      const { client_id, fields, filters } =
        dashboard_elements[0].result_maker.query;

      setSelectedFields(fields);
      if (filters) setSelectedFilters(filters);


      getSingleVis(config.vis1);
      //setProductMovementVisQid(client_id);
      setIsFetchingDefaultDashboard(false);
    }

    try {
      fetchDefaultFieldsAndFilters();
    } catch (e) {
      console.error("Error fetching default dashboard", e);
    }
  }, []);

  const getSingleVis = async (vis) => {
    let { dashboard_elements } = await sdk.ok(sdk.dashboard(vis,'dashboard_elements'));
    if (dashboard_elements.length > 0) {
      let singleVis = dashboard_elements[0]['result_maker']['query']['client_id'];
      setVis1(singleVis)
    }
  }

  // Fetch the suggestions for each filter field, after fetching all filter fields
  const [isFetchingFilterSuggestions, setIsFetchingFilterSuggestions] =
    useState(true);
  const [filterSuggestions, setFilterSuggestions] = useState({});
  useEffect(() => {
    if (isFetchingLookmlFields || !filterOptions?.length) {
      return;
    }

    function fetchFilterSuggestions(filterFieldName) {
      return sdk.ok(
        sdk.run_inline_query({
          result_format: "json",
          body: {
            model: LOOKER_MODEL,
            view: LOOKER_EXPLORE,
            fields: [filterFieldName],
          },
        })
      );
    }

    async function fetchAllFilterSuggestions() {
      const filterSuggestionPromises = filterOptions.map((filterField) => {
        return fetchFilterSuggestions(filterField.name);
      });
      const filterSuggestionResponses = await Promise.allSettled(
        filterSuggestionPromises
      );

      const filterSuggestionsMap = {};
      filterSuggestionResponses.forEach((response) => {
        // Error handling
        if (response.status !== "fulfilled") {
          // handle rejected failures
          return;
        }
        if (response.value[0].looker_error) {
          console.error(
            "Error fetching suggestions for a Looker filter field ",
            response.value[0].looker_error
          );
          return;
        }

        // Add filter suggestions to map if no errors
        const fieldName = Object.keys(response.value[0])[0];
        const suggestions = response.value.map((row) => row[fieldName]);
        filterSuggestionsMap[fieldName] = suggestions;
      });

      setFilterSuggestions(filterSuggestionsMap);
      setIsFetchingFilterSuggestions(false);
    }

    fetchAllFilterSuggestions();
  }, [filterOptions, isFetchingLookmlFields]);

  // Page loading state
  const [isPageLoading, setIsPageLoading] = useState(true);
  useEffect(() => {
    if (!isFetchingDefaultDashboard && !isFetchingLookmlFields) {
      setIsPageLoading(false);
    }
  }, [isFetchingDefaultDashboard, isFetchingLookmlFields]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      These are the filters you use to query data. Select the accordions
      individually below to choose the different filter options inside. Once you
      are done you can choose the "Submit Values" button to update the data.
    </Tooltip>
  );

  const updateVis1Query = async (filters) => {
    const { vis_config, fields } = await sdk.ok(
      sdk.query_for_slug(vis1)
    );

    const { client_id } = await sdk.ok(
      sdk.create_query({
        model: LOOKER_MODEL,
        view: LOOKER_EXPLORE,
        fields: fields,
        filters,
        vis_config,
      })
    );
    setVis1(client_id)
  }

  // Handle run button click
  async function handleTabVisUpdate() {
    let tabs = [...tabList];
    let currentTab = tabs[currentInnerTab];
    const prevVisQid = currentTab["query"];

    // remove filters with a value of "N/A"
    let filters = {};
    // for (const filter in selectedFilters) {
    //   if (selectedFilters[filter] && selectedFilters[filter] !== "N/A") {
    //     filters[filter] = selectedFilters[filter];
    //   }
    // }

    // if (selectedDateFilter != "") {
    //   filters[selectedDateFilter] = "Yes";
    // } else {
    //   if (selectedDateRange) {
    //     filters[dateRange["name"]] = selectedDateRange;
    //   }
    // }
    filters = await getAllFilters();

    if (isFilterChanged) {
      updateInnerTabFilters(filters);
      updateVis1Query(filters)
    }

    await updateInvoiceCount()

    const { vis_config } = await sdk.ok(sdk.query_for_slug(prevVisQid));

    const { client_id } = await sdk.ok(
      sdk.create_query({
        model: LOOKER_MODEL,
        view: LOOKER_EXPLORE,
        fields: currentTab["selected_fields"],
        filters,
        vis_config,
      })
    );

    tabs[currentInnerTab]["query"] = client_id;
    setTabList(tabs);
  }

  const updateInnerTabFilters = async (filters) => {
    let fullTabList = [...tabList];
    fullTabList.map(async (t, i) => {
      if (i != currentInnerTab) {
        const { vis_config, fields } = await sdk.ok(
          sdk.query_for_slug(t["query"])
        );

        const { client_id } = await sdk.ok(
          sdk.create_query({
            model: LOOKER_MODEL,
            view: LOOKER_EXPLORE,
            fields: fields,
            filters,
            vis_config,
          })
        );

        fullTabList[i]["query"] = client_id;
        setTabList(fullTabList);
      }
    });
    setIsFilterChanged(false);
  };

  async function handleClearAll() {

    // setIsDefaultProduct(false);
    setUpdateButtonClicked(true);
    setSelectedFields([]);
    let tabs = [...tabList];
    let currentTab = tabs[currentInnerTab];
    currentTab["selected_fields"] = [];
    setTabList(tabs);
    let filters = {...selectedFilters};
    for(let name in filters) {
      filters[name] = 'N/A';
    }
    setSelectedFilters(filters);
    // setSelectedFilters((prevFilters) => {
      //   const newFilters = { ...prevFilters };
      //   newFilters[filterName] = 'N/A';
      //   return newFilters;
      // });
      setIsFilterChanged(true);
    }

  async function handleRestoreDefault() {
    setIsDefaultProduct(defaultChecked);
    setUpdateButtonClicked(true);
    let tabs = [...tabList];
    let currentTab = tabs[currentInnerTab];
    currentTab["selected_fields"] = currentTab["default_fields"];
    setTabList(tabs);
  }

  useEffect((e) => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
    document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      //setShow3(false);
    }
  };

  return (
    <Container fluid>
      {isPageLoading ? (
        <Spinner />
      ) : (
        <>
       <div id="slideOut3" className={showMenu ? "" : "show3"} ref={wrapperRef}>
        <div className="slideOutTab3">
          <div id="one3" className="openTab bottomShadow" role="button" tabindex="0"
             onClick={() => {setShowMenu(false);}}>
            <p className="black m-0 mb-2"><i class="far fa-bars"></i></p>
            <p className="m-0"><span className="noMobile">Filter Options</span></p>
              </div>
            </div>

            <div className="modal-content">
              <div className="modal-header">
                <OverlayTrigger
                  placement="right"
                  overlay={renderTooltip}
                  className="tooltipHover"
                >
                  <p className="pb-1">
                    Filter Options <i className="fal fa-info-circle red"></i>
                  </p>
                </OverlayTrigger>
                <div className="closeThisPlease" id="close1">
                <Button role="button" className="close" data-dismiss="modal" id="closeThisPlease1"
                   onClick={() => {setShowMenu(true);}}>
                  {/*onClick={() => setShow3(false)}>*/}
                  &#10005;
                  </Button>
                </div>
              </div>
              <div className="modal-actions">
                <div className="across">
                  <Button onClick={handleClearAll} className="btn-clear">
                    Clear All
                  </Button>
                  <Button
                    onClick={handleTabVisUpdate}
                    className="btn">Submit
                  </Button>
                </div>
              </div>
              <div className="modal-body">
                <Accordion defaultActiveKey={0} className="mt-3 mb-3">
                  <Row>
                    <Col xs={12} md={12}>
                      <Row>
                        {/* Account Groups */}
                        {accountGroupOptions?.length > 0?
                          <Col xs={12} md={12}>
                            <Accordion.Item eventKey="1">
                              <Accordion.Header>Account Groups</Accordion.Header>
                              <Accordion.Body>
                                <AccountGroups
                                  fieldOptions={accountGroupOptions}
                                  selectedAccountGroup={selectedAccountGroup}
                                  setSelectedAccountGroup={setSelectedAccountGroup}
                                />
                              </Accordion.Body>
                            </Accordion.Item>
                          </Col>
                        :''
                        }

                        {/* Quick Filters */}
                        {quickFilterOptions?.length > 0?
                          <Col xs={12} md={12}>
                            <Accordion.Item eventKey="3">
                              <Accordion.Header>Quick Filters</Accordion.Header>
                              <Accordion.Body>
                                <QuickFilter
                                quickFilterOptions={quickFilterOptions}
                                setTabList={setTabList}
                                tabList={tabList}
                                currentInnerTab={currentInnerTab}
                                // selectedFields={selectedFields}
                                // setSelectedFields={setSelectedFields}
                                // isDefault={isDefaultProduct}
                                // setIsDefault={setIsDefaultProduct}
                                updateBtn={updateButtonClicked}
                                setUpdateBtn={setUpdateButtonClicked}

                                />
                              </Accordion.Body>
                            </Accordion.Item>
                          </Col>
                        :''
                        }


                        {/* Filters */}
                        {filterOptions?.length > 0?
                          <Col xs={12} md={12}>
                            <Accordion.Item eventKey="5">
                              <Accordion.Header>Filters</Accordion.Header>
                              <Accordion.Body>
                                <Filters
                                  isLoading={isFetchingFilterSuggestions}
                                  filterOptions={filterOptions}
                                  filterSuggestions={filterSuggestions}
                                  selectedFilters={selectedFilters}
                                  setSelectedFilters={setSelectedFilters}
                                  isDefault={isDefaultProduct}
                                  setIsDefault={setIsDefaultProduct}
                                  updateBtn={updateButtonClicked}
                                  setUpdateBtn={setUpdateButtonClicked}
                                  setIsFilterChanged={setIsFilterChanged}
                                />
                              </Accordion.Body>
                            </Accordion.Item>
                          </Col>
                        :''
                        }


                        {/* Fields */}
                        {fieldOptions?.length > 0?
                        <Col xs={12} md={12}>
                          <Accordion.Item eventKey="6">
                            <Accordion.Header>Fields</Accordion.Header>
                            <Accordion.Body>
                              <Fields
                                fieldOptions={fieldOptions}
                                setTabList={setTabList}
                                tabList={tabList}
                                currentInnerTab={currentInnerTab}
                                // selectedFields={selectedFields}
                                // setSelectedFields={setSelectedFields}
                                // isDefault={isDefaultProduct}
                                // setIsDefault={setIsDefaultProduct}
                                updateBtn={updateButtonClicked}
                                setUpdateBtn={setUpdateButtonClicked}
                              />
                            </Accordion.Body>
                          </Accordion.Item>
                        </Col>
                        :''
                        }


                        {/* Bookmarks */}
                        <Col xs={12} md={12}>
                          <Accordion.Item eventKey="4">
                            <Accordion.Header>Bookmarks</Accordion.Header>
                            <Accordion.Body></Accordion.Body>
                          </Accordion.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Accordion>

                <div className="across">




                    <input placeholder="Top % Products" type="search" class="form-control" />
                    <input placeholder="Search Filter" type="search" class="form-control" />

               </div>

              <div className="lineAcross"></div>

              <div className="across two">
                  <Button onClick={handleRestoreDefault} className="btn-clear">
                    Restore Default <i className="fal fa-undo"></i>
                  </Button>
                  <Button className="btn-clear">
                    Print <i className="fal fa-print"></i>
                  </Button>

                </div>
              </div>
            </div>
          </div>

          <Row className="fullW">


          <Col md={12} lg={12}>
            {/* Date Range Selector */}
            {dateFilterOptions.length>0?
              <DateRangeSelector
              selectedDateRange={selectedDateRange}
              setSelectedDateRange={setSelectedDateRange}
              setSelectedDateFilter={setSelectedDateFilter}
              dateFilterOptions={dateFilterOptions}
              selectedDateFilter={selectedDateFilter}
              handleTabVisUpdate={handleTabVisUpdate}
              currentInvoiceCount={currentInvoiceCount}
              description={description}
              />
              :''
            }

            {/*<DateFilterGroup
              dateFilterOptions={dateFilterOptions}
              setSelectedDateFilter={setSelectedDateFilter}
              selectedDateFilter={selectedDateFilter}
              />*/}
            </Col>

            </Row>

            <Row className="fullW negativeTop d-flex align-items-center">
              <Col md={12} lg={2}>

            {currentInvoiceCount != ""?
            <p>
              <b>Total Invoice:</b> <span className="highlight large">{currentInvoiceCount}</span>
            </p>
            :''
          }

            </Col>
            <Col md={12} lg={3}>
              <div className="position-relative columnStart">
              <label>Search Filter</label>
                <input placeholder="" type="search" class="form-control" />
                <i class="far fa-search absoluteSearch"></i>
              </div>
            </Col>

            <Col md={12} lg={2}>

            <div className="position-relative columnStart">
            <label>Top % Products</label>

              <input  type="search" class="form-control" />

            </div>
            </Col>
            </Row>

            <Row className="fullW">

            <Col md={12} lg={12}>



              <Row className="mt-5 d-flex align-items-center">



              <Col md={12} lg={12}>


              </Col>
            </Row>



          </Col>


          </Row>


          <Row className="fullW mt-4">

            <Col xs={12} md={12}>

              <div className="d-flex justify-content-between align-items-baseline">

              <div className="d-flex justify-content-start align-items-center flex-wrap">
                <p class="mr-3"><i class="fal fa-filter mr-1"></i>Filters</p>
                <CurrentSelection
                selectedDateFilter={selectedDateFilter}
                selectedFilters={selectedFilters}
                selectedFields={selectedFields}
                fieldOptions={fieldOptions}
                setSelectedFields={setSelectedFields}
                filterOptions={filterOptions}
                setSelectedFilters={setSelectedFilters}
                dateFilterOptions={dateFilterOptions}
                selectedDateRange={selectedDateRange}
                quickFilterOptions={quickFilterOptions}
                />

                <CurrentAccountGroup
                selectedDateFilter={selectedDateFilter}
                selectedFilters={selectedFilters}
                selectedFields={selectedFields}
                fieldOptions={fieldOptions}
                setSelectedFields={setSelectedFields}
                filterOptions={filterOptions}
                setSelectedFilters={setSelectedFilters}
                dateFilterOptions={dateFilterOptions}
                selectedDateRange={selectedDateRange}
                quickFilterOptions={quickFilterOptions}
                selectedAccountGroup={selectedAccountGroup}
                setSelectedAccountGroup={setSelectedAccountGroup}
                />

              </div>


                <a onClick={handleRestoreDefault}>
                  <p class="red bold  mt-4"><u>Restore Default/Saved Filter</u></p>
                </a>

                </div>
              </Col>
            </Row>

          <Row className="mt-3">
                <Col lg={4} md={12} className="vis1-container padding-0 innerTab smallerHeight embed-responsive embed-responsive-16by9">

                  <EmbedTable queryId={vis1} />
                </Col>
          </Row>      


          <Row className="mb-3">

            <Col md={12} className="embed-responsive embed-responsive-16by9">
              {tabList.length > 0?
                <InnerTableTabs
                tabs={tabList}
                setSelectedFields={setSelectedFields}
                currentInnerTab={currentInnerTab}
                setCurrentInnerTab={setCurrentInnerTab}
                />
                :''
              }

            </Col>
          </Row>

        </>
      )}
    </Container>
  );
};

export default InflationDeflation;
