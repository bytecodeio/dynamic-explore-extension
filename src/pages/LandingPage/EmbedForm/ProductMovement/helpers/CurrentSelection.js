import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export const CurrentSelection = ({selectedDateFilter, selectedFilters}) => {
    const [currentSelection, setCurrentSelection] = useState([])

    useEffect(() => {
        let currentSelectionObj = {};
        if (selectedDateFilter !== "") {
            currentSelectionObj[selectedDateFilter] = 'Yes'
        }

        for (const filter in selectedFilters) {
            if (selectedFilters[filter] && selectedFilters[filter] !== "N/A") {
                currentSelectionObj[filter] = selectedFilters[filter];
            }
        }
        setCurrentSelection(currentSelectionObj)
    },[selectedDateFilter,selectedFilters])



    return (
        <>
        <h3 className="blue">Current Selections</h3>

            <div class="wrapFields">
            {Object.keys(currentSelection)?.map((selection) => {
                return(

                    <div className="d-flex align-items-center" key={selection}>
                    <p className="mb-0">{selection} : {currentSelection[selection]}</p>

                    <i class="fal fa-trash-undo red"></i>
                    </div>

                )
            })}

            </div>

        </>
    )
}
