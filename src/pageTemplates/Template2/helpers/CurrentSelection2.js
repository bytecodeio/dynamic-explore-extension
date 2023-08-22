import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Spinner, Row, Col } from "react-bootstrap";
import * as $ from "jquery";
import moment from 'moment';

export const CurrentSelection2 = ({ filters, selectedFilters, setSelectedFilters, formatFilters }) => {
  const [currentSelection, setCurrentSelection] = useState([])
  useEffect(() => {
    
    setCurrentSelection(formatFilters())
    console.log("selectedFIlters", selectedFilters)
  },[selectedFilters])

  return (


<div className="d-flex">
  {Object.keys(currentSelection)?.map((selection) => {

  return(
    <div className="theOptions" key={selection}>
    {/*<p className="mb-0">{currentSelection[selection]}</p>*/}
    <p className="mb-0 blue">{selection.replace(/\s*\(.*?\)\s*/g, '')}: {currentSelection[selection]}</p>

    {/* <i onClick={() => removeField(filterSelection[selection].name)} class="fal fa-times blue"></i> */}

    </div>

  )
  })}
</div>

  )
}
