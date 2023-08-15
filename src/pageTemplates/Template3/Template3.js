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
import Fields from "./helpers/Fields";
import Filters from "./helpers/Filters";
import Rx from "./helpers/Rx";
import QuickFilter from "./helpers/QuickFilter";
import AccountGroups from "./helpers/AccountGroups";
import { DateFilterGroup } from "./helpers/DateFilterGroup";
import { CurrentSelection } from "./helpers/CurrentSelection";
import CurrentAccountGroup  from "./helpers/CurrentAccountGroup";
import { DateRangeSelector } from "./helpers/DateRangeSelector";
import EmbedTable from "../../components/EmbedTable";
const Template3 = ({
  currentNavTab,
  filters,
  fields,
  properties,
  updateAppProperties,
  isFetchingLookmlFields,
  tabKey,
  config,
  showMenu,
  setShowMenu,
  keyword,
  setKeyword,
  handleChangeKeyword,
  description,
  selectedFilters,
  setSelectedFilters
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
  const [visList, setVisList] = useState([])
  function handleClearAll() {}

  useEffect(() => {
    if (currentNavTab == tabKey) {
      setIsFilterChanged(true);
      handleTabVisUpdate();
      //slideIt(show3);
    }
  }, [currentNavTab]);

  // Fetch default selected fields and filters + query for embedded visualization from Looker dashboard on load
  const [isFetchingDefaultDashboard, setIsFetchingDefaultDashboard] =
  useState(true);
  useEffect(() => {

    async function fetchDefaultFieldsAndFilters() {
      let _visList = []
      let index = 0
      for await(let visConfig of Object.keys(config)) {
        const {dashboard_elements, dashboard_filters} = await sdk.ok(
          sdk.dashboard(config[visConfig], 'dashboard_elements, dashboard_filters')
        )
        dashboard_elements?.map((t) => {
          let vis = {}
          let {client_id} = t['result_maker']['query'];
          vis =  {
            visId: visConfig,
            title: t['title'],
            query: client_id,
            default_fields: [...t.result_maker.query.fields],
            selected_fields: [...t.result_maker.query.fields],
            index: index++
          }
          _visList.push(vis)
        })
      }
      console.log("visList", _visList)
      setVisList(_visList)

      setSelectedFields(fields);
      setIsFetchingDefaultDashboard(false);
    }

    try {
      fetchDefaultFieldsAndFilters();
    } catch (e) {
      console.error("Error fetching default dashboard", e);
    }
  }, []);


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

  const formatFilters = () => {
    let filter = {}
    Object.keys(selectedFilters).map(key => {
      if (Object.keys(selectedFilters[key]).length > 0) {
        if (!(key == "date range" && Object.keys(selectedFilters['date filter']).length > 0)) {
          filter = {...filter,...selectedFilters[key]}
        }
      }
    })
    return filter
  }

  // Handle run button click
  const handleTabVisUpdate = async() => {
    let _visList = [...visList];
    let currentVis = _visList.find(({index}) => index === currentInnerTab)

    let _filters = {};
    _filters = await formatFilters();
    updateAppProperties(_filters)

    let newVisList = []
    for await (let vis of _visList) {
      const { vis_config, fields } = await sdk.ok(sdk.query_for_slug(vis['query']));

      let _fields = []
      if (vis['index'] === currentInnerTab) {
        _fields = currentVis['selected_fields']
      } else {
        _fields = fields
      }
      const { client_id } = await sdk.ok(
        sdk.create_query({
          model: LOOKER_MODEL,
          view: LOOKER_EXPLORE,
          fields: _fields,
          filters: _filters,
          vis_config,
        })
      );
      vis['query'] = client_id
      newVisList.push(vis)
    }
    setIsFilterChanged(false);
    setVisList(newVisList)
  }


            async function handleClearAll() {
              console.log('handleClearAll')
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


              // console.log('accountGroupOptions:', accountGroupOptions)


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
                    className="btn">Submit Filters
                  </Button>
                </div>
              </div>
              <div className="modal-body">
                <Accordion defaultActiveKey={0} className="mt-3 mb-3">
                  <Row>
                    <Col xs={12} md={12}>
                      <Row>


                        {/* Account Groups */}
                        {filters.find(f => f.type === "account group").options?.length < 0?
                          <Col xs={12} md={12}>
                            <Accordion.Item eventKey="1">
                              <Accordion.Header>Account Groups</Accordion.Header>
                              <Accordion.Body>
                                <div className="position-relative mb-2">
                                  <input value={keyword} onChange={handleChangeKeyword} placeholder="Search" type="search" class="form-control" />
                                  <i class="far fa-search absoluteSearch"></i>
                                </div>
                                <AccountGroups
                                  //fieldOptions={keyword !=="" ? accountGroupOptions.filter(option => option.indexOf(keyword)!== -1) : accountGroupOptions}
                                  fieldOptions={filters.find(f => f.type === "account group")}
                                />
                              </Accordion.Body>
                            </Accordion.Item>
                          </Col>
                          :''
                        }


                        {/* Fields */}
                        {fields.fields?.length > 0?
                          <Col xs={12} md={12}>
                            <Accordion.Item eventKey="6">
                              <Accordion.Header>Fields</Accordion.Header>
                              <Accordion.Body>
                                <Fields
                                fieldOptions={fields.fields}
                                setTabList={setVisList}
                                tabList={visList.filter(({visId}) => visId ==="tabbedVis1")}
                                currentInnerTab={currentInnerTab}
                                updateBtn={updateButtonClicked}
                                setUpdateBtn={setUpdateButtonClicked}
                                />
                              </Accordion.Body>
                            </Accordion.Item>
                          </Col>
                          :''
                        }

                        {/* Filters */}
                        {filters.find(({type}) =>  type === "filter").options?.length > 0?
                          <Col xs={12} md={12}>
                            <Accordion.Item eventKey="5">
                              <Accordion.Header>Filters</Accordion.Header>
                              <Accordion.Body>
                                <Filters
                                //isLoading={isFetchingFilterSuggestions}
                                filters={filters.find(({type}) =>  type === "filter")}
                                setSelectedFilters={setSelectedFilters}
                                selectedFilters={selectedFilters}
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


                        {/*Quick Filters */}
                        {
                          filters.find(({type}) =>  type === "quick filter").options?.length > 0?
                          <Col xs={12} md={12}>
                            <Accordion.Item eventKey="3">
                              <Accordion.Header>Quick Filters</Accordion.Header>
                              <Accordion.Body>
                                <QuickFilter
                                  quickFilters={filters.find(({type}) =>  type === "quick filter")}
                                  selectedFilters={selectedFilters}
                                  setSelectedFilters={setSelectedFilters}
                                  updateBtn={updateButtonClicked}
                                  setUpdateBtn={setUpdateButtonClicked}
                                  setIsFilterChanged={setIsFilterChanged}
                                />
                              </Accordion.Body>
                            </Accordion.Item>
                          </Col>
                          :
                          ''
                        }





                        {/* Bookmarks */}
                        <Col xs={12} md={12}>
                          <Accordion.Item eventKey="4">
                            <Accordion.Header>Saved Filters</Accordion.Header>
                            <Accordion.Body></Accordion.Body>
                          </Accordion.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Accordion>




              </div>
            </div>
          </div>

          <Row className="fullW">


          <Col md={12} lg={12}>
            {/* Date Range Selector */}
            {filters.find(({type}) => type  === "date filter").options?.length>0?
              <DateRangeSelector
                dateFilter={filters.find(({type}) => type  === "date filter")}
                dateRange={filters.find(({type}) => type === "date range")}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                handleTabVisUpdate={handleTabVisUpdate}
                currentInvoiceCount={properties.find(({type}) => type === "total invoices")}
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

            {properties.find(({type}) => type ==="total invoices")?
            <p>
              <b>{properties.find(({type}) => type ==="total invoices").text}</b> <span className="highlight large">{Object.values(properties.find(({type}) => type ==="total invoices").value)}</span>
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
            {visList.find(({visId}) => visId === "vis1")?
              <EmbedTable queryId={visList.find(({visId}) => visId === "vis1").query} />
            :''            
            }

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
                {/* <CurrentSelection
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

                selectedQuickFilter={selectedQuickFilter}
                setSelectedQuickFilter={setSelectedQuickFilter}
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
                /> */}

              </div>


                <a onClick={handleRestoreDefault}>
                  <p class="red bold small mt-4"><u>Restore Default/Saved Filter</u></p>
                </a>

                </div>
              </Col>
            </Row>


          <Row className="mt-3 mb-3">
            <Col md={12} className="embed-responsive embed-responsive-16by9">
              {visList.filter(({visId}) => visId ==="tabbedVis1").length > 0?
                <InnerTableTabs
                tabs={visList.filter(({visId}) => visId ==="tabbedVis1")}
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

      export default Template3;
