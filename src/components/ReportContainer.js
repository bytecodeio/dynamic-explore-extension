import React, {
    useState,
    useContext,
    useEffect,
    useRef,
} from "react";
import {
    Col,
    Container,
    Row,
    Spinner,
} from "react-bootstrap";
import * as $ from "jquery";
import { ExtensionContext } from "@looker/extension-sdk-react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import _ from "lodash";
import { ApplicationContext } from "../Main2";
import { TopRow } from "./LayoutComponents/TopRow/TopRow";
import { SelectionOptions } from "./LayoutComponents/SelectionOptions/SelectionOptions";
import { CurrentSelectionRow } from "./LayoutComponents/CurrentSelectionRow/CurrentSelectionRow";
import { OneTabVisualization } from "./VisualizationLayouts/OneTabVisualization";
import { DashboardVisualizations } from "./VisualizationLayouts/DashboardVisualizations";
import { FullLookMLDashboard } from "./VisualizationLayouts/FullLookMLDashboard";

//ReportContainer is the parent component of each tab that controls each tabs' states
export const ReportContainer = ({
    currentNavTab,
    fields,
    properties,
    tabKey,
    config,
    description,
    isActive,
    tabFilters,
    attributes,
    fieldGroups,
    layoutProps
}) => {
    const { core40SDK: sdk } = useContext(ExtensionContext);
    const wrapperRef = useRef(null);
    const [selectedFields, setSelectedFields] = useState([]);
    //AccountGroupsFieldOptions
    const defaultChecked = true;
    const [updateButtonClicked, setUpdateButtonClicked] = useState(false);
    const [currentInnerTab, setCurrentInnerTab] = useState(0);
    const [visList, setVisList] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [active, setActive] = useState(false);
    const [faClass, setFaClass] = useState(true);
    const [toggle, setToggle] = useState(true);
    
    const [selectedTabFilters,setSelectedTabFilters] = useState({})
    
    const [isFilterChanged,setIsFilterChanged] = useState(false)
    // Fetch default selected fields and filters + query for embedded visualization from Looker dashboard on load
    const [isFetchingDefaultDashboard, setIsFetchingDefaultDashboard] = useState(true);
  
    const params = useParams();
  
    const {filters,
      parameters,
      updateAppProperties,
      isFetchingLookmlFields,
      keyword,
      selectedFilters,
      setSelectedFilters,
      updatedFilters,
      setUpdatedFilters,
      initialLoad,
      setInitialLoad,
      savedFilters,
      removeSavedFilter,
      upsertSavedFilter,
      showMenu, setShowMenu} = useContext(ApplicationContext)

    //Runs everytime the tab is clicked on
    useEffect(() => {
    const initialize = async () => {
        if (params.path == tabKey) {
        if (!isMounted && !initialLoad) {
            try {
            await fetchDefaultFieldsAndFilters();
            setIsMounted(true);
            } catch (e) {
            console.error("Error fetching default dashboard", e);
            setIsMounted(true);
            }
        } else {
            //handleTabVisUpdate();
        }
        }
    }
    initialize()
    }, [currentNavTab, initialLoad]);   

    
    //Getting the tiles of each dashboard
      const fetchDefaultFieldsAndFilters = async () => {
        
        let _visList = []
        let index = 0
        for await (let visConfig of config) {
          const { dashboard_elements, dashboard_filters } = await sdk.ok(
            sdk.dashboard(visConfig['lookml_id'], 'dashboard_elements, dashboard_filters')
          ).catch(ret => {return {dashboard_elements:[], dashboard_filters:{}}})
          
          if (dashboard_elements.length > 0) {
            for await (let t of dashboard_elements) {
              let tileFilters = t["result_maker"]["query"]["filters"];
              let _tileFilterOptions = [];
              let _selectedFilters = {};
              parameters?.map((p) => {
                if (tileFilters) {
                  Object.keys(tileFilters).map((key) => {
                    if (key === p.fields["name"]) {
                      _selectedFilters[key] = tileFilters[key];
                      _tileFilterOptions.push({
                        name: p.fields["name"],
                        options: p["value"],
                      });
                    }
                  });
                }
              });
    
              let vis = {};
              let { client_id } = t["result_maker"]["query"];
              vis = {
                visId: visConfig["vis_name"],
                title: t["title"],
                query: client_id,
                default_fields: [...t.result_maker.query.fields],
                selected_fields: [...t.result_maker.query.fields],
                tileFilterOptions: _tileFilterOptions,
                localSelectedFilters: _selectedFilters,
                index: index++,
              };
              _visList.push(vis);
    
            }
          } else setInitialLoad(false);
        }
        setVisList(_visList);
    
        setSelectedFields(fields);
        setIsFetchingDefaultDashboard(false);
        loadDefaults(_visList);
      }
    
      const loadDefaults = async (_visList) => {
        
        handleTabVisUpdate(_visList);
      };
        
      // Page loading state
      const [isPageLoading, setIsPageLoading] = useState(true);
      useEffect(() => {
        if (!isFetchingDefaultDashboard && !isFetchingLookmlFields) {
          setIsPageLoading(false);
        }
      }, [isFetchingDefaultDashboard, isFetchingLookmlFields]);
        
      //Formatting the filters for a Looker Query
      const formatFilters = (filters) => {
        let filter = {};
        Object.keys(filters).map((key) => {
          if (Object.keys(filters[key]).length > 0) {
            if (!(key == "date range" &&
                Object.keys(filters["date filter"]).length > 0
              )
            ) {
              let obj = {}
              for (const [key, value] of Object.entries(filters[key])) {
                obj[key] = value.toString();
              }
              filters[key] = obj     
              filter = {...filter, ...filters[key]}    
            }
          }
        });
        return filter;
      };
    
      // Handle run button click for visualizations on the page
      const handleTabVisUpdate = async (
        _visList = [],
        filterList = { ...selectedFilters }
      ) => {
        if (!Array.isArray(_visList)) {
          _visList = [...visList];
        }
    
        let _filters = {};
        _filters = await formatFilters(JSON.parse(JSON.stringify(filterList)));
        setUpdatedFilters(JSON.parse(JSON.stringify(filterList)));
        updateAppProperties(_filters);
        _filters = {..._filters, ...selectedTabFilters}
    
        
    
        let newVisList = [];
        for await (let vis of _visList) {
          const { vis_config, fields, model, view } = await sdk.ok(
            sdk.query_for_slug(vis["query"])
          );
    
          let _fields = [];
          
            _fields = vis["selected_fields"];
          const { client_id } = await sdk.ok(
            sdk.create_query({
              model: model,
              view: view,
              fields: _fields,
              filters: vis["localSelectedFilters"]
                ? { ..._filters, ...vis["localSelectedFilters"] }
                : _filters,
              vis_config,
            })
          );
          vis["query"] = client_id;
          newVisList.push(vis);
        }
        setVisList(newVisList);
      };
    
      //Handles update for a single viz with something like a parameter
      const handleSingleVisUpdate = async (index) => {
        let _visList = [...visList];
        let currentVis = _visList.find(({ index }) => index === index);
    
        let _filters = {};
        _filters = await formatFilters(JSON.parse(JSON.stringify(updatedFilters)));
        _filters = { ..._filters, ...currentVis["localSelectedFilters"] };
    
        const { vis_config, fields } = await sdk.ok(
          sdk.query_for_slug(currentVis["query"])
        );
    
        let _fields = [];
        _fields = currentVis["selected_fields"];
    
        const { client_id } = await sdk.ok(
          sdk.create_query({
            model: LOOKER_MODEL,
            view: LOOKER_EXPLORE,
            fields: _fields,
            filters: _filters,
            vis_config,
          })
        );
        currentVis["query"] = client_id;
        setVisList(_visList);
      };
    
      // async function doClearAll() {
      //   setIsDefaultProduct(false);
      //   setUpdateButtonClicked(true);
    
      //   let filters = JSON.parse(JSON.stringify(selectedFilters));
      //   for (let name in filters) {
      //     if (name !== "date range") filters[name] = {};
      //   }
      //   setSelectedFilters(filters);
      //   setUpdatedFilters(filters);
    
      //   // setIsFilterChanged(true);
      // }
    
      useEffect((e) => {
        document.addEventListener("click", handleClickOutside, false);
        return () => {
          document.removeEventListener("click", handleClickOutside, false);
        };
      }, []);
    
      const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        }
      };
    
    
      //jquery will be removed and changed, leave for now
    
      $(document).on("click", function () {
        if ($(".theSelected").height() > 74.8) {
          $(".theSelected")
            .addClass("theEnd")
            .css({ maxHeight: "76px", overflow: "hidden" });
          $(".hideThisEnd, .whiteBar").show();
        } else {
          $(".theSelected")
            .removeClass("theEnd")
            .css({ maxHeight: "unset", overflow: "unset" });
          $(".hideThisEnd, .whiteBar").hide();
        }
    
        $("#numberCounter").html(
          $(".tab-pane.active .theSelected .theOptions").length +
            $(".tab-pane.active.show .theSelected .dateChoice").length
        );
      });
      $(window).resize(function () {
        $(document).trigger("click");
      });
    

    
   
      // const AccountGroupsFieldOptions = useMemo(() => {
        
      //   let cfilter = _.cloneDeep(filters);
      //   let obj = cfilter?.find(({ type }) => type === "account group");
      //   if (Array.isArray(obj?.options?.values)) {
      //     obj.options.values = obj?.options?.values?.filter((item) =>
      //       item["users.account_name"]
      //         ?.toLowerCase()
      //         .includes(keyword?.toLowerCase())
      //     );
      //   }
      //   return obj;
      // }, [keyword, filters]);

    return(
    <div className={isActive ? "tab-pane active" : "hidden"}>
      <Container fluid className="test">
        {isPageLoading ? (
          <Spinner />
        ) : (
          <>
            <SelectionOptions filters={filters} 
                fields={fields} handleTabVisUpdate={handleTabVisUpdate}
                visList={visList}setVisList={setVisList} 
                selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} 
                fieldGroups={fieldGroups} savedFilters={savedFilters} 
                removeSavedFilter={removeSavedFilter} upsertSavedFilter={upsertSavedFilter} 
                attributes={attributes} currentInnerTab={currentInnerTab}
                updateButtonClicked={updateButtonClicked} setUpdateButtonClicked={setUpdateButtonClicked}
                setIsFilterChanged={setIsFilterChanged}
                layoutProps={layoutProps}
                showMenu={showMenu} setShowMenu={setShowMenu}
            />
            <Row className="fullW">
              <Col md={12} lg={12}>
                {filters.find(({ type }) => type === "date filter")?.options
                  ?.length > 0 ? (
                  <TopRow
                    dateFilter={filters.find(
                      ({ type }) => type === "date filter"
                    )}
                    dateRange={filters.find(
                      ({ type }) => type === "date range"
                    )}
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                    selectedTabFilters={selectedTabFilters}
                    setSelectedTabFilters={setSelectedTabFilters}
                    handleTabVisUpdate={handleTabVisUpdate}
                    description={description}
                    filters={filters}
                    tabFilters={tabFilters}
                    layoutProps={layoutProps}
                  />
                ) : (
                  ""
                )}
              </Col>
            </Row>

            <CurrentSelectionRow toggle={toggle} properties={properties}
             active={active} filters={filters}
             selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}
             updatedFilters={updatedFilters} setUpdatedFilters={setUpdatedFilters}
             formatFilters={formatFilters}  faClass={faClass}
             layoutProps={layoutProps}/>

            {layoutProps.layout === "OneTabVisualization"?
              <OneTabVisualization 
                  setSelectedFields={setSelectedFields}
                  currentInnerTab={currentInnerTab}
                  setCurrentInnerTab={setCurrentInnerTab}
                  setVisList={setVisList}
                  visList={visList}
                  handleSingleVisUpdate={handleSingleVisUpdate}/>
              :''}

            {layoutProps.layout === "DashboardVisualizations"?
              <DashboardVisualizations 
                  setSelectedFields={setSelectedFields}
                  currentInnerTab={currentInnerTab}
                  setCurrentInnerTab={setCurrentInnerTab}
                  setVisList={setVisList}
                  visList={visList}
                  handleSingleVisUpdate={handleSingleVisUpdate}/>
              :''}
            {layoutProps.layout === "FullLookMLDashboard"?
              <FullLookMLDashboard 
                  config={config}
                />
              :''}
            
            {/* <Row className="mt-3 mb-3">
              <Col md={12} className="embed-responsive embed-responsive-16by9">
                {visList.filter(({ visId }) => visId === "tabbedVis1").length >
                0 ? (
                  <InnerTableTabs
                    tabs={visList.filter(({ visId }) => visId === "tabbedVis1")}
                    setSelectedFields={setSelectedFields}
                    currentInnerTab={currentInnerTab}
                    setCurrentInnerTab={setCurrentInnerTab}
                    setVisList={setVisList}
                    visList={visList}
                    handleSingleVisUpdate={handleSingleVisUpdate}
                  />
                ) : (
                  ""
                )}
              </Col>
            </Row> */}
          </>
        )}
      </Container>
    </div>
    )
}