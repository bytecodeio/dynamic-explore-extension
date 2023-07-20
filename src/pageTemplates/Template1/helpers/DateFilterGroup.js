import React, { useState, useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Row, Col, Button, ButtonGroup, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText} from 'react-bootstrap';


export const DateFilterGroup = ({dateFilterOptions, setSelectedDateFilter, selectedDateFilter}) => {

    const handleSelection = (e) => {
        setSelectedDateFilter(e.target.id)
    }

    useEffect(() => {
        // console.log("selectedDate",selectedDateFilter)
    },[selectedDateFilter])

    return (


      <Row className="fullW">

        <Col md={12} lg={7}>

        </Col>
          <Col md={12} lg={5}>


        <div className="grid2 mneg40">

            {dateFilterOptions?.map(filter => {
                return (

                    <div className="one radio">
                    <Form.Group key={filter['description']}>
                    <Form.Check
                    controlId={filter['name']}
                    checked={selectedDateFilter === filter['name']}
                    id={filter['name']}
                    // value={selectedDateFilter === filter['name']}
                    type="radio"
                    name="dateFilters"
                    onChange={handleSelection}
                    label={filter['label_short'].replace('(Yes / No)','')}
                    />

                    </Form.Group>
                    </div>

                )
            })}
        </div>
        </Col>
        </Row>

)

}
