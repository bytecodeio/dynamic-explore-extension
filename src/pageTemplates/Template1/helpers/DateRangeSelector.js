import React, { useState, useEffect } from "react";
import { Form, Row, Col } from 'react-bootstrap';
export const DateRangeSelector = ({ setSelectedDateRange, selectedDateRange, setSelectedDateFilter }) => {



    useEffect(() => {
        console.log("split date", splitSelectedDateRange())
    },[selectedDateRange])
    const onDateSelection = (e, type) => {
        if (type == "start") {
            let splitDate = splitSelectedDateRange()
            splitDate[0] = e.target.value;
            setSelectedDateRange(splitDate.join(" to "))
        }
        if (type == "end") {
            let splitDate = splitSelectedDateRange()
            splitDate[1] = e.target.value;
            setSelectedDateRange(splitDate.join(" to "))
        }
        setSelectedDateFilter("")
    }

    const splitSelectedDateRange = () => {
        if (selectedDateRange) {
           return selectedDateRange.split(" to ")
        }
        return ['','']
    }


return(

  <Row className="mt-3 fullW">
      <Col md={12} lg={12}>
        <p className="mt-0 mb-2">The <span className="highlight">Product Movement Dashboard</span> allows viewing of top-moving products for a single account in descending order by units, filtering for controlled substances, and filtering by type or customize your report with over 40 available fields.</p>
      </Col>
      <Col md={12} lg={7}>
      <div class="d-flex">
          <div class="columnStart mr2">
              <p className="small">Start Date</p>
              <Form.Control type="date" value={splitSelectedDateRange()[0]} onChange={(e) => onDateSelection(e,'start')}/>
          </div>
          <div class="columnStart">
              <p className="small">End Date</p>
              <Form.Control type="date" value={splitSelectedDateRange()[1]} onChange={(e) => onDateSelection(e,'end')}/>
          </div>
      </div>
      </Col>
  </Row>
 )
}
