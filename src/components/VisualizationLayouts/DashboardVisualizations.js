import React, { useContext } from 'react'
import InnerTableTabs from '../InnerTableTabs'
import { Row,Col, Container } from 'react-bootstrap'
import { EmbedContainer } from '../EmbedContainer'

export const DashboardVisualizations = ({visList,setSelectedFields,setCurrentInnerTab,currentInnerTab,setVisList,handleSingleVisUpdate}) => {
    return(
        <>
        <Container className='grid'>
            <Row>
              <Col md={3}>
                {visList.find(({ visId }) => visId === "vis1")?
                  <div className="vis1-container h-50">
                    <EmbedContainer 
                      vis={visList.find(({ visId }) => visId === "vis1")}
                      visList={visList}
                      updateVisList={setVisList}
                      handleVisUpdate={handleSingleVisUpdate}
                    />
                  </div>:''}
                {visList.find(({ visId }) => visId === "vis2")?
                  <div className="vis1-container h-50">
                    <EmbedContainer 
                      vis={visList.find(({ visId }) => visId === "vis2")}
                      visList={visList}
                      updateVisList={setVisList}
                      handleVisUpdate={handleSingleVisUpdate}
                    />
                  </div>:''}
              </Col>
              <Col md={9}>
                {visList.find(({ visId }) => visId === "vis3")?
                  <div className="vis1-container h-100">
                    <InnerTableTabs
                      tabs={visList.filter(({ visId }) => visId === "vis3")}
                      setSelectedFields={setSelectedFields}
                      currentInnerTab={currentInnerTab}
                      setCurrentInnerTab={setCurrentInnerTab}
                      setVisList={setVisList}
                      visList={visList}
                      handleSingleVisUpdate={handleSingleVisUpdate}
                    />
                  </div>:''}
              </Col>
            </Row>
            <Row className="mt-3 mb-3">
              <Col md={3}>
                {visList.find(({ visId }) => visId === "vis4")?
                  <div className="vis1-container h-50">
                    <EmbedContainer 
                      vis={visList.find(({ visId }) => visId === "vis4")}
                      visList={visList}
                      updateVisList={setVisList}
                      handleVisUpdate={handleSingleVisUpdate}
                    />
                  </div>:''}
                {visList.find(({ visId }) => visId === "vis5")?
                  <div className="vis1-container h-50">
                    <EmbedContainer 
                      vis={visList.find(({ visId }) => visId === "vis5")}
                      visList={visList}
                      updateVisList={setVisList}
                      handleVisUpdate={handleSingleVisUpdate}
                    />
                  </div>:''}
              </Col>
              <Col md={9} className="embed-responsive embed-responsive-16by9">
                {visList.filter(({ visId }) => visId === "vis6").length > 0 ?
                  <InnerTableTabs
                    tabs={visList.filter(({ visId }) => visId === "vis6")}
                    setSelectedFields={setSelectedFields}
                    currentInnerTab={currentInnerTab}
                    setCurrentInnerTab={setCurrentInnerTab}
                    setVisList={setVisList}
                    visList={visList}
                    handleSingleVisUpdate={handleSingleVisUpdate}
                  />
                  : ''
                }

              </Col>
            </Row>          
        </Container>
        </>
    )
}