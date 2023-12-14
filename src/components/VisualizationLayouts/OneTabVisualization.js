import React, { useContext } from 'react'
import InnerTableTabs from '../InnerTableTabs'
import { Row,Col } from 'react-bootstrap'

export const OneTabVisualization = ({visList,setSelectedFields,setCurrentInnerTab,currentInnerTab,setVisList,handleSingleVisUpdate}) => {
    return(
        <>
            <Row className="mt-3 mb-3">
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
            </Row>
        </>
    )
}