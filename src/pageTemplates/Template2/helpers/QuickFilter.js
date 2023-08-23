import React, { useState, useEffect } from "react";

import { Button, ButtonGroup, Form, Modal, Spinner } from "react-bootstrap";

const type = 'quick filter'

const QuickFilter = ({ quickFilters, selectedFilters, selection, setSelectedFilters, updateBtn, setUpdateBtn, setIsFilterChanged}) => {
  // console.log('debug: options', options, value);
  const handleSelection = (e,name) => {
    let quickFilters = {...selectedFilters}
    if (quickFilters[type]?.hasOwnProperty(name)) {
      if (quickFilters[type][name] === e.target.id) {
        delete quickFilters[type][name]
      } else {
        quickFilters[type][name] = e.target.id
      }
    }  else {
      quickFilters[type][name] = e.target.id
    }
    setSelectedFilters(quickFilters)
    setIsFilterChanged(true)
  }

const isActive = (key,v) => {
  if (!selectedFilters[type]?.hasOwnProperty(key)) {
    return false
  }
  if (selectedFilters[type][key] == v) {
    return true
  }
  return false
}

useEffect(() => {
  console.log("selected Filters", selectedFilters)
},[selectedFilters])


  return (
    <>
      {quickFilters?.options.map(f => {
        return (
          <>
          <div>{f['field']['label']}</div>
          <ButtonGroup>
            {f['values'].map(v =>
                <Button
                key={Object.values(v)}
                active={isActive(f['field']['name'], Object.values(v))}
                id={Object.values(v)}
                type="radio"
                name="filters"
                onClick={(e) => handleSelection(e,f['field']['name'])}
                >{Object.values(v)}</Button>
            )}
          </ButtonGroup>
          </>
        )
      })}
    </>
  )
};

export default QuickFilter;
