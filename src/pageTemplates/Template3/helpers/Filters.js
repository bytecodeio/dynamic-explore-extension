import React, { useState } from "react";
import { useEffect } from "react";

import { Button, Form, Modal, Spinner } from "react-bootstrap";

const type = 'filter'

const FilterDropdown = ({ handleChange, label, name, options, value }) => {

  return (
    <>
      <p>{label}</p>

      <Form.Select

        onChange={(e) => handleChange(name, e.target.value)}
        value={value}
        >
        <option key="n/a" value=""> </option>
        {options?.map((optionText) => (
          <option key={optionText} value={optionText}> {optionText}</option>
        ))}
      </Form.Select>
    </>
  );
};

const Filters = ({
  isLoading,
  filters,
  selectedFilters,
  setSelectedFilters,
  isDefault,
  setIsDefault,
  setIsFilterChanged,
}) => {


  function handleFilterSelection(filterName, newValue) {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      newFilters[type][filterName] = newValue;
      return newFilters;
    });
    setIsFilterChanged(true);
  }

  return (
    <div className="wrapFilters">
      {filters.options.map((filterOption) => (
        <div className="one" key={filterOption.name}>
          <Form.Group>
            <FilterDropdown
              handleChange={handleFilterSelection}
              label={filterOption.field.label_short}
              name={filterOption.field.name}
              options={filterOption.values.map(v => Object.values(v))}
              //value={isDefault ? selectedFilters[filterOption.name] : "N/A"}
            />
          </Form.Group>
        </div>
      ))}
    </div>
  );
};

export default Filters;
