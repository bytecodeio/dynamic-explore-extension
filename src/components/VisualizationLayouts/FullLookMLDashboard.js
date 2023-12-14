import React, { useContext } from 'react'
import InnerTableTabs from '../InnerTableTabs'
import { Row,Col } from 'react-bootstrap'
import EmbedDashboard from '../EmbedDashboard'

export const FullLookMLDashboard = ({config}) => {
  console.log(config[0]['lookml_id'])
    return(
        <>
            <Row className="mt-3 mb-3">
              <Col md={12} className="embed-responsive embed-responsive-16by9" style={{minHeight:'100vh', maxHeight:'auto'}}>
                {config.length > 0? (
                  <EmbedDashboard
                    dashboardId={config[0]['lookml_id']}
                  />
                ) : (
                  ""
                )}
              </Col>
            </Row>
        </>
    )
}