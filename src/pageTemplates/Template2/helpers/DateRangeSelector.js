import React, {useState, useContext} from "react";
import DatePicker from "react-datepicker";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useEffect } from "react";
import { sortDateFilterList, updateDateRange } from "../../../utils/globalFunctions";
import { ExtensionContext } from "@looker/extension-sdk-react";
import { LOOKER_MODEL } from "../../../utils/constants2";

const date_range_type = 'date range';
const date_filter_type = 'date filter';
export const DateRangeSelector = ({
  dateRange,
  dateFilter,
  handleTabVisUpdate,
  selectedFilters,
  setSelectedFilters,
  currentInvoiceCount,
  description
}) => {
  
  const [dateRangeField, setDateRangeField] = useState({})
  const { core40SDK: sdk } = useContext(ExtensionContext);
 

  useEffect(() => {
    let _dateRangeField = dateRange['options']['field'];
    setDateRangeField(dateRange['options']['field'])
    if (selectedFilters[date_range_type]) {
      let filters = {...selectedFilters}
      filters[date_range_type][_dateRangeField['name']] = dateRange['options']['values']
      setSelectedFilters(filters)
    }
  },[])

  const onDateSelection = (e, type) => {
    let filters = {...selectedFilters}
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
    if (selectedFilters[date_range_type][dateRangeField['name']]) {
      return selectedFilters[date_range_type][dateRangeField['name']].split(" to ");
    }
    return ["", ""];
  };


  const handleSelection = async (e) => {
    let filters = {...selectedFilters}
    filters[date_filter_type] = {}
    filters[date_filter_type][e.target.id] = 'Yes'
    setSelectedFilters(filters);    
    await updateDateRange(dateRange,dateFilter,filters)
  };

  const updateDateRange = async (dateRange, dateFilters, selectedFilters) => {
    let _dateRange = { ...dateRange };
    let _filters = {...selectedFilters}
    if (_filters['date filter']) {
      let dateFilterField = dateFilters.options.find(
        ({name}) => name == Object.keys(_filters['date filter'])[0]
      );
      const newRange = await sdk.ok(
        sdk.run_inline_query({
          result_format: "json",
          body: {
            model: LOOKER_MODEL,
            view: dateFilterField["view"],
            fields: [_dateRange['options']['field']["name"]],
            filters: _filters['date filter'],
            sorts: [_dateRange['options']['field']["name"]],
          },
        })
      );
      if (newRange.length > 0) {
        let max = newRange.length - 1;
        _filters[date_range_type][_dateRange['options']['field']["name"]] = `${newRange[0][_dateRange['options']['field']["name"]]} to ${newRange[max][_dateRange['options']['field']["name"]]}`
        setSelectedFilters(_filters)
      }
    }
}



  return (
  <Container fluid className="padding-0">
    <Row className="fullW mb-1">
      <Col md={12} lg={4}>

        <p className="mt-0 mb-2 mediumFont">
        {description?.description}
        </p>
        </Col>

        <Col md={12} lg={4}>

                <div className="grid2">

                  {sortDateFilterList(dateFilter.options)?.map(filter => {
                    return (

                    <div className="one radio">
                      <Form.Group
                      controlId={filter['name']}>
                      <Form.Check
                      checked={Object.keys(selectedFilters[date_filter_type]).find(key => key === filter['name'])}
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

    <Col md={12} lg={4}>

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
  </Row>

  <Row className="fullW bottom d-flex align-items-center">
      <Col md={12} lg={8}>


    </Col>

  </Row>

  <Row className="fullW mt-3 position-relative">

    <Col xs={12} md={12} className="position-absolute">

      <div className="d-flex justify-content-end endAbsolute">


        <Button
        onClick={handleTabVisUpdate}
        className="btn">Update Dates
      </Button>
    </div>
  </Col>
</Row>


</Container>
);
};
