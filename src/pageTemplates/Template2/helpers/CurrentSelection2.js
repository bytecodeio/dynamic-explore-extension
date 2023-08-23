import React, { Fragment, useState, useEffect } from "react";
import { Button, Form, Modal, Spinner, Row, Col, Tooltip, Container, OverlayTrigger} from "react-bootstrap";
import * as $ from "jquery";
import moment from 'moment';

export const CurrentSelection2 = ({ filters, selectedFilters, setSelectedFilters, updatedFilters, formatFilters }) => {
  const [currentSelection, setCurrentSelection] = useState([])
  useEffect(() => {

    setCurrentSelection(formatFilters())
    console.log("selectedFIlters", selectedFilters)
  },[selectedFilters])


  const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    These are pending filters you have selected. Please use the "Update Selections" button to update the table.
  </Tooltip>
  );

  return (


<Fragment>
  {Object.keys(currentSelection)?.map((selection) => {

  return(
    <OverlayTrigger
    placement="right"
    overlay={renderTooltip}
    className="tooltipHover"
    >
      <div className={updatedFilters && selection in updatedFilters ? "theOptions red": "theOptions"} key={selection}>
      {/*<p className="mb-0">{currentSelection[selection]}</p>*/}
      <p className="mb-0 blue">{selection.replace(/\s*\(.*?\)\s*/g, '')}: {currentSelection[selection]}</p>

      {/* <i onClick={() => removeField(filterSelection[selection].name)} class="fal fa-times blue"></i> */}

      </div>
  </OverlayTrigger>

  )
  })}
</Fragment>

  )
}
