import React, { useState, useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button, ButtonGroup, Form} from 'react-bootstrap';


export const DateFilterGroup = ({dateFilterOptions, setSelectedDateFilter, selectedDateFilter}) => {
    const handleSelection = (e) => {
        setSelectedDateFilter(e.target.id)
    }

    useEffect(() => {
        console.log("selectedDate",selectedDateFilter)
    },[selectedDateFilter])

    return (
        <ButtonGroup>
            {dateFilterOptions?.map(filter => {
                return (
                    <Button key={filter['description']} active={selectedDateFilter === filter['name']? true:false} id={filter['name']} type="radio" name="filters" onClick={handleSelection}>
                        {filter['label_short'].replace('(Yes / No)','')}
                    </Button> 
                )
            })}
        </ButtonGroup>
    )
}