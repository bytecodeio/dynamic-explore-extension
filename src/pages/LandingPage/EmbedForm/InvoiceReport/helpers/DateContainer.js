import React from "react";
import { useState } from "react";
import { Form, Row, Col } from 'react-bootstrap';

const DateContainer = ( {setSelectedDateRangeStart,setSelectedDateRangeEnd,selectedDateRangeStart,selectedDateRangeEnd} ) => {

  const onDateSelection = (e, type) => {
      if (type == "start") {
          setSelectedDateRangeStart(e.target.value)
      }
      if (type == "end") {
          setSelectedDateRangeEnd(e.target.value)
      }
  }

  return (
    <Row className="mt-3">
        <Col xs={12} md={7}>
          <p className="mt-0 mb-5">The <span className="highlight">Invoice Report Dashboard</span> allows the view of an invoice summary for a single account and query all invoices within a specific date range, or containing specific products or groups of products.</p>
        </Col>
        <Col xs={12} md={5}>
        <div class="d-flex">
            <div class="columnStart mr2">
                <p className="small">Start Date</p>
                <Form.Control type="date" value={selectedDateRangeStart} onChange={(e) => onDateSelection(e,'start')}/>
            </div>
            <div class="columnStart">
                <p className="small">End Date</p>
                <Form.Control type="date" value={selectedDateRangeEnd} onChange={(e) => onDateSelection(e,'end')}/>
            </div>
        </div>
        </Col>
    </Row>
  );
};

export default DateContainer;
