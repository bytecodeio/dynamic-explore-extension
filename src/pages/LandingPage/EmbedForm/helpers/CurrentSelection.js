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
            {Object.keys(currentSelection)?.map((selection) => {
                return(
                    <div key={selection} className="one">{selection} : {currentSelection[selection]}</div>
                )
            })}
        </>
    )
}