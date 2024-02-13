import React, {useState,useRef, useEffect} from 'react'
import { OverlayTrigger, Col, Row ,Button,Accordion,Modal,Tooltip} from 'react-bootstrap';
import { SavedFilters } from '../../SavedFilters';
import QuickFilter from '../QuickFilter';
import Fields from '../Fields';
import Filters from '../Filters';
import {FieldButtonGroup} from '../../FieldButtonGroup'
import AccountFilter from '../AccountFilter';
import AccountGroup from '../AccountGroup';
import ShortReasons from '../ShortReasons';
import { TopProducts } from '../TopProducts';
import { Bookmark, BookmarkFill, Filter } from '@styled-icons/bootstrap';
import { TextFields } from '@styled-icons/material-outlined';



//SelectionOptions is the side panel that includes filters and field selections
export const SelectionOptions = ({filters, fields, handleTabVisUpdate,setIsFilterChanged,visList,setVisList, selectedFilters, setSelectedFilters, fieldGroups, savedFilters,removeSavedFilter,upsertSavedFilter,attributes,selectedInnerTab,updateButtonClicked,setUpdateButtonClicked, layoutProps, showMenu, setShowMenu, setUpdatedFilters,tabFilters}) => {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const wrapperRef = useRef(null);

    const [activeKey, setActiveKey] = useState()

    useEffect(() => {
        console.log("activeKey",activeKey)
    },[activeKey])


    const handleClearAll = () => {
        setShow(true);
      };

      const handleUserYes = () => {
        doClearAll();
        setShow(true);
      };

    const doClearAll = () => {
        //setIsDefaultProduct(false);
        setUpdateButtonClicked(true);
    
        let filters = JSON.parse(JSON.stringify(selectedFilters));
        for (let name in filters) {
          if (name !== "date range") filters[name] = {};
        }
        setSelectedFilters(filters);
        setUpdatedFilters(filters);
    
        setIsFilterChanged(true);
      }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          These are the filters you use to query data. Select the accordions
          individually below to choose the different filter options inside. Once you
          are done you can choose the "Submit Values" button to update the data.
        </Tooltip>
      );

    return(
        <>
        <div className="slideOutTab3">
            <div
                id="one3"
                className="openTab bottomShadow slideButton"
                role="button"
                tabindex="0"
                onClick={() => {
                    setShowMenu(false);
                } }
            >
                <p className="black m-0 mb-2">
                    <i class="far fa-bars"></i>
                </p>
                <p className="m-0">
                    <span className="noMobile">Selection Options</span>
                </p>
            </div>
        </div>
        <div
            id="slideOut3"
            className={showMenu ? "hide" : "show3"}
            ref={wrapperRef}
        >
            <div className="modal-content">
                <div className="modal-header">
                    {/* <OverlayTrigger
                        placement="right"
                        overlay={renderTooltip}
                        className="tooltipHover"
                    >
                        <p className="pb-1" style={{width:'100%'}}>
                            Selection Options{" "}
                            <i className="fal fa-info-circle red"></i>
                        </p>
                    </OverlayTrigger> */}
                    <div className="closeThisPlease" id="close1" style={{margin:'0 10px 10px auto'}}>
                        <a
                            className="close"
                            data-dismiss="modal"
                            id="closeThisPlease1"
                            onClick={() => {
                                setShowMenu(true);
                            } }
                        >
                            {/*onClick={() => setShow3(false)}>*/}
                            &#10005;
                        </a>
                    </div>
                </div>
                <div className="modal-actions">
                    <div className="position-relative columnStart mb-3">
                        {/*<input value={keyword} onChange={() => {slideIt3(true);handleChangeKeyword();}} placeholder="" type="search" class="form-control" />*/}
                        {fields?.fields?.length > 0 ? (
                            <SearchAll2
                                //accountGroups={}
                                filters={filters.find(({ type }) => type === "filter")}
                                setSelectedAccountGroups={setSelectedAccountGroups}
                                selectedAccountGroups={AccountGroupsFieldOptions}
                                setSelectedFilters={setSelectedFilters}
                                selectedFilters={selectedFilters}
                                fieldOptions={fields.fields}
                                setTabList={setVisList}
                                tabList={visList.filter(
                                    ({ visId }) => visId === "tabbedVis1"
                                )}
                                currentInnerTab={currentInnerTab}
                                updateBtn={updateButtonClicked} />
                        ) : (
                            ""
                        )}
                    </div>

                    <div className="across">
                        <Button onClick={handleClearAll} className="btn-clear">
                            Clear All Selections
                        </Button>
                        <Button onClick={() => handleTabVisUpdate(visList, selectedFilters,'selections')} className="btn">
                            Update Selections
                        </Button>
                    </div>
                </div>
                <div className="modal-body">
                    <Accordion defaultActiveKey={0} className="mt-3 mb-3" activeKey={activeKey} onSelect={(e) => setActiveKey(e)}>
                        <Row>
                            <Col xs={12} md={12}>
                                <Row>
                                    {/*Field Button Groups*/}
                                    {fieldGroups.length > 0 ?
                                        <FieldButtonGroup fieldGroups={fieldGroups} visList={visList} setVisList={setVisList} handleTabVisUpdate={handleTabVisUpdate} />
                                        : ''}
                                    {/* Account Group */}
                                    {Array.isArray(
                                        filters.find(({ type }) => type === "account group")
                                            ?.options.values
                                    ) && layoutProps['account group']  ? (
                                        <Col xs={12} md={12} className={activeKey == '1'?'accordion-container open':'accordion-container close'}>
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>
                                                    Account Group
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <AccountGroup
                                                        // fieldOptions={keyword !== "" ? filters.filter(option => option.indexOf(keyword) !== -1) : filters.find(({ type }) => type === "account group")}
                                                        fieldOptions={filters.find(
                                                            ({ type }) => type === "account group"
                                                        )}
                                                        selectedFilters={selectedFilters}
                                                        setSelectedFilters={setSelectedFilters} />
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Col>
                                    ) : (
                                        ""
                                    )}



                                    {/* Account Filter */}
                                    {Array.isArray(
                                        filters.find(({ type }) => type === "account filter")
                                            ?.options.values
                                    ) && layoutProps['account filter']  ? (
                                        <Col xs={12} md={12} className={activeKey == '2'?'accordion-container open':'accordion-container close'}>
                                            <Accordion.Item eventKey="2">
                                                <Accordion.Header>
                                                    Account Filter
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    {/* <div className="position-relative mb-3">
                                                        <input
                                                            value={keyword}
                                                            onChange={handleChangeKeyword}
                                                            placeholder="Search"
                                                            type="search"
                                                            class="form-control" />
                                                        <i class="far fa-search absoluteSearch"></i>
                                                    </div> */}

                                                    <AccountFilter
                                                        // fieldOptions={keyword !== "" ? filters.filter(option => option.indexOf(keyword) !== -1) : filters.find(({ type }) => type === "account group")}
                                                        fieldOptions={filters.find(
                                                            ({ type }) => type === "account filter"
                                                        )}
                                                        selectedFilters={selectedFilters}
                                                        setSelectedFilters={setSelectedFilters} />
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Col>
                                    ) : (
                                        ""
                                    )}

                                    {/* Fields */}
                                    {fields?.length > 0 && layoutProps['fields'] && visList.length > 0 ? (
                                        <Col xs={12} md={12} className={activeKey == '6'?'accordion-container open':'accordion-container close'}>
                                            <Accordion.Item eventKey="6">
                                                <Accordion.Header>
                                                    <span className='accordion-logo'>                                                    
                                                        <TextFields />
                                                    </span>
                                                    Fields
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <Fields
                                                        fieldOptions={fields.find(f => { return f.sub_tab === visList.filter(({ visId }) => visId === "tabbedVis1")[selectedInnerTab[visList[0].dashboard_id]]?.title; })
                                                            ? fields.find(f => { return f.sub_tab === visList.filter(({ visId }) => visId === "tabbedVis1")[selectedInnerTab[visList[0].dashboard_id]]?.title; }).fields
                                                            : fields.find(f => { return f.sub_tab == ""; })?.fields}
                                                        setTabList={setVisList}
                                                        tabList={visList.filter(
                                                            ({ visId }) => visId === "tabbedVis1"
                                                        )}
                                                        currentInnerTab={selectedInnerTab[visList[0].dashboard_id]}
                                                        updateBtn={updateButtonClicked}
                                                        setUpdateBtn={setUpdateButtonClicked} />
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Col>
                                    ) : (
                                        ""
                                    )}

                                    {/* Filters */}
                                    {layoutProps['filters'] ?
                                        filters.find(({ type }) => type === "filter" || type === "quick filter")?.options?.length > 0 ?
                                            <Col xs={12} md={12} className={activeKey == '5'?'accordion-container open':'accordion-container close'}>
                                                <Accordion.Item eventKey="5">
                                                    <Accordion.Header>
                                                    <span className='accordion-logo'>                                                    
                                                        <Filter />
                                                    </span>
                                                        Filters
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        {/*Quick Filters */}
                                                        {filters.find(
                                                            ({ type }) => type === "quick filter"
                                                        )?.options?.length > 0 ? (
                                                            <QuickFilter
                                                                quickFilters={filters.find(
                                                                    ({ type }) => type === "quick filter"
                                                                )}
                                                                selectedFilters={selectedFilters}
                                                                setSelectedFilters={setSelectedFilters}
                                                                updateBtn={updateButtonClicked}
                                                                setUpdateBtn={setUpdateButtonClicked}
                                                                setIsFilterChanged={setIsFilterChanged} />
                                                        ) : (
                                                            ""
                                                        )}

                                                        <Filters
                                                            //isLoading={isFetchingFilterSuggestions}
                                                            filters={filters.find(
                                                                ({ type }) => type === "filter"
                                                            )}
                                                            setSelectedFilters={setSelectedFilters}
                                                            selectedFilters={selectedFilters}
                                                            updateBtn={updateButtonClicked}
                                                            setUpdateBtn={setUpdateButtonClicked}
                                                            setIsFilterChanged={setIsFilterChanged} />
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Col>
                                            : ''
                                        : ''}
                                    {/* Short Reasons */}
                                    {tabFilters?.filter(({type}) => type=="short reason filter").length > 0 &&  visList.length > 0 ? (
                                    <Col xs={12} md={12} className={activeKey == '4'?'accordion-container open':'accordion-container close'}>
                                        <Accordion.Item eventKey="4">
                                            <Accordion.Header>Short Reasons</Accordion.Header>
                                            <Accordion.Body>
                                                <ShortReasons
                                                    fieldOptions={tabFilters.find(f => { return f.sub_tab === visList.filter(({ visId }) => visId === "tabbedVis1")[selectedInnerTab[visList[0].dashboard_id]]?.title; })
                                                    ? tabFilters.find(f => { return f.sub_tab === visList.filter(({ visId }) => visId === "tabbedVis1")[selectedInnerTab[visList[0].dashboard_id]]?.title; })
                                                    : tabFilters.find(f => { return f.sub_tab == ""; })}
                                                    setSelectedFilters={setSelectedFilters}
                                                    selectedFilters={selectedFilters}
                                                    />
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Col>)
                                    :''} 

                                    {/* Top Products */}
                                    {tabFilters?.find(({type}) => type=="top products") &&  visList.length > 0 ? (
                                    <Col xs={12} md={12} className={activeKey == '7'?'accordion-container open':'accordion-container close'}>
                                        <Accordion.Item eventKey="7">
                                            <Accordion.Header>Top Products</Accordion.Header>
                                            <Accordion.Body>
                                                <TopProducts
                                                    filterOption={tabFilters.find(f => { return f.sub_tab === visList.filter(({ visId }) => visId === "tabbedVis1")[selectedInnerTab[visList[0].dashboard_id]]?.title; })
                                                    ? tabFilters.find(f => { return f.sub_tab === visList.filter(({ visId }) => visId === "tabbedVis1")[selectedInnerTab[visList[0].dashboard_id]]?.title; })
                                                    : tabFilters.find(f => { return f.sub_tab == ""; })}
                                                    setSelectedFilters={setSelectedFilters}
                                                    selectedFilters={selectedFilters}
                                                    />
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Col>)
                                    :''}   


                                    {/* Bookmarks */}
                                    <Col xs={12} md={12} className={activeKey == '8'?'accordion-container open':'accordion-container close'}>
                                        <Accordion.Item eventKey="8">
                                            <Accordion.Header>
                                                <span className='accordion-logo'>                                                    
                                                    <Bookmark />
                                                </span>
                                                Saved Filters</Accordion.Header>
                                            <Accordion.Body>
                                                <SavedFilters
                                                    savedFilters={savedFilters}
                                                    setSelectedFilters={setSelectedFilters}
                                                    handleVisUpdate={handleTabVisUpdate}
                                                    removeSavedFilter={removeSavedFilter}
                                                    upsertSavedFilter={upsertSavedFilter} />
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Accordion>
                    {/* <Col xs={12} md={12}>
      <div className="d-flex flex-column text-center position-relative">
        <p className="">Top % Products</p>

        <input
          value={value}
          onChange={(changeEvent) => {
            setStep(1);
            setValue(changeEvent.target.value);
          }}
          placeholder={value}
          type="search"
          list="steplist"
          min="0"
          max="100"
          from="0"
          step="1"
          className="value"
        />

        <input
          value={value}
          onChange={(changeEvent) => {
            setStep(25);
            setValue(changeEvent.target.value);
          }}
          type="range"
          min="0"
          max="100"
          step={step}
          list="steplist"
          className="range-slider mt-2"
        />

        <datalist id="steplist" className="range">
          <option label="0">0</option>
          <option label="25">25</option>
          <option label="50">50</option>
          <option label="75">75</option>
          <option label="100">100</option>
        </datalist>
      </div>
    </Col> */}
                </div>
            </div>
        </div>
            <Modal show={show} onHide={handleClose} className="clearAllModal">
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to clear all selections?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className="btn"
                        onClick={() => {
                            handleUserYes();
                            handleClose();
                        } }
                    >
                        Yes
                    </Button>
                    <Button className="btn-clear" onClick={handleClose}>
                        Cancel <i class="fas fa-ban stop"></i>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}