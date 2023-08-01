import React from "react";
import DatePicker from "react-datepicker";
import { Form, Row, Col, Button, Container } from "react-bootstrap";


export const DateRangeSelector = ({
  setSelectedDateRange,
  selectedDateRange,
  setSelectedDateFilter,
  handleClearAll,
  handleTabVisUpdate,
  dateFilterOptions,
  selectedDateFilter,
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


  const handleSelection = (e) => {
    setSelectedDateFilter(e.target.id);
  };


  // console.log(selectedDateRange)


  return (
<Container fluid>
    <Row className="fullW mb-1">
    <Col md={12} lg={12}>

    <p className="mt-0 mb-2 mediumFont">
    The <span className="highlight">Product Movement Dashboard</span> allows viewing of top-moving products for a single account in
    descending order by units, filtering by type or customize your report.
    </p>

    </Col>
    </Row>


    <Row className="fullW bottom">
    <Col xs={12} md={6}>


      <div className="grid2 mt-3">



      {dateFilterOptions?.map(filter => {
        return (

          <div className="one radio">
          <Form.Group
          controlId={filter['name']}>
            <Form.Check
            checked={selectedDateFilter === filter['name']}
            id={filter['name']}
            value={filter['name']}
            type="radio"
            // name="dateFilters"
            onChange={handleSelection}
            label={filter['label_short'].replace('(Yes / No)','')}
            />

        </Form.Group>
        </div>

      )
    })}


    </div>

    </Col>
    <Col xs={12} md={6}>

    <div className="d-flex mt-3 ml2">

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
    </Row>

<Row className="fullW mt-2">

    <Col xs={12} md={12}>

      <div className="d-flex justify-content-end">


        <Button
        onClick={handleTabVisUpdate}
        className="btn">Submit Dates
        </Button>
      </div>
</Col>
      </Row>


</Container>
  );
};
