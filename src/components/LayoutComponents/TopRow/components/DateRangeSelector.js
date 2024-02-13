import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useEffect } from "react";
import { ExtensionContext } from "@looker/extension-sdk-react";

const date_range_type = 'date range';
const date_filter_type = 'date filter';
export const DateRangeSelector = ({
  dateRange,
  selectedFilters,
  setSelectedFilters
}) => {

  const [dateRangeField, setDateRangeField] = useState({})
  const { core40SDK: sdk } = useContext(ExtensionContext);

  useEffect(() => {
    
    let dRange = Object.assign({}, dateRange)
    setDateRangeField(dRange?.['options']?.['field'])
  }, [])

  const onDateSelection = (e, type) => {
    let filters = JSON.parse(JSON.stringify(selectedFilters))
    if (type == "start") {
      let splitDate = splitSelectedDateRange();
      splitDate[0] = e.target.value;
      filters[date_range_type][dateRangeField['name']] = splitDate.join(" to ")
      setSelectedFilters(filters);
    }
    if (type == "end") {
      let splitDate = splitSelectedDateRange();
      splitDate[1] = e.target.value;
      filters[date_range_type][dateRangeField['name']] = splitDate.join(" to ")
      setSelectedFilters(filters);
    }
    filters[date_filter_type] = {}
    setSelectedFilters(filters);
  };

  const splitSelectedDateRange = () => {
    if (selectedFilters?.[date_range_type]?.[dateRangeField['name']]) {
      return selectedFilters[date_range_type][dateRangeField['name']].split(" to ");
    }
    return ["", ""];
  };

  return (
        <Col>
          <div className="d-flex mt-1 ml2">
            <div className="columnStart mr2">
              <label>Start Date</label>
              <Form.Control
              type="date"
              value={splitSelectedDateRange()[0]}
              onChange={(e) => onDateSelection(e, "start")}
              />
            </div>
            <div className="columnStart">
              <label>End Date</label>
              <Form.Control
              type="date"
              value={splitSelectedDateRange()[1]}
              onChange={(e) => onDateSelection(e, "end")}
              />
            </div>
          </div>
        </Col>
  );
};
