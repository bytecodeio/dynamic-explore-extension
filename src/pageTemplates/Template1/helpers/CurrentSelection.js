import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Spinner, Row, Col } from "react-bootstrap";

export const CurrentSelection = ({
  selectedDateFilter,
  selectedFilters,
  setSelectedFilters,
  filterOptions,
  fieldOptions,
  selectedFields,
  setSelectedFields,
  dateFilterOptions,
}) => {
  const [currentSelection, setCurrentSelection] = useState([]);
  const [filterSelection, setFilterSelection] = useState([]);

  useEffect(() => {
    let currentSelectionObj = {};
    if (selectedDateFilter !== "") {
      const option3 = dateFilterOptions.find(
        (option3) => option3.name === selectedDateFilter
      );
      if (option3) {
        currentSelectionObj[selectedDateFilter] = option3;
      }

      // currentSelectionObj[selectedDateFilter] = 'Yes'
    }

    let filterObj = {};
    for (let key in selectedFilters) {
      const option = filterOptions.find((option3) => option3.name === key);

      if (option && selectedFilters[key] !== "N/A") {
        filterObj[option.label_short] = {
          value: selectedFilters[key],
          name: key,
        };
      }
    }
    setFilterSelection(filterObj);
    setCurrentSelection(currentSelectionObj);
  }, [
    selectedDateFilter,
    dateFilterOptions,
    selectedFilters,
    selectedFields,
    fieldOptions,
    filterOptions,
  ]);

  function removeField(fieldName) {
    setSelectedFilters((prev) => {
      let newObj = {};
      for (const name in prev) {
        if (name !== fieldName) {
          newObj[name] = prev[name];
        } else {
          newObj[name] = "N/A";
        }
      }
      return newObj;
    });
    // setSelectedFields((prev) => {
    //   return prev.filter(field !== fieldName)
    // })
  }

  return (
    <>
      <h3 className="blue strong mt-3 mb-2">Current Selections</h3>
      <div className="d-flex flex-column">
        {Object.keys(currentSelection)?.map((selection) => {
          return (
            <div className="dateChoice" key={selection}>
              {/*<p className="mb-0">{currentSelection[selection]}</p>*/}
              <p className="mb-0 blue">
                {currentSelection[selection].label_short.replace(
                  /\s*\(.*?\)\s*/g,
                  ""
                )}
              </p>
            </div>
          );
        })}

        <div className="wrapOptions mt-3">
          {Object.keys(filterSelection)?.map((selection) => {
            return (
              <div className="theOptions" key={selection}>
                {/*<p className="mb-0">{currentSelection[selection]}</p>*/}

                <p className="mb-0 blue">
                  {selection.replace(/\s*\(.*?\)\s*/g, "")}:{" "}
                  {filterSelection[selection].value}
                </p>

                <i
                  onClick={() => removeField(filterSelection[selection].name)}
                  className="fal fa-times blue"
                ></i>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
