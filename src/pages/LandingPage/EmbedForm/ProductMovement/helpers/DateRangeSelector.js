import React from "react";
import { useState } from "react";
import { Form } from 'react-bootstrap';
export const DateRangeSelector = ({setSelectedDateRangeStart,setSelectedDateRangeEnd,selectedDateRangeStart,selectedDateRangeEnd,}) => {
    const onDateSelection = (e, type) => {
        if (type == "start") {
            setSelectedDateRangeStart(e.target.value)
        }
        if (type == "end") {
            setSelectedDateRangeEnd(e.target.value)
        }
    }

return(
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
)
}