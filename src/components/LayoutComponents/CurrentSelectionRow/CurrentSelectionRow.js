import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { CurrentSelection2 } from '../CurrentSelection2'
import { PropertyContainer } from './components/PropertyContainer';

export const CurrentSelectionRow = ({toggle,properties, active,filters,selectedFilters,setSelectedFilters,updatedFilters,setUpdatedFilters,formatFilters,faClass,layoutProps}) => {
    const handleClick = () => {
        setToggle(!toggle);
    
        setTimeout(() => {
          setActive(!active);
    
          setFaClass(!faClass);
        }, 600);
      };

    return (
        <>
            <Row className="fullW d-flex align-items-center">
              <Col md={12} lg={2}>
                <PropertyContainer properties={properties} />
              </Col>
            </Row>            
            {layoutProps['current selection']?
            <Row className="fullW mt-1 position-relative">
              <Col xs={12} md={11}>
                <div
                  className={
                    toggle
                      ? "d-flex justify-content-start align-items-center flex-wrap theSelected slide-up"
                      : "d-flex justify-content-start align-items-center flex-wrap theSelected slide-down"
                  }
                >
                  <p class="mr-3">
                    <b>Current Selections:</b>
                  </p>
                    <CurrentSelection2
                        filters={filters}
                        selectedFilters={selectedFilters}
                        setSelectedFilters={setSelectedFilters}
                        updatedFilters={updatedFilters}
                        setUpdatedFilters={setUpdatedFilters}
                        formatFilters={formatFilters}
                    />
                    

                </div>
              </Col>
              <div className="hideThisEnd" onClick={handleClick}>
                <i
                  className={
                    faClass ? "fas fa-plus-circle" : "fas fa-minus-circle"
                  }
                >
                  &nbsp;
                  <span>
                    {" "}
                    {active ? "See Less" : "See All"} (
                    <p id="numberCounter"></p>){" "}
                  </span>
                </i>
              </div>
            </Row>
            :''}
        </>
    )
}