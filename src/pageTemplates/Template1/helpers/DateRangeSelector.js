import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
export const DateRangeSelector = ({
  setSelectedDateRange,
  selectedDateRange,
  setSelectedDateFilter,
}) => {
  const onDateSelection = (e, type) => {
    if (type == "start") {
      let splitDate = splitSelectedDateRange();
      splitDate[0] = e.target.value;
      setSelectedDateRange(splitDate.join(" to "));
    }
    if (type == "end") {
      let splitDate = splitSelectedDateRange();
      splitDate[1] = e.target.value;
      setSelectedDateRange(splitDate.join(" to "));
    }
    setSelectedDateFilter("");
  };

  const splitSelectedDateRange = () => {
    if (selectedDateRange) {
      return selectedDateRange.split(" to ");
    }
    return ["", ""];
  };

  return (
    <Row className="mt-3">
      <Col xs={12} md={12}>
        <p className="mt-0 mb-2">
          The <span className="highlight">Product Movement Dashboard</span>{" "}
          allows viewing of top-moving products for a single account in
          descending order by units, filtering for controlled substances, and
          filtering by type or customize your report with over 40 available
          fields.
        </p>
      </Col>
      <Col xs={12} md={7}>
        <div className="d-flex">
          <div className="columnStart mr2">
            <p className="small">Start Date</p>
            <Form.Control
              type="date"
              value={splitSelectedDateRange()[0]}
              onChange={(e) => onDateSelection(e, "start")}
            />
          </div>
          <div className="columnStart">
            <p className="small">End Date</p>
            <Form.Control
              type="date"
              value={splitSelectedDateRange()[1]}
              onChange={(e) => onDateSelection(e, "end")}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};
