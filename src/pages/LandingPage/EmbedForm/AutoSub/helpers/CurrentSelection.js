import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Spinner, Row, Col } from "react-bootstrap";

export const CurrentSelection = ({selectedDateFilter, selectedFilters, filterOptions, fieldOptions, selectedFields, setSelectedFields}) => {
    const [currentSelection, setCurrentSelection] = useState([])


    useEffect(() => {
        let currentSelectionObj = {};
        if (selectedDateFilter !== "") {
            currentSelectionObj[selectedDateFilter] = 'Yes'
        }

        for (const filter in selectedFields) {
            if (selectedFields[filter] !== "") {
              const option = fieldOptions.find(option => option.name === selectedFields[filter]);

              if(option){
                currentSelectionObj[filter] = option;
              }
                // currentSelectionObj[filter] = selectedFields[filter];
            }
        }

        for (const filter in selectedFilters) {
            if (selectedFilters[filter] && selectedFilters[filter] !== "N/A") {
              const optionFilter = filterOptions.find(optionFilter => optionFilter.name === selectedFilters[filter]);

              if(optionFilter){
                currentSelectionObj[filter] = optionFilter;
              }

                // currentSelectionObj[filter] = selectedFilters[filter];
            }
        }



        setCurrentSelection(currentSelectionObj)
    },[selectedDateFilter, selectedFilters, selectedFields, fieldOptions, filterOptions])


    function removeField(fieldName) {
      setSelectedFields((prev) => {
        if (prev.includes(fieldName)) {
          return prev.filter((selectedFilter) => selectedFilter !== fieldName);
        } else {
          return [...prev, fieldName];
        }
      });
    }



    return (
        <>
        <h3 className="blue">Current Selections</h3>


        <div class="wrapOptions">

            {Object.keys(currentSelection)?.map((selection) => {

                return(
                  <div className="theOptions" key={selection}>

                    <p className="mb-0">{currentSelection[selection].label_short}</p>

                    <i onClick={() => removeField(currentSelection[selection].name)} class="fal fa-trash-undo red"></i>

                    </div>

                )
            })}

          </div>


        </>
    )
}
