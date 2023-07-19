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


      <Row>

        <Col xs={12} md={7}>
        </Col>
          <Col xs={12} md={5}>


        <div className="grid2 mneg40">


            {dateFilterOptions?.map(filter => {
                return (
                    <div className="one radio">
                    <Form.Group key={filter['description']}>
                    <Form.Check
                    checked={selectedDateFilter === filter['name']? true:false}
                    id={filter['name']}
                    type="radio"
                    name="filters"
                    onClick={handleSelection}
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
